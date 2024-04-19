"user strict"

const products = [{
    image: 'img/Products/Product1.png',
    name: 'Product 1 - # Pairs',
    rating: {
        stars: 3.5,
        count: 87
    },
    priceCents: 1090
},{
    image: 'img/Products/Product2.png',
    name: 'Product 2 - # Pairs',
    rating: {
        stars: 4,
        count: 127
    },
    priceCents: 2095
},{
    image: 'img/Products/Product3.png',
    name: 'Product 3 - # Pairs',
    rating: {
        stars: 4.5,
        count: 56
    },
    priceCents: 799
},{
    image: 'img/Products/Product4.png',
    name: 'Product 4 - # Pairs',
    rating: {
        stars: 5,
        count: 2197
    },
    priceCents: 299
}];

let productsHTML = '';

products.forEach((product)=>{
    productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
        <img src="${product.image}" alt="product-image" class="product-image">
    </div>
    <div class="product-name limit-text-to-2-lines">
        ${product.name}
    </div>
    <div class="product-rating-container">
        <img src="/img/ratings/rating-${product.rating.stars * 10}.png" alt="product-rating-stars" class="product-rating-stars">
        <div class="product-rating-count link-primary">${product.rating.count}</div>
    </div>
    <div class="product-price">
        €${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
        <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
        <img src="img/icons/checkmark.png" alt="green checkmark icon">
        Added
    </div>

    <button class="add-to-cart-button button-primary">
        Add to Cart
    </button>
    </div>`;
});

console.log(productsHTML);

document.querySelector(".js-products-grid").innerHTML = productsHTML