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
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const productCount = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

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

        const customerName = document.getElementById("customerName").value.trim();
        const numberOfProducts = Number(productCount.value);

        if (customerName === "") {
            validationMessage.textContent = "Please enter the Customer Name.";
            return;
        } else if (numberOfProducts <= 0 || !Number.isFinite(numberOfProducts)) {
            validationMessage.textContent = "Please enter a valid Number of Products.";
            return;
        }

        let subtotal = 0;
        let productDetails = "";

        for (let i = 0; i < numberOfProducts; i++) {

            const productName = document.getElementById(
                `productName-${i}`
            ).value.trim();

            const price = Number(
                document.getElementById(`productPrice-${i}`).value
            );

            const quantity = Number(
                document.getElementById(`productQuantity-${i}`).value
            );

            if (productName === "") {
                validationMessage.textContent =
                    `Please enter the Product Name for Product ${i + 1}.`;
                return;
            } else if (!Number.isFinite(price) || price <= 0) {
                validationMessage.textContent =
                    `Please enter a valid positive Price for Product ${i + 1}.`;
                return;
            } else if (!Number.isFinite(quantity) || quantity <= 0) {
                validationMessage.textContent =
                    `Please enter a valid positive Quantity for Product ${i + 1}.`;
                return;
            }

            const itemAmount = calculateItemAmount(price, quantity);

            subtotal += itemAmount;

            productDetails += `
                <p>
                    <strong>${i + 1}. ${productName}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
            `;
        }

        const discount = calculateDiscount(subtotal);

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

        const deliveryOption =
            document.getElementById("deliveryOption").value;

        const deliveryFee = getDeliveryFee(deliveryOption);

        let deliveryType = "";

        switch (deliveryOption) {
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

        const finalAmount = subtotal - discount + deliveryFee;

        orderSummary.innerHTML = `
            <h2>ORDER SUMMARY</h2>

            <p><strong>Customer:</strong> ${customerName}</p>

            ${productDetails}

            <hr>

            <p>
                <strong>Subtotal:</strong>
                ₱${subtotal.toFixed(2)}
            </p>

            <p>
                <strong>Discount Rate:</strong>
                ${discountRate}%
            </p>

            <p>
                <strong>Discount Amount:</strong>
                ₱${discount.toFixed(2)}
            </p>

            <p>
                <strong>Delivery Type:</strong>
                ${deliveryType}
            </p>

            <p>
                <strong>Delivery Fee:</strong>
                ₱${deliveryFee.toFixed(2)}
            </p>

            <h3>
                Final Amount:
                ₱${finalAmount.toFixed(2)}
            </h3>
        `;
    });

});
