/* I SAVED MY CART TO LOCAL STORAGE SO ANY TIME I REFRESH, MY CART WONT BE RESET EVERYTIME */
export let cart = JSON.parse(localStorage.getItem('cart'));
/* AT FIRST, WHEN THE CART IS BEING SAVED TO LOCAL STORAGE, NOTING IS BEING SAVED IN LOCAL STORAGE WHICH MEANS THE VALUE OF THE CART IS BEING FALSY
!CART FLIPS THE CART TO A TRUTHY VALUE WHICH THEN RUNS THE CODE */
if(!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
    }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}



function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
}
/* THE FUNCTION BELOW ADDS A PRODUCT TO THE CART; */
export  function addToCart (productId) {
      let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
      }
      saveToStorage();
  };

  /* THE FUNCTION BELOW REMOVES A PRODUCT FROM THE CART */

export function removeFromCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    cart = newCart;
    saveToStorage();
  };

export function updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;
      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      
      saveToStorage();
  }