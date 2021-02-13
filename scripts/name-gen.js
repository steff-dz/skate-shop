const cartCounter = document.querySelector('span');
const shopBag = document.querySelector('#shop-bag');
const shopcartOverlay = document.querySelector('#shopCart-overlay');
const skaterNameBox = document.querySelector('#skaterNameBox');
const nameButton = document.querySelector('#nameButton');

updateCartCounter();

shopBag.addEventListener('click', toggleCart);
nameButton.addEventListener('click', generateName);
