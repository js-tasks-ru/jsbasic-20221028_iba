function toggleText() {
  const text = document.querySelector('#text');
  const toggleButton = document.querySelector('.toggle-text-button');

  toggleButton.addEventListener('click', () => {
    if (text.hidden) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  });
}
