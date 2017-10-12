class WelcomeScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }
  // TODO(you): Add methods as necessary.
  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
