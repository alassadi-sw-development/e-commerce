
export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [{
        productId: "A1",
        quantity: 2,
        deliveryOptionId: '1'
    },{
        productId: "B1",
        quantity: 1,
        deliveryOptionId: '2'
    }];
}


export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
    let matchingCartItem;
    let selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((Cartitem)=>{
        if (productId === Cartitem.productId){
            matchingCartItem = Cartitem;
        }
    });
    if (matchingCartItem){
        matchingCartItem.quantity +=selectedQuantity;
    }else {
    cart.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: '1'
    });            
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    updateCartQuantity();
    saveToStorage();
}
export function updateCartQuantity(){
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });
    
    document.querySelector('.total-Quantity')
    .innerHTML = `${cartQuantity} items`;
    return cartQuantity;
    }

export function updateQuantity(productId, newQuantity) {
        let matchingItem;

        cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
        });

        matchingItem.quantity = newQuantity;

        saveToStorage();
    }

    export function updateDeliveryOption (productId, deliveryOptionId) {
        let matchingItem;

        cart.forEach((Cartitem)=>{
            if (productId === Cartitem.productId){
                matchingItem = Cartitem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        saveToStorage();
    }