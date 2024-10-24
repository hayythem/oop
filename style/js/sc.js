class CartItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    this.quantity = 0; // Start with zero quantity
  }

  addQuantity() {
    this.quantity++;
  }

  removeQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  getTotalPrice() {
    return this.quantity * this.price;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  updateTotal() {
    const sum = this.items.reduce(
      (total, item) => total + item.getTotalPrice(),
      0
    );
    document.getElementById("total-price").textContent = sum;
  }

  removeItem(index) {
    this.items.splice(index, 1); // Remove item from cart
  }
}

const shoppingCart = new ShoppingCart();

// Initialize cart items
document.querySelectorAll(".card").forEach((card, index) => {
  const name = card.querySelector(".card-title").textContent;
  const price = Number(card.querySelector(".unit-price").textContent);
  const cartItem = new CartItem(name, price);
  shoppingCart.addItem(cartItem);
});

// Event listeners for hearts
document.querySelectorAll(".fa-heart").forEach((heart) => {
  heart.addEventListener("click", function () {
    heart.classList.toggle("toggleHeart");
  });
});

// Event listeners for trash cans
document.querySelectorAll(".fa-trash-can").forEach((trashBtn, index) => {
  trashBtn.addEventListener("click", function () {
    shoppingCart.removeItem(index); // Remove item from cart
    trashBtn.closest(".card").remove(); // Remove card from DOM
    shoppingCart.updateTotal(); // Update total price
  });
});

// Event listeners for plus buttons
document.querySelectorAll(".plus-btn").forEach((plusBtn, index) => {
  plusBtn.addEventListener("click", function () {
    shoppingCart.items[index].addQuantity(); // Increment quantity
    plusBtn.nextElementSibling.textContent = shoppingCart.items[index].quantity;
    shoppingCart.updateTotal(); // Update total price
  });
});

// Event listeners for minus buttons
document.querySelectorAll(".minus-btn").forEach((minusBtn, index) => {
  minusBtn.addEventListener("click", function () {
    shoppingCart.items[index].removeQuantity(); // Decrement quantity
    minusBtn.previousElementSibling.textContent =
      shoppingCart.items[index].quantity;
    shoppingCart.updateTotal(); // Update total price
  });
});
