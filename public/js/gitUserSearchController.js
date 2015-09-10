githubUserSearch.controller('GitUserSearchController', ['Search', function(Search) {
  var self = this;

  self.doSearch = function() {
    if (self.searchTerm) {
      Search.query(self.searchTerm)
        .then(function(response) {
          console.log(response);
          self.searchResult = response.data;
          self.searchResult.items = self.searchResult.items.slice(0, 9);
      });
    }
  };
}]);