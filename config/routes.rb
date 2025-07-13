# frozen_string_literal: true

Rails.application.routes.draw do
  get "categories/index"
  get "categories/create"

  # Health check
  get "up" => "rails/health#show", as: :rails_health_check

  # JSON API-only routes
  constraints(lambda { |req| req.format == :json }) do
    resources :posts, except: %i[new edit destroy], param: :slug
    resources :categories, only: %i[index create], param: :name
    resources :users, only: %i[index create]
    resources :organizations, only: %i[index]
    resource :session, only: %i[create destroy]
  end

  # React frontend fallback
  root "home#index"
  get "*path", to: "home#index", via: :all
end
