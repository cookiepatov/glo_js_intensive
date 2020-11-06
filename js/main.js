const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");



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

const $cardsRestaraunts = document.querySelector('.cards-restaurants');
const $containerPromo = document.querySelector('.container-promo');
const $restaraunts = document.querySelector('.restaurants');
const $menu = document.querySelector('.menu');
const $homeLogo = document.querySelector('.logo')
const $cardsMenu = document.querySelector('.cards-menu');

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





//day 3
async function getData(url)
{
  const response = await fetch(url);
  if(!response.ok)
  {
    throw new  Error(`Ошибка загрузки магазинов. Адрес ${url} не отвечает. Статус: ${resonse.status}`)
  }
  return  await response.json();
  
} 



//day 2



function createCardRestaraunts(restarauntData) {
  const {image, kitchen, name, price, products, stars, time_of_delivery} = restarauntData;
  const card = `
  </a>
  <a class="card card-restaurant" data-products="${products}" data-name="${name}" data-stars="${stars}" data-price="${price}" data-kitchen="${kitchen}">
    <img src="${image}" alt="image" class="card-image"/>
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${name}</h3>
        <span class="card-tag tag">${time_of_delivery} мин</span>
      </div>
      <div class="card-info">
        <div class="rating">
          ${stars}
        </div>
        <div class="price">От ${price} ₽</div>
        <div class="category">${kitchen}</div>
      </div>
    </div>
  </a>`;
  $cardsRestaraunts.insertAdjacentHTML('beforeend', card);
}

function createCardGood(good) {
  const {image, name, price, description} = good;
  const card = document.createElement('div');
  card.className = 'card';
  card.insertAdjacentHTML('beforeend', `
  <img src="${image}" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">${name}</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">${description}
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">${price} ₽</strong>
    </div>
  </div>`);
  $cardsMenu.insertAdjacentElement('beforeend',card)
}

function openGoods(event) {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  const {name, products, stars, price, kitchen} = restaurant.dataset
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
    
    const $restName = $menu.querySelector('.restaurant-title');
    const $rating = $menu.querySelector('.rating');
    const $price = $menu.querySelector('.price');
    const $category = $menu.querySelector('.category');
    getData(`./db/${products}`).then(function(data){
      for(let i=0;i<data.length;i++)
      {
        createCardGood(data[i]);
      }
    })
    console.log($restName);
    $restName.textContent=name;
    $rating.textContent=stars;
    $price.textContent=`От ${price} руб`;
    $category.textContent=kitchen;

  }
}

function returnHome() {
  $containerPromo.classList.remove('hide');
  $restaraunts.classList.remove('hide');
  $menu.classList.add('hide');
}






function init(){
  getData('./db/partners.json').then(function(data){
    for(let i=0;i<data.length;i++)
    {
      createCardRestaraunts(data[i]);
    }
  })
  $cardsRestaraunts.addEventListener('click', openGoods);
  $homeLogo.addEventListener('click', returnHome);
  cartButton.addEventListener("click", toggleModal);
  close.addEventListener("click", toggleModal);
  checkAuth();
}

init();