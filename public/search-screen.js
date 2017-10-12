class SearchScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this._onSubmit = this._onSubmit.bind(this);
    this.backToMenu = this.backToMenu.bind(this);
    this.resetSearch = this.resetSearch.bind(this);

    this.restaurant = document.querySelector('#results');
    this.name = document.querySelector('#restaurant');
    this.cuisine = document.querySelector('#type');
    this.link = document.querySelector('#url');

    this.submit = document.querySelector('input[value=Search]');
    this.return = document.querySelector("input[value=Back]");

    this.return.addEventListener('click', this.backToMenu);
    this.submit.addEventListener('click', this._onSubmit);

    document.addEventListener('go-back', this.resetSearch);
  }
  // TODO(you): Add methods as necessary.
  show() {
    this.containerElement.classList.remove('inactive');
  }

  async _onSubmit(event) {
    event.preventDefault();
    const answer = document.querySelector('#key');
    const key = answer.value;

    const result = await fetch('/find/' + key);
    const json = await result.json();

    if(json !== null) {
      this.name.textContent = 'Restaurant Name: ';
      this.cuisine.textContent = 'Cuisine: ';
      this.link.textContent = 'Link: ';
      this.name.textContent = this.name.textContent + json.name;
      this.cuisine.textContent = this.cuisine.textContent + json.cuisine;
      var mydiv = document.getElementById("url");
      var aTag = document.createElement('a');
      aTag.setAttribute('href',json.link);
      aTag.innerHTML = json.link;
      mydiv.appendChild(aTag);
      this.restaurant.classList.remove('inactive');
    } else {
      const error = document.querySelector('#error');
      error.classList.remove('inactive');
    }
  }

  resetSearch() {
    this.name.textContent = 'Restaurant Name: ';
    this.cuisine.textContent = 'Cuisine: ';
    this.link.textContent = 'Link: ';
    this.restaurant.classList.add('inactive');
  }

  backToMenu(event) {
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('go-back'));
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
