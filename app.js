import { data } from '/datafile.js';

const menuLabels = document.querySelector('.menu-labels');
const menuContainer = document.querySelector('.container');
const searchInput = document.querySelector('#search-input');
const clearInput = document.querySelector('.clearInput');

const getUniqueNames = (data) => {
	const newArr = [];
	for (let i = 0; i < data.length; i++) {
		if (!newArr.includes(data[i].category)) {
			newArr.push(data[i].category);
		}
	}

	return newArr;
};

const capitalize = (word) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const categories = getUniqueNames(data);
categories.unshift('all');

const renderMenuBtns = () => {
	for (let i = 0; i < categories.length; i++) {
		let customClass = '';
		if (i === 0) {
			customClass = 'menu-label active-menu-btn';
		} else {
			customClass = 'menu-label';
		}
		let btn = `<button class="${customClass}">${capitalize(categories[i])}</button>`;
		menuLabels.innerHTML += btn;
	}
	menuLabels.innerHTML += '<button class="cart hoverStyle">Cart (0)</button>';

	const buttons = menuLabels.querySelectorAll('.menu-label');
	const cart = menuLabels.querySelector('.cart');

	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', filteredCategories);
	}

	cart.addEventListener('click', (event) => {
		menuContainer.innerHTML = '';
		// menuLabels.innerHTML += '<button class="clearCart hoverStyle">Clear Cart</button>';
		// menuLabels.innerHTML += '<button class="orderBtn hoverStyle">Order</button>';

		menuContainer.innerHTML = `<div class="cart-container"></div>`;

		renderCartMenuItems(cartMenuItems);
	});
};

const renderCartMenuItems = (cartItems) => {
	const cartContainer = menuContainer.querySelector('.cart-container');
	if (cartItems.length) {
		for (let item of cartItems) {
			cartContainer.innerHTML += `<div class="card">
            <div class="card-left">
            <img src="${item.img}" />
            </div>
            <div class="card-right">
              <div class="title">
                <strong>${item.title}</strong>
                <span>${item.price}</span>
              </div>
              <p>
                ${item.desc}
              </p>
            </div>
          </div>`;
		}
	} else {
		cartContainer.innerHTML = `<p class='no-data'>No items in the cart.</p>`;
	}
};

let filteredData = [];
let cartMenuItems = [];

const renderMenuData = (arr) => {
	menuContainer.innerHTML = '';
	if (arr.length) {
		for (let item of arr) {
			menuContainer.innerHTML += `<div class="card">
            <div class="card-left">
              <img src="${item.img}" alt="" />
            </div>
            <div class="card-right">
              <div class="title">
                <strong>${capitalize(item.title)}</strong>
                <span>$${item.price}</span>
              </div>
              <p>${item.desc}</p>
              <button class="addToCartBtn"id="${item.id}">Add To Cart</button>
            </div>
          </div>`;
		}
		const addToCartBtns = menuContainer.querySelectorAll('button');
		const cart = document.querySelector('.cart');
		for (let btn of addToCartBtns) {
			btn.addEventListener('click', () => {
				const menuItem = data.find((el) => el.id == btn.id);
				cartMenuItems.push(menuItem);
				cart.innerText = `Cart (${cartMenuItems.length})`;
			});
		}
	} else {
		menuContainer.innerHTML = "<p class='no-data'>No data found</p>";
	}
};

const getFilterData = (data, name) => {
	const filteredData = [];
	for (let item of data) {
		if (item.category === name) {
			filteredData.push(item);
		}
	}
	return filteredData;
};

const filteredCategories = (event) => {
	const menuLabelBtns = document.querySelectorAll('.menu-label');
	for (let btn of menuLabelBtns) {
		btn.classList.remove('active-menu-btn');
	}
	const currentActiveBtn = event.target;
	currentActiveBtn.classList.add('active-menu-btn');
	const btnName = currentActiveBtn.innerText;
	if (btnName === 'All') {
		filteredData = data;
	} else {
		filteredData = getFilterData(data, btnName.toLowerCase());
	}
	renderMenuData(filteredData);
};

renderMenuBtns();
renderMenuData(data);

searchInput.addEventListener('keyup', (event) => {
	const filteredSearchData = [];
	clearInput.style.display = 'inline';
	const value = event.target.value.trim();
	console.log(value);

	if (value !== '') {
		for (let item of data) {
			if (item.title.includes(value.toLowerCase()) || item.desc.includes(value.toLowerCase())) {
				filteredSearchData.push(item);
			}
		}
		renderMenuData(filteredSearchData);
	}
});

clearInput.addEventListener('click', (event) => {
	const searchInputSibling = event.target.previousElementSibling;
	searchInputSibling.value = '';
	clearInput.style.display = 'none';
	renderMenuData(data);
});
