githubUserSearch.controller('GitUserSearchController', ['Search', function(Search) {
  var self = this;
  var getAccessToken = $.getJSON("/", function(result) {
    return result.access_token;
  });

  self.doSearch = function() {
    if (self.searchTerm) {
      Search.query(self.searchTerm)
        .then(function(response) {
            self.searchResult = response.data
      });
    }
  };
}]);