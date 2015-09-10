describe('factory: Search', function() {
  var search;
  //var dummy = new Dummy();
  //var access_token = dummy.access_token;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(Search) {
    search = Search;
  }));

  var httpBackend;

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "/key")
      .respond(
        { access_token: "11087e404a09fbd66d5019318591dcbf8d45c98c" }
      );
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "https://api.github.com/search/users?access_token=11087e404a09fbd66d5019318591dcbf8d45c98c&q=tansaku")
      .respond(
        { items: items }
      );
  }));

  var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku"
      },
    ];

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    httpBackend.flush();
    search.query('tansaku')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});