import {renderOrderSummary} from './checkout/OrderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProductsFetch} from './data/products.js';

loadProductsFetch().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});

