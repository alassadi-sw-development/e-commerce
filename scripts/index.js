"user strict"
import {cart, addToCart} from './data/cart.js'
import {products as importedProdutcs} from './data/products.js'
import {formatCurrency} from './utils/money.js';
let productsHTML = '';

let products = importedProdutcs.slice();

const searchBtn = document.querySelector(".js-search-button");
const searchbar = document.querySelector(".js-search-bar");

searchBtn.addEventListener("click", handleSearch);

searchbar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});

const productsGrid = document.querySelector(".js-products-grid")
function renderProducts(){
        
    productsGrid.innerHTML="";
    
    for (let i = 0; i < products.length; i++) {
    const product = products[i];

    // Create main container
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    // Create product image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('product-image-container');

    // Create image element
    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.setAttribute('src', product.image);
    productImage.setAttribute('alt', 'product-image');

    // Append image to image container
    imageContainer.appendChild(productImage);

    // Create product name element
    const productName = document.createElement('div');
    productName.classList.add('product-name', 'limit-text-to-2-lines');
    productName.textContent = product.name;

    // Create product rating container
    const ratingContainer = document.createElement('div');
    ratingContainer.classList.add('product-rating-container');

    // Create rating stars image element
    const ratingStars = document.createElement('img');
    ratingStars.classList.add('product-rating-stars');
    ratingStars.setAttribute('src', "./img/ratings/rating-"+(product.rating.stars * 10)+".png");
    ratingStars.setAttribute('alt', 'product-rating-stars');

    // Create rating count element
    const ratingCount = document.createElement('div');
    ratingCount.classList.add('product-rating-count', 'link-primary');
    ratingCount.textContent = product.rating.count;

    // Append rating stars and count to rating container
    ratingContainer.appendChild(ratingStars);
    ratingContainer.appendChild(ratingCount);

    // Create product price element
    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    productPrice.textContent = "€"+formatCurrency(product.priceCents);

    // Create product quantity container
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('product-quantity-container');

    // Create select element for quantity
    const quantitySelect = document.createElement('select');
    quantitySelect.classList.add("js-quantity-selector-"+product.id);

    // Loop to create options for quantity
    for (let j = 1; j <= 10; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = j;
        if (j === 1) {
            option.selected = true;
        }
        quantitySelect.appendChild(option);
    }

    // Append select to quantity container
    quantityContainer.appendChild(quantitySelect);

    // Create product spacer
    const productSpacer = document.createElement('div');
    productSpacer.classList.add('product-spacer');

    // Create added to cart message container
    const addedToCart = document.createElement('div');
    addedToCart.classList.add('added-to-cart', "js-add-to-cart-"+product.id);

    // Create added to cart message icon
    const checkmarkIcon = document.createElement('img');
    checkmarkIcon.setAttribute('src', './img/icons/checkmark.png');
    checkmarkIcon.setAttribute('alt', 'green checkmark icon');

    // Create added to cart message
    const addedText = document.createElement("span");
    addedText.innerText = "Added";
    addedText.style.padding = "0 8px"
    // Append icon and text to added to cart container
    addedToCart.appendChild(checkmarkIcon);
    addedToCart.appendChild(addedText);


    // Create add to cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart-button', 'button-primary', 'js-add-to-cart');
    addToCartButton.setAttribute('data-product-id', product.id);
    addToCartButton.textContent = 'Add to Cart';

    // Append all elements to product container
    productContainer.appendChild(imageContainer);
    productContainer.appendChild(productName);
    productContainer.appendChild(ratingContainer);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(quantityContainer);
    productContainer.appendChild(productSpacer);
    productContainer.appendChild(addedToCart);
    productContainer.appendChild(addToCartButton);

    // Append product container to products grid
    productsGrid.appendChild(productContainer);
    
}
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener("click", ()=>{
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
        renderOrderSummary()
        renderPaymentSummary()
        const addedMessage = document.querySelector(".js-add-to-cart-"+productId);


        addedMessage.classList.add('added-to-cart-visible')
        setTimeout(() => {
            setTimeout(() => {
                const previousTimeoutId = addedMessageTimeouts[productId];
                if (previousTimeoutId) {
                clearTimeout(previousTimeoutId);
                }
                const timeoutId = setTimeout(() => {
                addedMessage.classList.remove('added-to-cart-visible');
                }, 2000);
                addedMessageTimeouts[productId] = timeoutId;
            });
        });
    });
});
}

export function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

function saveProductsToStorage(){
    localStorage.setItem('products', JSON.stringify(products));
}

function handleSearch() {
    let searchString = searchbar.value.trim().toLowerCase();
    let newProducts = [];

    if (searchString){
        products = JSON.parse(localStorage.getItem("products"));
        products.forEach((product)=>{
            if(product.name.includes(searchString)){
                newProducts.push(product);
            }
        });
        products = newProducts;
        renderProducts();
    }else {
        products = JSON.parse(localStorage.getItem("products"));
        renderProducts();
    }
}


const addedMessageTimeouts = {};
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener("click", ()=>{
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();

        const addedMessage = document.querySelector(`.js-add-to-cart-${productId}`);


        addedMessage.classList.add('added-to-cart-visible')
        setTimeout(() => {
            setTimeout(() => {
                const previousTimeoutId = addedMessageTimeouts[productId];
                if (previousTimeoutId) {
                clearTimeout(previousTimeoutId);
                }
                const timeoutId = setTimeout(() => {
                addedMessage.classList.remove('added-to-cart-visible');
                }, 2000);
                addedMessageTimeouts[productId] = timeoutId;
    });
});
});
});
updateCartQuantity()
saveProductsToStorage()
renderProducts()