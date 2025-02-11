Rails.application.routes.draw do
  # ✅ Global Search Routes
  post "/search", to: "search#search"
  post '/search/more_attractions', to: 'search#more_attractions'
  post '/search/more_restaurants', to: 'search#more_restaurants'
  post '/search/more_lodging', to: 'search#more_lodging'

  # ✅ User Authentication
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # ✅ User Management
  resources :users do
    member do
      patch "preferences", to: "users#update_preferences"
      get "itineraries", to: "users#itineraries"
      post "itineraries", to: "users#save_itinerary"
      delete "itineraries/:itinerary_id", to: "users#remove_itinerary", as: "remove_itinerary"
    end
  end

  # ✅ Trip and Place Management
  resources :trips do
    resources :places do
      member do
        patch "update_cost"
      end
    end

    member do
      patch "update_costs"
    end
  end

  # ✅ Catch-All Route to Serve Frontend
  get '*path', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
