# frozen_string_literal: true

json.post do
  json.partial! "posts/post", post: @post
  json.can_edit @post.can_edit_by?(@current_user)
end
