import { cart, removeFromCart, updateDeliveryOptions } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((elem) => {
    const productId = elem.productId;
    let matchingProducts;
    products.forEach((product) => {
      if (product.id == productId) {
        matchingProducts = product;
      }
    });

    const deliveryOptionId = elem.deliveryOptionsId;
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, "day")
      .format("dddd, MMMM D");
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${
        matchingProducts.id
      }">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${matchingProducts.image}>

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProducts.name}
            </div>
            <div class="product-price">
              $${(matchingProducts.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${elem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                matchingProducts.id
              }">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options js-delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProducts, elem)}
          </div>
        </div>
      </div>
      `;
  });

  function deliveryOptionsHTML(matchingProducts, elem) {
    let html = "";
    deliveryOptions.forEach((item) => {
      const today = dayjs();
      const deliveryDate = today
        .add(item.deliveryDays, "day")
        .format("dddd, MMMM D");
      const priceString =
        item.priceCents == "0"
          ? "Free"
          : `$${(item.priceCents / 100).toFixed(2)} - `;
      const isChecked = item.id === elem.deliveryOptionsId;
      html =
        html +
        `<div class="delivery-option js-delivery-option" data-product-id="${
          matchingProducts.id
        }" data-delivery-option-id="${item.id}">
        <input type="radio" ${isChecked ? "checked" : ""}
          class="delivery-option-input"
          name="delivery-option-${matchingProducts.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      // container.style.display = "none";
      container.remove();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
renderOrderSummary();
