githubUserSearch.factory('UserSearch', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/users/';
  var getAccessToken = function() {
    $.getJSON("/", function(result) {
      return result.access_token;
    });
  }

  var accessToken = getAccessToken();
  var usernameUrl = function(username) {
    return queryUrl + username;
  }

  return {
    query: function(username) {
      return $http({
        url: usernameUrl(),
        method: 'GET',
        params: {
          'access_token': accessToken
        }
      });
    }
  }
}]);