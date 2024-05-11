import formatCurrency from '../utils/money.js';

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

export let products = [];

export function loadProducts(fun) {
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
    } )
    xhr.open('GET', 'https://alassadi-sw-development.github.io/portfolio/products.json');
    xhr.send();
}


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