

class FriendsController < ApplicationController
  before_action :set_friend, only: [:show, :update, :destroy]


  # GET /friends
  def index
    @friends = Friend.all

    render json: @friends
  end

  # GET /friends/1
  def show
    render json: @friend
  end

  # POST /friends
  def create
    @friend = Friend.new(friend_params)

    @friend.user_id = params[:user_id]
    address = @friend.address
    city = @friend.city
    state = @friend.state
    zip = @friend.zip_code
    phone = @friend.phone

    # will check geo .. get lat/longtitude
    @friend.fulladdress = address + ", " + city +" " + state + " " + zip
    # puts "--------"
    # puts   fulladdress , @friend.user_id, phone



    # @data = Carrier::Lookup::Perform.new
    # @data.lookup(
    #    :number => phone.to_s
    # )
    # render json: {error: @data }


    if @friend.save
      # render json: @friend, status: :created, location: @friend
      @friends = Friend.all
      render json: @friends , status: :created
    else
      render json: @friend.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /friends/1
  def update
    if @friend.update(friend_params)
      render json: @friend
    else
      render json: @friend.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friends/1
  def destroy
    @friend.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friend_params
      params.require(:friend).permit(:name, :address, :city, :state, :zip_code, :latitude, :longitude, :phone, :phone_company, :image)
    end
    # def friend_params
    #   params.require(:friend).permit(:name, :address, :city, :state, :zip_code, :phone)
    # end
end
