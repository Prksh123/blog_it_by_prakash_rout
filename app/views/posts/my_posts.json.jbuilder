# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post, :id, :title, :status, :slug, :created_at, :updated_at

  json.categories post.categories do |category|
    json.extract! category, :id, :name
  end
end
