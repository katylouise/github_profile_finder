githubUserSearch.factory('UserSearch', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/users/';
  var getAccessToken = function() {
    $.getJSON("/", function(result) {
      return result.access_token;
    });
  }

  var accessToken = getAccessToken();


  return {
    query: function(username) {
      queryUrl += username;
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'access_token': accessToken
        }
      });
    }
  }
}]);