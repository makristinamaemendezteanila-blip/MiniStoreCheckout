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
    option = Number(option);

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

const productCount = document.getElementById("productCount");
const productsContainer = document.getElementById("productsContainer");

productCount.addEventListener("input", function () {
    const count = Number(productCount.value);

    productsContainer.innerHTML = "";

    if (count > 0 && Number.isInteger(count)) {
        for (let i = 0; i < count; i++) {
            const productDiv = document.createElement("div");

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">

                <br>

                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" step="0.01">

                <br>

                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}">

                <br><br>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});

document.getElementById("calculateBtn").addEventListener("click", function () {
    const customerName = document.getElementById("customerName").value.trim();
    const productCountValue = document.getElementById("productCount").value;
    const productCount = Number(productCountValue);
    const deliveryOption = document.getElementById("deliveryOption").value;
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    if (customerName === "") {
        validationMessage.textContent = "Please enter the Customer Name.";
        return;
    } else if (
        productCountValue === "" ||
        !Number.isFinite(productCount) ||
        productCount <= 0 ||
        !Number.isInteger(productCount)
    ) {
        validationMessage.textContent = "Please enter a valid positive Number of Products.";
        return;
    } else {
        validationMessage.textContent = "";
    }

    if (productsContainer.children.length !== productCount) {
        productsContainer.innerHTML = "";

        for (let i = 0; i < productCount; i++) {
            const productDiv = document.createElement("div");

            productDiv.innerHTML = `
                <h3>Product ${i + 1}</h3>
                <label for="productName-${i}">Product Name</label>
                <input type="text" id="productName-${i}">
                <br>
                <label for="productPrice-${i}">Price</label>
                <input type="number" id="productPrice-${i}" step="0.01">
                <br>
                <label for="productQuantity-${i}">Quantity</label>
                <input type="number" id="productQuantity-${i}">
                <br><br>
            `;

            productsContainer.appendChild(productDiv);
        }

        validationMessage.textContent = "Please enter the product information.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < productCount; i++) {
        const productName = document.getElementById(`productName-${i}`).value.trim();
        const priceValue = document.getElementById(`productPrice-${i}`).value;
        const quantityValue = document.getElementById(`productQuantity-${i}`).value;

        const price = Number(priceValue);
        const quantity = Number(quantityValue);

        if (productName === "") {
            validationMessage.textContent = `Please enter the Product Name for Product ${i + 1}.`;
            return;
        } else if (
            priceValue === "" ||
            !Number.isFinite(price) ||
            price <= 0
        ) {
            validationMessage.textContent = `Please enter a valid positive Price for Product ${i + 1}.`;
            return;
        } else if (
            quantityValue === "" ||
            !Number.isFinite(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            validationMessage.textContent = `Please enter a valid positive Quantity for Product ${i + 1}.`;
            return;
        } else {
            validationMessage.textContent = "";
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

    switch (Number(deliveryOption)) {
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
        <h2>ORDER SUMMARY</h2>

        <p><strong>Customer:</strong> ${customerName}</p>

        ${productDetails}

        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>Discount Rate:</strong> ${discountRate}%</p>
        <p><strong>Discount Amount:</strong> ₱${discount.toFixed(2)}</p>
        <p><strong>Delivery Type:</strong> ${deliveryType}</p>
        <p><strong>Delivery Fee:</strong> ₱${deliveryFee.toFixed(2)}</p>
        <p><strong>Final Amount:</strong> ₱${finalAmount.toFixed(2)}</p>
    `;
});
