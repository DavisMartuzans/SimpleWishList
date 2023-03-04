const form = document.querySelector('#wish-form');
const input = document.querySelector('#wish-input');
const list = document.querySelector('#wish-list');

// retrieve wish list data from localStorage on page load
let wishes = JSON.parse(localStorage.getItem('wishes')) || [];

// render wish list items
function renderWishes() {
  list.innerHTML = '';
  wishes.forEach((wish) => {
    const li = document.createElement('li');
    li.innerText = wish.text;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);
    list.appendChild(li);

    deleteBtn.addEventListener('click', () => {
      wishes = wishes.filter((item) => item.id !== wish.id);
      saveWishes();
      renderWishes();
    });
  });
}

// save wish list data to localStorage
function saveWishes() {
  localStorage.setItem('wishes', JSON.stringify(wishes));
}

// add new wish to wish list and save to localStorage
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // create new wish object and add to wishes array
  const wish = {
    id: Date.now(),
    text: input.value
  };
  wishes.push(wish);
  saveWishes();

  // render wish list items
  renderWishes();

  // clear input field
  input.value = '';
});

// render wish list items on page load
renderWishes();
