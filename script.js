function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}

function getDeliveryFee(option) {
    switch (option) {
        case 1:
            return 0;
        case 2:
            return 80;
        case 3:
            return 150;
        default:
            return 0;
    }
}

function generateProductInputs() {
    const productCount = Number(document.getElementById("productCount").value);
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    if (Number.isInteger(productCount) && productCount > 0) {
        for (let i = 0; i < productCount; i++) {
            productsContainer.innerHTML += `
                <div>
                    <h3>Product ${i + 1}</h3>

                    <label for="productName-${i}">Product Name</label>
                    <input type="text" id="productName-${i}">

                    <br>

                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" min="0.01" step="0.01">

                    <br>

                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}" min="1" step="1">

                    <br><br>
                </div>
            `;
        }
    }
}

document.getElementById("productCount").addEventListener("input", generateProductInputs);
document.getElementById("productCount").addEventListener("change", generateProductInputs);

document.getElementById("calculateBtn").addEventListener("click", function () {
    const customerName = document.getElementById("customerName").value.trim();
    const productCountInput = document.getElementById("productCount").value;
    const productCount = Number(productCountInput);
    const deliveryOption = Number(document.getElementById("deliveryOption").value);
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");
    const productsContainer = document.getElementById("productsContainer");

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    if (customerName === "") {
        validationMessage.textContent = "Customer Name is required.";
        return;
    }

    if (
        productCountInput === "" ||
        !Number.isFinite(productCount) ||
        productCount <= 0 ||
        !Number.isInteger(productCount)
    ) {
        validationMessage.textContent = "Number of Products must be a valid positive number.";
        return;
    }

    if (productsContainer.children.length !== productCount) {
        generateProductInputs();
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < productCount; i++) {
        const productName = document.getElementById(`productName-${i}`).value.trim();
        const priceInput = document.getElementById(`productPrice-${i}`).value;
        const quantityInput = document.getElementById(`productQuantity-${i}`).value;

        const price = Number(priceInput);
        const quantity = Number(quantityInput);

        if (productName === "") {
            validationMessage.textContent = `Product Name for Product ${i + 1} is required.`;
            return;
        }

        if (
            priceInput === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            validationMessage.textContent = `Price for Product ${i + 1} must be a valid positive number.`;
            return;
        }

        if (
            quantityInput === "" ||
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            validationMessage.textContent = `Quantity for Product ${i + 1} must be a valid positive number.`;
            return;
        }

        const itemAmount = calculateItemAmount(price, quantity);
        subtotal += itemAmount;

        productDetails += `
            <div>
                <p><strong>${i + 1}. ${productName}</strong></p>
                <p>Price: ₱${price.toFixed(2)}</p>
                <p>Quantity: ${quantity}</p>
                <p>Amount: ₱${itemAmount.toFixed(2)}</p>
            </div>
        `;
    }

    const discount = calculateDiscount(subtotal);
    const deliveryFee = getDeliveryFee(deliveryOption);
    const finalAmount = subtotal - discount + deliveryFee;

    let discountRate;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    let deliveryType;

    switch (deliveryOption) {
        case 1:
            deliveryType = "Store Pickup";
            break;
        case 2:
            deliveryType = "Standard Delivery";
            break;
        case 3:
            deliveryType = "Express Delivery";
            break;
        default:
            deliveryType = "Store Pickup";
    }

    orderSummary.innerHTML = `
        <h2>MINI STORE CHECKOUT SYSTEM</h2>
        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <h3>ORDER SUMMARY</h3>
        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>Discount Rate:</strong> ${discountRate}%</p>
        <p><strong>Discount Amount:</strong> ₱${discount.toFixed(2)}</p>
        <p><strong>Delivery Type:</strong> ${deliveryType}</p>
        <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
        <p><strong>Final Amount:</strong> ₱${finalAmount.toFixed(2)}</p>
    `;
});
