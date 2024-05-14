import formatCurrency from '../utils/money.js';
import {renderProducts} from '../index.js'

function sortProductsByOption() {
    const selectedOption = this.options[this.selectedIndex];
    switch(selectedOption.value){
        case "A2Z":
            function sortProductsByName(products) {
                products.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                return products;
            }
            products = sortProductsByName(products);
            console.log(products);
            renderProducts();
            break;
        case "Z2A":
            function sortProductsByNameDescending(products) {
                products.sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }
                    return 0;
                });
                return products;
            }
            products = sortProductsByNameDescending(products);
            console.log(products);
            renderProducts();
            break;
        case "high2low":
            function sortProductsByPriceDescending(products) {
                products.sort((a, b) => b.priceCents - a.priceCents);
                return products;
            }
            products = sortProductsByPriceDescending(products);
            console.log(products);
            renderProducts();
            break;
        case "low2high":
            function sortProductsByPriceAscending(products) {
                products.sort((a, b) => a.priceCents - b.priceCents);
                return products;
            }
            products = sortProductsByPriceAscending(products);
            console.log(products);
            renderProducts();
            break;
        case "HighestRating":
            function sortProductsByRatingDescending(products) {
                products.sort((a, b) => b.rating.stars - a.rating.stars);
                return products;
            }
            products = sortProductsByRatingDescending(products);
            console.log(products);
            renderProducts();
            break;
    }
}

export function handleSearch() {
    let searchString = searchbar.value.trim().toLowerCase().replace(/\s/g, '');
    let newProducts = [];

    if (searchString){
        products = JSON.parse(localStorage.getItem("products"));
        products.forEach((product)=>{
            if(product.name.toLowerCase().replace(/\s/g, '').includes(searchString)){
                newProducts.push(product);
            }
        });
        products = newProducts;
        console.log(products);
    }else {
        products = JSON.parse(localStorage.getItem("products"));
    }
    renderProducts();
}

export function getProduct(productId) {
    let products = JSON.parse(localStorage.getItem("products"))
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });
    return matchingProduct;
}

export function sortingProducts() {const selectElement = document.querySelector("#sort-products");

selectElement.addEventListener("change", sortProductsByOption);
}

const searchBtn = document.querySelector(".js-search-button");
const searchbar = document.querySelector(".js-search-bar");
export function searchProducts(){
searchBtn.addEventListener("click", handleSearch);

searchbar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let searchString = searchbar.value.trim().toLowerCase().replace(/\s/g, '');
        let newProducts = [];
    
        if (searchString){
            products = JSON.parse(localStorage.getItem("searchProducts"));
            products = products.map((productDetails)=>{
                if (productDetails.type === "clothing"){
                    return new Clothing(productDetails);
                }else{
                    return new Product(productDetails);
                }
            });
            products.forEach((product)=>{
                if(product.name.toLowerCase().replace(/\s/g, '').includes(searchString)){
                    newProducts.push(product);
                }
            });
            products = newProducts.map((productDetails)=>{
                if (productDetails.type === "clothing"){
                    return new Clothing(productDetails);
                }else{
                    return new Product(productDetails);
                }
            });
            
            renderProducts();
        }else {
            products = JSON.parse(localStorage.getItem("searchProducts"));
            products = products.map((productDetails)=>{
                if (productDetails.type === "clothing"){
                    return new Clothing(productDetails);
                }else{
                    return new Product(productDetails);
                }
            });
            renderProducts();
        }
    }
});}

class Product {
    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }

    getStarsUrl() {
        return "./img/ratings/rating-"+(this.rating.stars * 10)+".png";
    }
    getPrice() {
        return "€"+formatCurrency(this.priceCents)
    }
    extraInfoHTML(){
        const link = document.createElement('a');
        return link
    }
}

class Clothing extends Product {
    sizeChartLink;

    constructor(productDetails) {
        super(productDetails);
        this.sizeChartLink = productDetails.sizeChartLink;
    }

    extraInfoHTML(){
        const link = document.createElement('a');
        link.href = this.sizeChartLink;
        link.target = '_blank';
        link.textContent = 'Size Chart';
        return link
    }
}


let products = [];
function loadProductsFetch(){
    const promise = fetch('//localhost:8081/products').then((response)=>{
    //const promise = fetch('https://alassadi-sw-development.github.io/portfolio/products.json').then((response)=>{
    return response.json();
    }).then((productsData)=>{
        products = productsData.map((productDetails)=>{
            if (productDetails.type === "clothing"){
                return new Clothing(productDetails);
            }else{
                return new Product(productDetails);
            }
        });
        console.log("Load products done!");
        localStorage.setItem("searchProducts", JSON.stringify(products))
    }).catch((error)=>{
        console.log("Unexpected Error, Please try again later");
    });
    return promise;
}

export { loadProductsFetch, products };
/* loadProducts1().then(()=>{
    console.log("next step");
})
 */
/* export function loadProducts(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
        products = JSON.parse(xhr.response).map((productDetails)=>{
            if (productDetails.type === "clothing"){
                return new Clothing(productDetails);
            }else{
                return new Product(productDetails);
            }
        });
        console.log("Load products done!");
        fun();
    })
    xhr.open('GET', 'https://alassadi-sw-development.github.io/portfolio/products.json');
    xhr.send();
} */


/* export const products = [{
    id: "A1",
    image: 'img/Products/Tshirt.png',
    name: 'T-Shirt',
    rating: {
        stars: 4.5,
        count: 2758
    },
    priceCents: 3299,
    type : "clothing",
    sizeChartLink: "img/clothing-size-chart.png"
},{
    id: "A2",
    image: 'img/Products/shirt.png',
    name: 'Shirt',
    rating: {
        stars: 5,
        count: 78
    },
    priceCents: 4599,
    type : "clothing",
    sizeChartLink: "img/clothing-size-chart.png"
},{
    id: "B1",
    image: 'img/Products/socks.png',
    name: 'Socks',
    rating: {
        stars: 1.5,
        count: 8
    },
    priceCents: 599
},{
    id: "B2",
    image: 'img/Products/shoes.png',
    name: 'Shoes',
    rating: {
        stars: 2,
        count: 1758
    },
    priceCents: 11999
}].map((productDetails)=>{
    if (productDetails.type === "clothing"){
        return new Clothing(productDetails);
    }else{
        return new Product(productDetails);
    }
}); */