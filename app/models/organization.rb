# frozen_string_literal: true

class Organization < ApplicationRecord
  has_many :posts
  has_many :users
  validates :name, presence: true
end
