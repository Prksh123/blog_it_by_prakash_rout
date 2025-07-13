# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: [:update]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  def index
    @posts = policy_scope(Post.includes(:user, :organization, :categories))
  end

  def create
    post = Post.new(post_params.except(:category_ids))
    post.user = current_user
    post.organization = current_user.organization
    post.category_ids = post_params[:category_ids] if post_params[:category_ids]
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.includes(:user, :organization, :categories).find_by!(slug: params[:slug])
    authorize @post
    render :show
  end

  def update
    authorize @post
    @post.update!(post_params)
    @post.update_column(:created_at, Time.current)
    render_notice("Task was successfully updated!")
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, category_ids: [])
    end

    def load_post!
      @post = Post.find_by!(slug: params[:slug])
    end
end
