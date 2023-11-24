import { cocktails } from './dataCocktail.js';

const main = document.querySelector('.main-content');
const search = document.querySelector('#search');
const ulList = document.querySelector('.list');
const clearBtn = document.querySelector('.clear');
// const searchBtn = document.querySelector("#search-btn");

const renderButtons = () => {
	const filterBtn = new Set();

	cocktails.forEach((cocktail) => {
		if (!filterBtn.has(cocktail.strCategory)) {
			filterBtn.add(cocktail.strCategory);
			const btnF = document.createElement('li');
			btnF.classList.add('list-item');
			ulList.appendChild(btnF);
			btnF.innerHTML = `${cocktail.strCategory}`;
		}
	});
};

const renderCocktails = () => {
	cocktails.forEach((cocktail) => {
		const cocktailDiv = document.createElement('div');
		main.appendChild(cocktailDiv);
		cocktailDiv.innerHTML = `<div class="cocktail-item">
            <div class="img-wrapper">
              <img
                src="${cocktail.strDrinkThumb}"
                alt=""ink/vyxwut1468875960.jpg
              />
              <p class="category-type">${cocktail.strCategory}</p>
            </div>
            <p class="cocktail-name">
              ${cocktail.strDrink}
              <span class="alcohol-type">${cocktail.strAlcoholic}</span>
            </p>
          </div>`;
	});
};
renderCocktails();
renderButtons();
