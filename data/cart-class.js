class Cart {
  /* I SAVED MY CART TO LOCAL STORAGE SO ANY TIME I REFRESH, MY CART WONT BE RESET EVERYTIME */
  cartItems;
// THE PROPERTY BELOW IS KNOWN AS A PRIVATE PROPERTY
  #localStorageKey;

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  /* AT FIRST, WHEN THE CART IS BEING SAVED TO LOCAL STORAGE, NOTING IS BEING SAVED IN LOCAL STORAGE WHICH MEANS THE VALUE OF THE CART IS BEING FALSY
  !CART FLIPS THE CART TO A TRUTHY VALUE WHICH THEN RUNS THE CODE */
  if(!this.cartItems) {
    this.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  /* THE FUNCTION BELOW ADDS A PRODUCT TO THE CART; */
  addToCart (productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
  }

  /* THE FUNCTION BELOW REMOVES A PRODUCT FROM THE CART */

  removeFromCart (productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  updateDeliveryOption (productId, deliveryOptionId) {
    let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
         
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;
      
      this.saveToStorage();
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);