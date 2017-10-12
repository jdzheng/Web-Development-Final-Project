class TopPicksScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.submitForm = this.submitForm.bind(this);
    this.back = this.back.bind(this);
    this.reset = this.reset.bind(this);

    this.success = document.querySelector("#success");
    this.button = document.querySelector('input[type=submit]');

    this.add = document.querySelector('input[type=submit]');
    this.add.addEventListener('click', this.submitForm);

    this.return = document.querySelector("input[value=Back]");
    this.return.addEventListener('click', this.back);

    document.addEventListener('go-back', this.reset);
  }
  // TODO(you): Add methods as necessary.
  show() {
    this.containerElement.classList.remove('inactive');
  }

  async submitForm(event) {
    event.preventDefault();
    const name = document.querySelector('#name');
    const cuisine = document.querySelector('#cuisine');
    const link = document.querySelector('#link');

    let newEntry = {};
    newEntry['name'] = name.value;
    newEntry['cuisine'] = cuisine.value;
    newEntry['link'] = link.value;

    let form = document.getElementById("myForm");
    form.reset();

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEntry)
    };
    const result = await fetch('/add', fetchOptions);

    this.success.classList.remove('inactive');
    this.button.classList.add('inactive');
  }

  reset() {
    this.success.classList.add('inactive');
    this.button.classList.remove('inactive');
  }

  back(event) {
    event.preventDefault();
    document.dispatchEvent(new CustomEvent('go-back'));
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
