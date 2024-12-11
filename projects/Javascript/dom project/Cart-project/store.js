const cusomShopContainer = document.querySelector(".custom-shop-container");
const cartItems = document.querySelector(".cart-items");

cusomShopContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const currentElement = e.target;

  if (currentElement.classList.contains("shop-item-button")) {
    const mainShopItemDiv = currentElement.parentElement.parentElement;

    // console.log(mainShopItemDiv, "mainShopItemDiv");
    const cartItemName =
      mainShopItemDiv.querySelector(".shop-item-title").innerText;
    const cartItemImage = mainShopItemDiv.querySelector(".shop-item-image").src;
    const cartItemPrice =
      mainShopItemDiv.querySelector(".shop-item-price").innerText;

    let isThisItemIsExist = false;

    const getAllCartItems = document.querySelectorAll(".cart-row");

    if (getAllCartItems.length > 0) {
      getAllCartItems.forEach(function (singleCartItem) {
        const productNameCart =
          singleCartItem.querySelector(".cart-item-title")?.innerText;

        if (productNameCart === cartItemName) {
          isThisItemIsExist = true;

          const cartQtyField = singleCartItem.querySelector(
            ".cart-quantity-input"
          );
          cartQtyField.value = parseInt(cartQtyField.value) + 1;
        }
      });
    }

    if (!isThisItemIsExist) {
      const divElement = document.createElement("div");
      divElement.className = "cart-row";
      divElement.innerHTML = `<div class="cart-item cart-column">
                <img
                  class="cart-item-image"
                  src="${cartItemImage}"
                  width="100"
                  height="100"
                />
                <span class="cart-item-title">${cartItemName}</span>
              </div>
              <span class="cart-column">
                $ <span class="cart-price-item-item">${cartItemPrice}</span>
              </span>
              <div class="cart-quantity cart-column" style="flex-grow:1;">
                <input class="cart-quantity-input" type="number" value="1" />
                <button class="btn btn-danger btn-remove" type="button">
                  REMOVE
                </button>
              </div>`;

      cartItems.append(divElement);
    }

    calculateTotal();
  }
});

function calculateTotal() {
  const selectAllCartRows = document.querySelectorAll(".cart-items .cart-row");

  let total = 0;
  selectAllCartRows.forEach(function (singleCartRow) {
    const cartPrice = singleCartRow.querySelector(
      ".cart-price-item-item"
    ).innerText;

    const cartQty = singleCartRow.querySelector(".cart-quantity-input").value;

    total += parseFloat(cartPrice) * cartQty;
  });

  const getTotalElement = document.querySelector(".cart-total-price");

  getTotalElement.innerText = `$ ${total.toFixed(2)}`;
}

cartItems.addEventListener("change", function (event) {
  const currentElement = event.target;

  if (currentElement.classList.contains("cart-quantity-input")) {
    if (currentElement.value <= 0) {
      currentElement.value = 1;
    }
    calculateTotal();
  }
});

cartItems.addEventListener("click", function (event) {
  const currentElement = event.target;

  if (currentElement.classList.contains("btn-remove")) {
    if (confirm("Are you sure ?")) {
      currentElement.parentElement.parentElement.remove();
      calculateTotal();
    }
  }
});
