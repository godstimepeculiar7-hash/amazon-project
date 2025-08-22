/* THERE ARE TWO MAIN TYPES OF EXPORTS */
// THE EXPORT TYPE BELOW WITH THE CURLY BRACES IS KNOWN AS THE NAMED EXPORT;
import { cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
// THE EXPORT TYPE BELOW WITHOUT CURLY BRACES IS KNOWN AS A DEFAULT EXPORT;
// WE USED THE DEFAULT EXPORT BECAUSE WE WANT TO ONLY IMPORT ONE THING FROM DAYJS;
/* THE FUNCTION BELOW IS KNOWN AS AN EXTERNAL LIBRARY WHICH I USED TO MAKE MY WORK MORE DYNAMIC; IT HELPS IN GETTING REAL LIFE; */
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
hello();

/* THE DAYJS LIBRARY IS AN EXTERNAL LIBRARY USED IN JAVASCRIPT IN ORDER TO GET REAL LIFE DATES, AND IT MAKES DEVELOPERS WORK EASY AND NEAT; INSTEAD OF WRITING A NEW CODE TO GET REAL DATES, I JUST USED THE DAYJS EXTERNAL LIBRARY */
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM, D'));

export function renderOrderSummary () {
let cartSummaryHTML = '';

/* THE CODE BELOW IS KNOW AS NORMALIZING CODE
IN NORMALIZING CODE, I USE THE PRODUCTID TO GET MORE INFORMATIONS ABOUT THE PRODUCT, WHICH I LATER SUBSTITUTED WHEN GENERATING MY HTML */
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    } 
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option
    }
  });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `
});

function deliveryOptionsHTML (matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    console.log(deliveryOption.id)
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');

    const priceString = deliveryOption.priceCents === 0
    ? 'FREE'
    : `${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    /* I USED A TERNARY OPERATOR IN MY HTML TO KNOW THE PARTICULAR OPTION TO BE CHECKED USING THE ID OF THE CART, AND THE DELIVERYOPTION ID */

   html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} Shipping
            </div>
          </div>
        </div>

    `
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        /* I USED RECURSION ABOVE IN OTHER FOR THE PAGE TO UPDATE
        RECURSION IS DEFINED WHEN A FUNCTION CALLS IT SELF, OR WHEN A FUNCTIO RERUN IT SELF */
      })
    });
  }



  /* THE TECHNIQUE USED ABOVE TO UPDATE THE DATA, AND REGENERATE THE HTML IS KNOWN AS THE MVC PATTERN
  MVC STANDS FOR MODEL - VIEW - CONTROLLER. IT IS A POPUPLAR TECHNIQUE IN SOFTWARE ENGINEERING.
  IN MVC, WE SPLIT OUT CODE INTO THREE PARTS. THE FIRST PART IS CALLED THE MODEL: THE MODEL IS THE PART OF THE CODE THAT SAVES AND MANAGES THE DATA
  
  THE SECOND PART OF MVC IS THE VIEW: THE VIEW IS THE PART OF THE CODE THAT TAKES THE DATA I.E THE MODEL AND DISPLAYS IT ON THE WEB PAGE
  
  THE LAST PART OF MVC IS THE CONTROLLER: THE CONTROLLER IS THE PART OF THE CODE THAT RUNS SOME CODE WHEN WE INTERACT WITH THE PAGE*/

  // I ALWAYS USE MVC BECAUSE IT MAKES SURE THE WEB PAGE ALWAYS MATCHES MY DATA