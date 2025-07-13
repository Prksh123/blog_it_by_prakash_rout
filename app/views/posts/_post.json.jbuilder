# frozen_string_literal: true

json.id post.id
json.title post.title
json.slug post.slug
json.description post.description
json.created_at post.created_at
json.updated_at post.updated_at

json.user do
  json.id post.user.id
  json.name post.user.name
end

json.organization do
  json.id post.organization.id
  json.name post.organization.name
end

json.categories post.categories do |category|
  json.id category.id
  json.name category.name
end
