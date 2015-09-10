require 'sinatra'
require 'json'

APIKEY = ENV["GIT_ACCESS_TOKEN"]

get '/' do
  send_file('public/index.html')
end

get '/key' do
  { access_token: APIKEY }.to_json
end