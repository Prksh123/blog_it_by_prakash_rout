# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post!, only: [:update]
  def index
    posts = Post.includes(:user, :organization, :categories).where(organization_id: current_user.organization_id)

    render status: :ok, json: {
      posts: posts.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
  end

  def create
    post = Post.new(post_params.except(:category_ids))
    post.user = current_user
    post.organization = current_user.organization
    post.category_ids = post_params[:category_ids] if post_params[:category_ids]
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    post = Post.includes(:user, :organization, :categories).find_by!(slug: params[:slug])

    render status: :ok, json: {
      post: post.as_json(
        include: {
          user: { only: [:id, :name] },
          organization: { only: [:id, :name] },
          categories: { only: [:id, :name] }
        },
        except: [:user_id, :organization_id]
      )
    }
  end

  def update
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
