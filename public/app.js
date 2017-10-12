class App {
  constructor() {
    const welcomeElement = document.querySelector('#welcome');
    this.welcome = new WelcomeScreen(welcomeElement);
    
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const pickElement = document.querySelector('#picks');
    this.picks = new TopPicksScreen(pickElement);

    const searchElement = document.querySelector('#search');
    this.search = new SearchScreen(searchElement);

    this._displayPicks = this._displayPicks.bind(this);
    this._displaySearch = this._displaySearch.bind(this);
    this.returnToMenu = this.returnToMenu.bind(this);

    document.addEventListener('show-picks', this._displayPicks);
    document.addEventListener('show-search', this._displaySearch);
    document.addEventListener('go-back', this.returnToMenu);
  }

  _displayPicks() {
    this.menu.hide();
    this.picks.show();
  }

  _displaySearch() {
    this.menu.hide();
    this.search.show();
  }

  returnToMenu() {
    this.picks.hide();
    this.search.hide();
    this.menu.show();
  }
}
