import {renderOrderSummary} from './checkout/OrderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import {loadProducts} from './data/products.js';

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})