const burgerIcon = document.querySelector('#burger');
const burgerBars = document.querySelectorAll('.burgerBars');
let burgerMenu = document.createElement('div');

burgerMenu.id = 'menu';
document.body.appendChild(burgerMenu);

burgerMenu.innerHTML += `
<a href="/skate-shop/index.html">HOME</<a>
<a href="">ABOUT</a>
<a href="/skate-shop/pages/name-gen.html">SKATER NAME</a>
`;

burgerIcon.addEventListener('click', toggleMenu);
