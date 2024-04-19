export const cart = [];

export function addToCart(productId){
    let matchingCartItem;

    cart.forEach((Cartitem)=>{
        if (productId === Cartitem.productId){
            matchingCartItem = Cartitem;
        }
    });
    if (matchingCartItem){
        matchingCartItem.quantity +=1;
    }else {
    cart.push({
        productId: productId,
        quantity: 1
    });            
    }
}