githubUserSearch.factory('Search', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/search/users';
  var getAccessToken = function() {
    $.getJSON("/", function(result) {
      return result.access_token;
    });
  }

  var accessToken = getAccessToken();

  return {
    query: function(searchTerm) {
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'q': searchTerm,
          'access_token': accessToken
        }
      });
    }
  }
}]);