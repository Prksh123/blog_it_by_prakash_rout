# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10_000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i
  enum status: { draft: 0, published: 1 }
  has_and_belongs_to_many :categories
  belongs_to :user
  belongs_to :organization

  validates :title,
    presence: true,
    length: { maximum: MAX_TITLE_LENGTH },
    format: { with: VALID_TITLE_REGEX }

  validates :description,
    presence: true,
    length: { maximum: MAX_DESCRIPTION_LENGTH }

  validates_inclusion_of :is_bloggable, in: [true, false]

  validates :slug, uniqueness: true
  validate :slug_not_changed
  validates :status, presence: true

  before_create :set_slug

  def can_edit_by?(user)
    user_id == user&.id
  end

  private

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_post_slug = Post.where(
        regex_pattern,
        "^#{title_slug}$|^#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_post_slug.present?
        slug_count = latest_post_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("is immutable!"))
      end
    end
end
