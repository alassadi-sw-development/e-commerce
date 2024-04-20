"use strict"
import {cart,removeFromCart,updateQuantity} from './data/cart.js'
import {products} from './data/products.js'
import {formatCurrency} from './utils/money.js';
import { updateCartQuantity } from './data/cart.js';

let cartSummaryHTML = '';

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
        <img class="product-image"
            src="${matchingProduct.image}">

        <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price">
            €${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
            <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                Update
            </span>
            <input type="number" inputmode="numeric" max="99" min="0" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
            <span class="save-quantity-link link-primary save-quantity-link-${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
            </span>
            </div>
        </div>

        <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            <div class="delivery-option">
            <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                FREE Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $4.99 - Shipping
                </div>
            </div>
            </div>
            <div class="delivery-option">
            <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                Monday, June 13
                </div>
                <div class="delivery-option-price">
                $9.99 - Shipping
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    `;
});

document.querySelector(".js-order-summary").innerHTML= cartSummaryHTML;

let UpdateLinks = document.querySelectorAll(`.js-update-quantity-link`);
    UpdateLinks.forEach((link)=>{
    link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        const inputTag = document.querySelector(`.js-quantity-input-${productId}`);
        const saveButton = document.querySelector(`.save-quantity-link-${productId}`);
        inputTag.classList.add('is-editing-quantity');
        saveButton.classList.add('is-editing-quantity');
        link.style.display = 'none';
        saveButton.addEventListener('click', ()=>{
            const newQuantity=Number(inputTag.value);
            updateQuantity(productId, newQuantity);
            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuantity;
        
            updateCartQuantity();
            link.style.display = 'inline';
            inputTag.classList.remove('is-editing-quantity');
            saveButton.classList.remove('is-editing-quantity');
        })
    });
});

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', ()=> {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    });
});
updateCartQuantity();

