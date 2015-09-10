describe('factory: UserSearch', function() {
  var user_search;
  var dummy = new Dummy();
  var access_token = dummy.access_token;

  beforeEach(module('GitUserSearch'));

  beforeEach(inject(function(UserSearch) {
    user_search = UserSearch;
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
      .when("GET", "https://api.github.com/users/tansaku?access_token=" + access_token)
      .respond(
        { items: items }
      );
  }));

  var items = [
      {
        "login": "tansaku",
        "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
        "html_url": "https://github.com/tansaku",
        "followers": "197",
        "public_repos": "238"
      },
    ];

  it('responds to query', function() {
    expect(user_search.query).toBeDefined();
  });

  it('returns search results', function() {
    httpBackend.flush();
    user_search.query('https://api.github.com/users/tansaku')
      .then(function(response) {
        expect(response.data.items).toEqual(items)
      })
    httpBackend.flush();
  });

});