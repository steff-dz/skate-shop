//HERE IS MY ADD TO CART FUNCTION -----------------------------------------------------------------------------
function addProductToCart(event) {
	hideCart();
	let buttonName = event.target.dataset.name;
	let item = skates.find((el) => el.name === buttonName) || gearItems.find((el) => el.name === buttonName);

	//CHECK IF THERE IS A CART IN LOCAL STORAGE, IF NOT MAKE ONE
	if (localStorage.getItem('cart') == null) {
		localStorage.setItem('cart', '[]');
	}

	//RETRIVE CREATED CART
	let storedCart = JSON.parse(localStorage.getItem('cart'));

	//CHECKS TO SEE IF CART IS EMPTY AND IF SELECTED ITEM ALREADY EXISTS
	if (storedCart.length === 0) {
		item.qty = 0;
		item.qty++;
		storedCart.push(item);
		saveUpdate();
	} else {
		let storedItem = storedCart.find((el) => el.label === item.label);
		if (!storedItem) {
			item.qty = 0;
			item.qty++;
			storedCart.push(item);
			saveUpdate();
		} else {
			storedItem.qty++;
			saveUpdate();
		}
	}

	//HELPER FUNCTION TO SAVE CHANGES TO STOREDCART AND KEEP THE CART COUNTER UPDATED
	function saveUpdate() {
		localStorage.setItem('cart', JSON.stringify(storedCart));
		updateCartCounter();
	}
}

//NEED A CART COUNTER ALWAYS DISPLAYING FUNCTION------------------------------------------------------------------------------
function updateCartCounter() {
	let storedCart = JSON.parse(localStorage.getItem('cart'));
	let counter = 0;
	if (storedCart === null) {
		counter = 0;
	} else {
		storedCart.forEach((item) => {
			counter += item.qty;
		});
		cartCounter.innerText = counter;
	}
}

//HERE IS A FUNCTION TO TOGGLE THE CART DISPLAY------------------------------------------------------------------------------------
function toggleCart() {
	if (shopcartOverlay.style.display === 'block') {
		hideCart();
	} else {
		displayCart();
	}
}

//FUNCTION FOR DISPLAYING THE CART-------------------------------------------------------------------------------------------
function displayCart() {
	shopcartOverlay.innerHTML = '';
	shopcartOverlay.style.display = 'block';
	shopBag.src = '/skate-shop/images/shopbag.svg';
	shopcartOverlay.style.right = '0';
	shopBag.src = '/skate-shop/images/xicon.png';
	let storedCart = JSON.parse(localStorage.getItem('cart'));
	let sum = 0;
	//INVOKING FUNCTION TO DISPLAY SHOPPING CART LABEL
	cartLabel();
	//PRINTING OUT THE CHOSEN ITEMS IN THE USER'S CART
	if (!storedCart) {
		return;
	} else {
		storedCart.forEach((item) => {
			shopcartOverlay.innerHTML += `
			   <div class="displayItem-container">
			   <div class="name-box">
			   <h5>${item.name}</h5> 
			   <img class="cart-prdt-img" src=${item.picUrl} alt="${item.alt}">
			   <div class="size-container">Size: ${item.size}</div>
			   <div class="deleteButton" data-name="${item.label}">X</div></div>
		
			   <div class="price-box">$${item.price}.00</div>
		
			   <div class="qty-box"><i class="fas fa-angle-down" data-name="${item.label}"></i>${item.qty}<i class="fas fa-angle-up" data-name="${item.label}"></i></div>
			   
			   <div class="totalPrice-box">$${item.price * item.qty}.00</div>
			   </div>
			   `;

			sum += item.price * item.qty;
		});
	}

	shopcartOverlay.innerHTML += `
	<div id="display-subTot-container">
	<p id="subTot-text">Sub total is: $${sum}.00</p>
	</div>
	`;
	updateCartCounter();

	//HERE WE ARE CREATING THE DELETE BUTTONS AND INCREASE/DECECREASE ARROWS.
	let deleteButtons = shopcartOverlay.querySelectorAll('.deleteButton');
	deleteButtons.forEach((button) => {
		button.addEventListener('click', removeFromCart);
	});

	let upArrow = document.querySelectorAll('.fa-angle-up');
	let downArrow = document.querySelectorAll('.fa-angle-down');
	upArrow.forEach((button) => {
		button.addEventListener('click', addMore);
	});
	downArrow.forEach((button) => {
		button.addEventListener('click', reduce);
	});
}

