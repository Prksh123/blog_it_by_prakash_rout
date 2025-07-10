# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: { categories: }
  end

  def create
    categories = Category.new(categories_params)
    categories.save!
    render_notice("Category was successfully created")
  end

  private

    def categories_params
      params.require(:categories).permit(:name)
    end
end
