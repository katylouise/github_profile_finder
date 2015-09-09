
describe('GitUserSearchController', function() {
  beforeEach(module('GitUserSearch'));
  var ctrl;
  var fakeSearch;
  var q, scope;
  //assign all vars needed

  //provider must be created before inject happens
  beforeEach(function() {
    module(function($provide) {
      fakeSearch = jasmine.createSpyObj('fakeSearch', ['query']);
      //assign fakeSearch to a jasmine spy which has a function query

      $provide.factory('Search', function() {
        return fakeSearch;
        //create provider Search which is a fake factory - it returns fakeSearch
      });
    });
  });

  //you can do multiple injects but neater to have everything in one
  beforeEach(inject(function($q, $rootScope, $controller) {
    scope = $rootScope; //assign scope to root scope (global)
    ctrl = $controller('GitUserSearchController'); //controller to ctrl
    q = $q;
    //$q - allows you to run functions asynchronously and use their return values when they are finished.
  }));

  describe('when searching for a user', function() {

    it('initialises with an empty search result and term', function() {
      expect(ctrl.searchResult).toBeUndefined();
      expect(ctrl.searchTerm).toBeUndefined();
    });

    var gitHubSearchResponse = {
      "items" : [
        {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
        }
      ]
    }

    beforeEach(function(){
      fakeSearch.query.and.returnValue(q.when({ data: gitHubSearchResponse }));
      //set return value of the function query
    });


    it('displays search results', function() {
      ctrl.searchTerm = 'tansaku';
      ctrl.doSearch();
      scope.$apply(); //like httpBackend.flush() - this returns the necessary response
      expect(ctrl.searchResult.items).toEqual(gitHubSearchResponse.items);
    });
  });


});

