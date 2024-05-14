"use strict"
import {cart} from '../data/cart-class.js'
import { getProduct } from "../data/products.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
//import { addOrder } from '../data/order.js';

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents= 0;
    let cartQuantity = 0; 
    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

        cartQuantity += cartItem.quantity;
    });
    const totalBeforeTaxCents = productPriceCents+shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.19;
    const totalCents = totalBeforeTaxCents + taxCents;

        const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row js-cart-quantity">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">
        €${formatCurrency(productPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
        €${formatCurrency(shippingPriceCents)}
        </div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
        €${formatCurrency(totalBeforeTaxCents)}
        </div>
    </div>

    <div class="payment-summary-row">
        <div>Tax (MwSt. 19%):</div>
        <div class="payment-summary-money">
        €${formatCurrency(taxCents)}
        </div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
        €${formatCurrency(totalCents)}
        </div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>`;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    const PlaceOrderBtn = document.querySelector(".js-place-order");
    PlaceOrderBtn.addEventListener("click", () => {
        sendCartPatchRequest();
    });
    
    async function sendCartPatchRequest() {
        const UpdateCartList = cart;
        try {
            const confirmResponse = await fetch('//localhost:8081/update-cart', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ arrayData: UpdateCartList })
            });
            if (confirmResponse.ok) {
                console.log('PATCH request successful');
            } else {
                console.error('PATCH request failed');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
        //window.location.href = "orders.html";
    }
    
/*     document.querySelector('.js-place-order').addEventListener("click", async ()=>{
        try {            
            const response = await fetch("https://supersimplebackend.dev/orders", {
                method: 'POST',
                headers: {
                    'content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
            const order = await response.json();
            addOrder(order)
        } catch (error) {
            console.log(`unexpected error ${error}`);
        }

        window.location.href = "orders.html";
    }); */
}