//FUNCTION TO SHOW SHOPPING CART LABEL------------------------------------------
function cartLabel() {
	let displayLabel = document.createElement('div');

	shopcartOverlay.appendChild(displayLabel);
	displayLabel.id = 'display-label-container';

	displayLabel.innerHTML += `
							<h5>PRODUCTS</h5>
							<h5>PRICE</h5>
							<h5>QUANTITY</h5>
							<h5>TOTAL</h5>
						`;
}

//HERE IS MY REMOVE FROM CART FUNCTION ----------------------------------------
function removeFromCart(event) {
	let storedCart = JSON.parse(localStorage.getItem('cart'));
	let buttonName = event.target.dataset.name;
	//LOOP FOR SEARCHING SELECTED ITEM TO DELETE, EMPTYING ITS QUANTITY PROP BEFORE SPLICING IT OUT
	for (let i = 0; i < storedCart.length; i += 1) {
		if (storedCart[i].label === buttonName) {
			storedCart[i].qty = 0;
			storedCart.splice(i, 1);
			localStorage.setItem('cart', JSON.stringify(storedCart));
		}
	}

	if (storedCart.length === 0) {
		cartCounter.innerHTML = 0;
	}
	shopcartOverlay.innerHTML = '';

	displayCart();
}

// HERE IS MY HIDECART FUNCTION--------------------------------------------------
function hideCart() {
	shopcartOverlay.innerHTML = '';
	shopcartOverlay.style.right = '100vw';
	shopcartOverlay.style.display = 'none';
	shopBag.src = '/skate-shop/images/shopbag.svg';
}

//HERE IS MY ADDMORE ARROW FUNCTION -------------------------------
function addMore(event) {
	let storedCart = JSON.parse(localStorage.getItem('cart'));
	let upArrowName = event.target.dataset.name;
	let product = storedCart.find((el) => el.label === upArrowName);
	product.qty++;
	localStorage.setItem('cart', JSON.stringify(storedCart));

	shopcartOverlay.innerHTML = '';
	displayCart();
}

//HERE IS MY REDUCE ARROW FUNCTION --------------------------------
function reduce(event) {
	let storedCart = JSON.parse(localStorage.getItem('cart'));
	let downArrowName = event.target.dataset.name;
	let product = storedCart.find((el) => el.label === downArrowName);
	product.qty--;
	localStorage.setItem('cart', JSON.stringify(storedCart));

	shopcartOverlay.innerHTML = '';
	displayCart();
}

//HERE IS MY SKATE ANIMATION FUNCTION
function onScroll() {
	let yPos = window.pageYOffset;
	if (yPos > 125) {
		leftSkate.style.transform = 'translate(-400px)';
		rightSkate.style.transform = 'translate(400px)';
	} else {
		leftSkate.style.transform = 'translate(0)';
		rightSkate.style.transform = 'translate(0)';
	}
}

//HERE IS MY BURGERMENU FUNCTION
function toggleMenu() {
	if (burgerMenu.style.right === '100vw') {
		burgerBars[0].style.transform = 'translateY(10px) rotate(45deg)';
		burgerBars[1].style.transform = 'translateX(727px)';
		burgerBars[2].style.transform = 'translateY(-10px) rotate(-46deg)';
		burgerMenu.style.right = 0;
	} else {
		burgerBars.forEach((bar) => (bar.style.transform = ''));
		burgerMenu.style.right = '100vw';
	}
}

// HERE IS A FUNCTION FOR GENERATING OTHER COLOR OPTIONS FOR LIFER HELMET MATTE---------------------------------------
function functionColor(event) {
	let productImage = document.querySelector('#product-img');
	const choiceURL_ID = this.src;
	const choiceURL = choiceURL_ID.substring(21, 51);
	productImage.src = choiceURL;
}

//HERE IS A FUNCTION TO GET A RANDOM SKATER NAME FOR NAME-GEN PAGE------------------------------------------------------------
function generateName() {
	const index = Math.floor(Math.random() * skateNames.length);
	const randomName = skateNames[index];
	skaterNameBox.style.visibility = 'visible';
	skaterNameBox.innerHTML = randomName;
}

//FUNCTION FOR CAPTURING THE SIZE IF THE INPUT IS CHANGED-------------------
function captureSize() {
	choice = sizeSelector.value;
	product.label = product.name + choice;
	product.size = choice;
}
