# frozen_string_literal: true

class Category < ApplicationRecord
  has_and_belongs_to_many :posts
  validates :name, presence: true
end
