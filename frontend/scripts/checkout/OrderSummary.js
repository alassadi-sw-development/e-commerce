"use strict"
import {cart} from '../data/cart-class.js'
import {getProduct} from '../data/products.js'
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){

let cartSummaryHTML = '';

cart.cartItems.forEach((cartItem)=>{
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${deliveryOption.deliveryDate}
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
            <input type="number" inputmode="numeric" max="99" min="1" class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartItem.quantity}">
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
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) =>{
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `€${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=`<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
            ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                    ${deliveryOption.deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>`
    });
    return html;
}

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
            const newQuantity = Math.abs(Math.round(parseFloat(inputTag.value)));
            cart.updateQuantity(productId, newQuantity);
            const quantityLabel = document.querySelector(
                `.js-quantity-label-${productId}`
            );
            quantityLabel.innerHTML = newQuantity;
        
            cart.updateCartQuantity();
            link.style.display = 'inline';
            inputTag.classList.remove('is-editing-quantity');
            saveButton.classList.remove('is-editing-quantity');
            renderPaymentSummary();
        })
    });
});

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', ()=> {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        renderPaymentSummary();

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
    });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', ()=> {
        const { productId, deliveryOptionId } = element.dataset;
        cart.updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
    });
});

}
renderOrderSummary();
cart.updateCartQuantity();