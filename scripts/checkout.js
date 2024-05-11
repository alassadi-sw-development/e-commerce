import {renderOrderSummary} from './checkout/OrderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProductsFetch} from './data/products.js';

async function loadPage() {
  await loadProductsFetch();

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();


/* loadProductsFetch().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}); */

