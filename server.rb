require 'sinatra'
require 'json'

set :public_folder, 'public'

get '/' do
  { access_token: ENV["GITHUB_ACCESS_TOKEN"] }.to_json
  send_file('public/index.html')
end