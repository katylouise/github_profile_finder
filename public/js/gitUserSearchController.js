githubUserSearch.controller('GitUserSearchController', ['Search', function(Search) {
  var self = this;

  self.doSearch = function() {
    if (self.searchTerm) {
      Search.query(self.searchTerm)
        .then(function(response) {
          console.log(response);
          self.searchResult = response.data;
          self.searchResult.items = self.searchResult.items.slice(0, 10);


          if (self.searchResult.items.length !== 0) {
            for (var i = 0; i < self.searchResult.items.length; i++) {
              var username = self.searchResult.items[i]["login"];
              console.log(username);
            }
          }
      });
    }

  };
}]);
