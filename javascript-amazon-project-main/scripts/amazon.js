import {products} from "../backend/products.js";

products.map((elem, index)=>{
    console.log(elem);
    return document.querySelector(".main .products-grid").innerHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${elem.image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${elem.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${elem.rating.stars*10}.png"
            />
            <div class="product-rating-count link-primary">${elem.rating.count}</div>
          </div>

          <div class="product-price">$${(elem.priceCents/100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary">Add to Cart</button>
        </div>
    `
})