let windowID = window.location.search;
let productID = windowID.substring(6, 12);
let product = skates.find((el) => el.id === productID) || gearItems.find((el) => el.id === productID);
const main = document.querySelector('main');
const cartCounter = document.querySelector('span');
const shopBag = document.querySelector('#shop-bag');

const shopcartOverlay = document.querySelector('#shopCart-overlay');

updateCartCounter();

//HERE I AM CREATING CONTAINERS FEATURING THE SELECTED PRODUCTS AND INSERTING STORED INFORMATION ABOUT THEM
const imageContainer = document.createElement('div');
const infoContainer = document.createElement('div');

imageContainer.id = 'imageContainer';
infoContainer.id = 'infoContainer';

main.appendChild(imageContainer);
main.appendChild(infoContainer);

imageContainer.innerHTML = `
<h1>${product.name}</h1>
<img id="product-img" src="${product.picUrl}" alt="${product.alt}">
<div id="colorOption-container"></div>
<p id="descrip-text">${product.descrip}</p>
`;

//HERE I AM INCLUDING PICTURES OF COLOR OPTIONS IF COLOR OPTIONS EXIST, THEN CREATING A QUICK ARROW FUNC FOR THE COLOR BOX.
if (product.colorUrl != null) {
	let colorOptionContainer = document.querySelector('#colorOption-container');
	for (let i = 0; i < product.colorUrl.length; i += 1) {
		colorOptionContainer.innerHTML += `
        <img class="color-option" tabindex="0" src="${product.colorUrl[i]}" id="${product.colorName[
			i
		]}Item" alt="Product image of S1 matte helmet in alternating color: ${product.colorName[i]}. Product photo">
        `;
	}

	let colorOptionBox = document.querySelectorAll('.color-option');
	colorOptionBox.forEach((box) => box.addEventListener('focus', functionColor));
}

//THIS IS WHERE THE PRODUCT's PRICE WILL APPEAR
infoContainer.innerHTML += `
<h2>$${product.price}.00</h2>
`;

//HERE IS WHERE SIZES BASED OFF OF THE PRODUCT WILL APPEAR. HELMETS AND SKATES HAVE DIFFERENT SIZE OPTIONS
if (product.type === 'Park Skate' || product.type === 'Roller Derby') {
	infoContainer.innerHTML += `
        <label for="item-sizes">Size:</label>
        <select name="sizes" id="item-sizes">
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        </select>
    `;
} else if (product.type === 'S1' || product.type === 'Triple 8') {
	infoContainer.innerHTML += `
    <label for="item-sizes">Size:</label>
    <select name="sizes" id="item-sizes">
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
    </select>
    `;
}

//THIS IS FOR COLOR OPTION SELECTOR TO GENERATE IF COLORS EXIST FOR THE PRODUCT (ONLY AVAILABLE ON 1 HELMET)
if (product.colorName != null) {
	infoContainer.innerHTML += `
        <label for="item-colors">Color:</label>
        <select name="colors" id="item-colors"> `;
	let colorSelect = document.querySelector('#item-colors');

	product.colorName.forEach((color) => {
		colorSelect.innerHTML += `
        <option value="${color}">${color}</option>`;
	});
}

//CREATING A BUY BUTTON HERE
infoContainer.innerHTML += `
<button class="firstbtn buy-btn" data-name="${product.name}">Add to Cart +</button>
`;
let button = document.querySelector('.firstbtn');

//TARGETING AND CAPTURING THE SIZE CHOICE, THEN CREATING A NEW PROPERTY FOR THE ITEM WITH NAME AND SIZE CHOSEN
let sizeSelector = document.querySelector('#item-sizes');
let choice = sizeSelector.value;
//CAPTURING SIZE FIRST TIME SOMEONE CLICKS
product.label = product.name + choice;
product.size = choice;

//EVENT LISTENERS BELOW
button.addEventListener('click', addProductToCart);
shopBag.addEventListener('click', toggleCart);
sizeSelector.addEventListener('change', captureSize);
