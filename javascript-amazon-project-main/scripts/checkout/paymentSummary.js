import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents = productPriceCents + product.priceCents*cartItem.quantity;
        const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;
    let totalNumberOfItem = 0;
    cart.forEach(item => totalNumberOfItem += item.quantity);
    document.querySelector(".checkout-header-middle-section").innerHTML = `${!totalNumberOfItem? "Checkout Page" : "Checkout (" + totalNumberOfItem + "items)"}`;
    document.querySelector('.js-payment-summary').innerHTML = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${totalNumberOfItem}):</div>
            <div class="payment-summary-moneMath.round(y">$${(Math.round(productPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(shippingPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(Math.round(totalBeforeTax)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(taxCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(Math.round(totalCents)/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
}