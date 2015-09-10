githubUserSearch.factory('UserSearch', ['$http', function($http) {
  var queryUrl = 'https://api.github.com/users/';
  var accessToken = $http({method: 'GET', url: '/key'});
  accessToken.then(function(success) {
    self.token = success.data;
  });

  var usernameUrl = function(username) {
    return queryUrl + username;
  }

  return {
    query: function(username_url) {
      return $http({
        url: username_url,
        method: 'GET',
        params: {
          'access_token': self.token.access_token
        }
      });
    }
  }
}]);