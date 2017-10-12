class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.choices = document.querySelector("#top-choices");
    this.search = document.querySelector("#search-options");

    this.selectOption = this.selectOption.bind(this);
    this.choices.addEventListener('click', this.selectOption);
    this.search.addEventListener('click', this.selectOption);
  }
  // TODO(you): Add methods as necessary.
  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  selectOption(event) {
    event.preventDefault();
    const option = event.currentTarget.textContent;
    if(option == "NEW FAVORITE PLACE") {
      document.dispatchEvent(new CustomEvent('show-picks'));
    } else if(option == "SEARCH"){
      document.dispatchEvent(new CustomEvent('show-search'));
    }
  }
}
