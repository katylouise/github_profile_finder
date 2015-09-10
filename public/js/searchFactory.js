githubUserSearch.factory('Search', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/search/users';

  var accessToken = $http({method: 'GET', url: '/key'});
  accessToken.then(function(success) {
    self.token = success.data;
  });

  return {
    query: function(searchTerm) {
      return $http({
        url: queryUrl,
        method: 'GET',
        params: {
          'q': searchTerm,
          'access_token': self.token.access_token
        }
      });
    }
  }
}]);