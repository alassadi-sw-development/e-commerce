class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if(!this.cartItems){
        this.cartItems = [{
            productId: "A1",
            quantity: 2,
            deliveryOptionId: '1'
        },{
            productId: "B1",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    let matchingCartItem;
    let selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    this.cartItems.forEach((Cartitem)=>{
        if (productId === Cartitem.productId){
            matchingCartItem = Cartitem;
        }
    });
    if (matchingCartItem){
        matchingCartItem.quantity +=selectedQuantity;
    }else {
    this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: '1'
    });            
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.updateCartQuantity();
    this.saveToStorage();
  }

  updateCartQuantity(){
    let cartQuantity = 0;
    
    this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    
    document.querySelector('.total-Quantity')
    .innerHTML = `${cartQuantity} items`;
    return cartQuantity;
    }

    updateQuantity(productId, newQuantity) {
            let matchingItem;
    
            this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
            });
    
            matchingItem.quantity = newQuantity;
    
            this.saveToStorage();
    }
    
    updateDeliveryOption (productId, deliveryOptionId) {
      let matchingItem;
    
      this.cartItems.forEach((Cartitem)=>{
          if (productId === Cartitem.productId){
              matchingItem = Cartitem;
          }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const BusinessCart = new Cart('cart-business');



console.log(cart);
console.log(BusinessCart);
console.log(BusinessCart instanceof Cart)