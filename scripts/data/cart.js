export const cart = [{
    productId: "A1",
    quantity: 2
},{
    productId: "B1",
    quantity: 1
}];

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