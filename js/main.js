const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}


//day 1


const $btnAuth = document.querySelector('.button-auth');
const $btnCloseAuth = document.querySelector('.close-auth')
const $modalAuth = document.querySelector('.modal-auth');
const $loginForm = document.querySelector('#logInForm');
const $login = document.querySelector('#login');
const $userName = document.querySelector('.user-name');
const $btnOut = document.querySelector('.button-out');

let login = localStorage.getItem('userName');


function authorized() {
  function LogOff() {
    login = '';
    console.log('11');
    localStorage.removeItem('userName');
    checkAuth();
    returnHome();

  }
  $btnAuth.style.display = 'none';
  $btnOut.style.display = 'block';
  $userName.style.display = 'inline';
  $btnOut.addEventListener('click', LogOff);
  $userName.textContent = login;

}

function notAuthorized() {
  $btnAuth.style.display = 'block';
  $btnOut.style.display = 'none';
  $userName.style.display = 'inline';
  $userName.textContent = login;
  function LogIn(event) {
    if ($login.value.trim() === '') {
      $login.style.borderColor = 'red';
      $loginForm.reset();
      event.preventDefault();
      return;
    }
    localStorage.setItem('userName', $login.value)
    console.log('туть');
    event.preventDefault();
    login = $login.value;
    toggleModalAuth();
    $btnAuth.removeEventListener('click', toggleModalAuth);
    $btnCloseAuth.removeEventListener('click', toggleModalAuth);
    $loginForm.removeEventListener('submit', LogIn);
    $loginForm.reset();
    checkAuth();
  }
  $btnAuth.addEventListener('click', toggleModalAuth);
  $btnCloseAuth.addEventListener('click', toggleModalAuth);
  $loginForm.addEventListener('submit', LogIn);
  $modalAuth.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-open')) {
      toggleModalAuth();
    }

  })
}




function toggleModalAuth() {
  $login.style.borderColor = '';
  $modalAuth.classList.toggle('is-open');
  if ($modalAuth.classList.contains('is-open')) {
    disableScroll();
  }
  else {
    enableScroll();
  }
}



function checkAuth() {
  if (login) {
    console.log('авторизован');
    authorized();
  }
  else {
    console.log('не авторизован');
    notAuthorized();
  }
}



checkAuth();



//day 2

const $cardsRestaraunts = document.querySelector('.cards-restaurants');
const $containerPromo = document.querySelector('.container-promo');
const $restaraunts = document.querySelector('.restaurants');
const $menu = document.querySelector('.menu');
const $homeLogo = document.querySelector('.logo')
const $cardsMenu = document.querySelector('.cards-menu');

function createCardRestaraunts() {
  const card = `
  </a>
  <a class="card card-restaurant">
    <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">Тануки</h3>
        <span class="card-tag tag">60 мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          4.5
        </div>
        <div class="price">От 1 200 ₽</div>
        <div class="category">Суши, роллы</div>
      </div>
    </div>
  </a>`;
  $cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
  <img src="img/pizza-plus/pizza-vesuvius.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Везувий</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», ветчина, пепперони, перец
        «Халапенье», соус «Тобаско», томаты.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">545 ₽</strong>
    </div>
  </div>`);
  $cardsMenu.insertAdjacentElement('beforeend',card)
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if (!login)
  {
    toggleModalAuth();
    return;
  }
  if (restaurant) {
    $cardsMenu.textContent = '';
    $containerPromo.classList.add('hide');
    $restaraunts.classList.add('hide');
    $menu.classList.remove('hide');
    createCardGood();

  }
}

function returnHome() {
  $containerPromo.classList.remove('hide');
  $restaraunts.classList.remove('hide');
  $menu.classList.add('hide');
}



$cardsRestaraunts.addEventListener('click', openGoods);
$homeLogo.addEventListener('click', returnHome);

createCardRestaraunts();