githubUserSearch.controller('GitUserSearchController', ['Search', 'UserSearch', function(Search, UserSearch) {
  var self = this;

  self.doSearch = function() {
    if (self.searchTerm) {
      Search.query(self.searchTerm)
        .then(function(response) {
          self.searchResult = response.data;
          self.searchResult.items = self.searchResult.items.slice(0, 10);

          if (self.searchResult.items.length !== 0) {
            var users = [];
            for (var i = 0; i < self.searchResult.items.length; i++) {
              UserSearch.query(self.searchResult.items[i]["url"]).then(function(response) {
                users.push(response.data);
              });
            }
            self.userData = users;
          }
      });
    }

  };
}]);
