import {cart} from '../data/cart-class.js'
const products = JSON.parse(localStorage.getItem("searchProducts"));
let UserDetails = JSON.parse(sessionStorage.getItem("UserDetails"));
console.log(UserDetails.username);

const cartCount = document.querySelector(".js-cart-quantity").innerHTML = cartQuantity()

function cartQuantity(){
  let quantity = 0;
  cart.cartItems.forEach( element => quantity += element.quantity)
  return quantity
}

console.log(products);
document.addEventListener("DOMContentLoaded", function() {
  fetch(`//localhost:8081/myCart?username=${UserDetails.username}`)
      .then(response => response.json())
      .then(data => {
          renderContent(data);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});

function renderContent(data) {
  const content = document.querySelector('.orders-grid');
  content.style.display = 'block';
  content.innerHTML = "";
  console.log(data);
  for(let i = 0; i < data.length; i++){
    console.log("€"+data[i].totalPrice);
    console.log("Date:", data[i].orderDate);
    console.log(data[i].cartItems);

    content.innerHTML += `
    <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${data[i].orderDate}</div>
      </div>
  </div>

    <div class="order-total">
      <div class="order-header-label">Total:</div>
      <div>$${data[i].totalPrice}</div>
    </div>
  </div>
    `
    data[i].cartItems.forEach(element => {
      content.innerHTML += `
      <div class="order-details-grid">
      <div class="product-image-container">
        <img src="${mapProductDetails(element.productId, products).image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${mapProductDetails(element.productId, products).name}
        </div>
        <div class="product-delivery-date">
          Expected arrival: ${calculateDeliveryDate(data[i].orderDate, element.deliveryOptionId)}
        </div>
        <div class="product-quantity">
          Quantity: ${element.quantity}
        </div>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary" disabled>
            Track package
          </button>
        </a>
      </div>
    </div>
    `
    });

  }
  };

  function calculateDeliveryDate(orderDate, deliveryOptionId) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = new Date(orderDate);
    
    // Add days based on delivery option
    switch (deliveryOptionId) {
        case '1': // 7 days
            date.setDate(date.getDate() + 7);
            break;
        case '2': // 3 days
            date.setDate(date.getDate() + 3);
            break;
        case '3': // 1 day
            date.setDate(date.getDate() + 1);
            break;
        default:
            // Invalid delivery option
            return null;
    }

    return date.toLocaleDateString('en-US', options);
}

/* function mapProductDetails(cartItems, products)
{const ProductDetails = cartItems.map(item => {
  const product = products.find(product => product.id === item.productId);
  if (product) {
    return {
      id: item.productId,
      image: product.image,
      name: product.name,
      quantity: item.quantity
    };
  }
});} */

function mapProductDetails(ItemId, products) {
  const product = products.find(product => product.id === ItemId);
  return product || null;
}

const signout = document.querySelector(".js-signout")

signout.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    sessionStorage.removeItem('UserDetails');
    console.log("UserDetails removed from sessionStorage");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
});