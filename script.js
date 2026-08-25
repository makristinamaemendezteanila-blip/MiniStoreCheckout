function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 5000) {
        discount = subtotal * 0.10;
    } else if (subtotal >= 3000) {
        discount = subtotal * 0.07;
    } else if (subtotal >= 1000) {
        discount = subtotal * 0.05;
    } else {
        discount = 0;
    }

    return discount;
}

function getDeliveryFee(option) {
    let fee = 0;

    switch (option) {
        case "1":
            fee = 0;
            break;
        case "2":
            fee = 80;
            break;
        case "3":
            fee = 150;
            break;
        default:
            fee = 0;
    }

    return fee;
}

document.addEventListener("DOMContentLoaded", function () {

    const productCount = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");
    const customerName = document.getElementById("customerName");
    const deliveryOption = document.getElementById("deliveryOption");

    productCount.addEventListener("input", function () {

        productsContainer.innerHTML = "";

        const count = Number(productCount.value);

        if (count > 0) {

            for (let i = 0; i < count; i++) {

                const productDiv = document.createElement("div");

                productDiv.innerHTML = `
                    <h3>Product ${i + 1}</h3>

                    <label for="productName-${i}">Product Name</label>
                    <input type="text" id="productName-${i}">

                    <br>

                    <label for="productPrice-${i}">Price</label>
                    <input type="number" id="productPrice-${i}" min="0">

                    <br>

                    <label for="productQuantity-${i}">Quantity</label>
                    <input type="number" id="productQuantity-${i}" min="0">

                    <br><br>
                `;

                productsContainer.appendChild(productDiv);
            }
        }
    });

    calculateBtn.addEventListener("click", function () {

        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        const name = customerName.value.trim();
        const count = Number(productCount.value);

        if (name === "") {
            validationMessage.textContent = "Customer Name is required.";
            return;
        }

        if (count <= 0 || !Number.isFinite(count)) {
            validationMessage.textContent = "Number of Products must be a positive number.";
            return;
        }

        let subtotal = 0;
        let productDetails = "";
        let valid = true;

        for (let i = 0; i < count; i++) {

            const productName = document.getElementById(`productName-${i}`);
            const productPrice = document.getElementById(`productPrice-${i}`);
            const productQuantity = document.getElementById(`productQuantity-${i}`);

            const nameValue = productName.value.trim();
            const price = Number(productPrice.value);
            const quantity = Number(productQuantity.value);

            if (nameValue === "") {
                validationMessage.textContent = `Product Name ${i + 1} is required.`;
                valid = false;
                break;
            } else if (price <= 0 || !Number.isFinite(price)) {
                validationMessage.textContent = `Price ${i + 1} must be a positive number.`;
                valid = false;
                break;
            } else if (quantity <= 0 || !Number.isFinite(quantity)) {
                validationMessage.textContent = `Quantity ${i + 1} must be a positive number.`;
                valid = false;
                break;
            } else {
                const amount = calculateItemAmount(price, quantity);

                subtotal += amount;

                productDetails += `
                    <p>
                        ${i + 1}. ${nameValue}<br>
                        Price: ₱${price.toFixed(2)}<br>
                        Quantity: ${quantity}<br>
                        Amount: ₱${amount.toFixed(2)}
                    </p>
                `;
            }
        }

        if (!valid) {
            return;
        }

        const discount = calculateDiscount(subtotal);
        const deliveryFee = getDeliveryFee(deliveryOption.value);
        const finalAmount = subtotal - discount + deliveryFee;

        let discountRate = 0;

        if (subtotal >= 5000) {
            discountRate = 10;
        } else if (subtotal >= 3000) {
            discountRate = 7;
        } else if (subtotal >= 1000) {
            discountRate = 5;
        } else {
            discountRate = 0;
        }

        let deliveryType = "";

        switch (deliveryOption.value) {
            case "1":
                deliveryType = "Store Pickup";
                break;
            case "2":
                deliveryType = "Standard Delivery";
                break;
            case "3":
                deliveryType = "Express Delivery";
                break;
            default:
                deliveryType = "Store Pickup";
        }

        orderSummary.innerHTML = `
            <h2>MINI STORE CHECKOUT SYSTEM</h2>

            <p><strong>Customer:</strong><br>${name}</p>

            ${productDetails}

            <h2>ORDER SUMMARY</h2>

            <p>Subtotal: ₱${subtotal.toFixed(2)}</p>

            <p>Discount Rate: ${discountRate}%</p>

            <p>Discount Amount: ₱${discount.toFixed(2)}</p>

            <p>Delivery Type: ${deliveryType}</p>

            <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>

            <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
        `;
    });
});
