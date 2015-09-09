describe('Github Profile finder', function() {
  var searchBox = element(by.model('searchCtrl.searchTerm'));
  var searchButton = element(by.className('btn'));
  var searchedFor = element(by.className('searched_for'));
  var searchResults = element(by.className('no_results'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Github user search');
  });

  it('finds profiles and shows the search term', function() {
    searchBox.sendKeys('spike');
    searchButton.click();

    var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
    expect(searchedFor.getText()).toEqual("Search results for spike");
    expect(profiles.get(1).getText()).toEqual('spike01');
  });


  it('can count the number of spikes', function() {
    searchBox.sendKeys('spike');
    searchButton.click();
    element.all(by.repeater('user in searchCtrl.searchResult.items')).then(function(items) {
        expect(items.length).toBe(30);
    });
  });

  it('shows no results when no users found', function() {
    searchBox.sendKeys('87398jflijf87938');
    searchButton.click();
    expect(searchResults.getText()).toEqual("No results found.");
    element.all(by.repeater('user in searchCtrl.searchResult.items')).then(function(items) {
      expect(items.length).toBe(0);
    });
  });

  //   var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
  //   expect(profiles.length).toBe(20);
  // });


  //   it('finds the last Spike', function() {
  //   searchBox.sendKeys('spike');
  //   searchButton.click();

  //   var profiles = element.all(by.repeater('user in searchCtrl.searchResult.items'));
  //   expect(profiles.last().getText()).toEqual('SpikeTheMaster');
  // });
});