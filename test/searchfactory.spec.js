describe('factory: Search', function() {
  var search;
  var dummy = new Dummy();

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
        { access_token: dummy.access_token }
      );
  }));

  beforeEach(inject(function($httpBackend) {
    httpBackend = $httpBackend;
    httpBackend
      .when("GET", "https://api.github.com/search/users?access_token=" + dummy.access_token + "&q=katy")
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
      {
        "login": "stephenlloyd",
        "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
        "html_url": "https://github.com/stephenlloyd"
      }
    ];

  it('responds to query', function() {
    expect(search.query).toBeDefined();
  });

  it('returns search results', function() {
    search.query('katy')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});