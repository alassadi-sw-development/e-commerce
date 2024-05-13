import {renderOrderSummary} from './checkout/OrderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProductsFetch} from './data/products.js';

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch(error){
    console.log("Unexpected Error, Please try again later");
  }
  renderPaymentSummary();
  renderOrderSummary();
}
loadPage()

/* loadProductsFetch().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}); */

