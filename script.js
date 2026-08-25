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

    const customerNameInput = document.getElementById("customerName");
    const productCountInput = document.getElementById("productCount");
    const productsContainer = document.getElementById("productsContainer");
    const deliveryOption = document.getElementById("deliveryOption");
    const calculateBtn = document.getElementById("calculateBtn");
    const validationMessage = document.getElementById("validationMessage");
    const orderSummary = document.getElementById("orderSummary");

    productCountInput.addEventListener("input", function () {

        productsContainer.innerHTML = "";

        const productCount = Number(productCountInput.value);

        if (productCount > 0) {

            for (let i = 0; i < productCount; i++) {

                const productDiv = document.createElement("div");

                productDiv.innerHTML = `
                    <div>
                        <label for="productName-${i}">Product Name</label>
                        <input type="text" id="productName-${i}">
                    </div>

                    <div>
                        <label for="productPrice-${i}">Price</label>
                        <input type="number" id="productPrice-${i}">
                    </div>

                    <div>
                        <label for="productQuantity-${i}">Quantity</label>
                        <input type="number" id="productQuantity-${i}">
                    </div>

                    <br>
                `;

                productsContainer.appendChild(productDiv);
            }
        }
    });

    calculateBtn.addEventListener("click", function () {

        validationMessage.textContent = "";
        orderSummary.innerHTML = "";

        const customerName = customerNameInput.value.trim();
        const productCount = Number(productCountInput.value);

        if (customerName === "") {

            validationMessage.textContent =
                "Please enter the Customer Name.";
            return;

        } else if (
            productCount <= 0 ||
            !Number.isFinite(productCount)
        ) {

            validationMessage.textContent =
                "Please enter a valid Number of Products.";
            return;
        }

        let subtotal = 0;
        let productDetails = "";

        for (let i = 0; i < productCount; i++) {

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

            } else if (
                !Number.isFinite(price) ||
                price <= 0
            ) {

                validationMessage.textContent =
                    `Please enter a valid positive Price for Product ${i + 1}.`;

                return;

            } else if (
                !Number.isFinite(quantity) ||
                quantity <= 0
            ) {

                validationMessage.textContent =
                    `Please enter a valid positive Quantity for Product ${i + 1}.`;

                return;
            }

            const itemAmount = calculateItemAmount(
                price,
                quantity
            );

            subtotal += itemAmount;

            productDetails += `
                ${i + 1}. ${productName}<br>
                &nbsp;&nbsp;Price: ₱${price.toFixed(2)}<br>
                &nbsp;&nbsp;Quantity: ${quantity}<br>
                &nbsp;&nbsp;Amount: ₱${itemAmount.toFixed(2)}<br><br>
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

        const selectedDelivery = deliveryOption.value;

        const deliveryFee = getDeliveryFee(
            selectedDelivery
        );

        let deliveryType = "";

        switch (selectedDelivery) {

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

        const finalAmount =
            subtotal - discount + deliveryFee;

        orderSummary.innerHTML = `
            Customer: ${customerName}<br><br>

            ${productDetails}

            ORDER SUMMARY<br><br>

            Subtotal: ₱${subtotal.toFixed(2)}<br>
            Discount Rate: ${discountRate}%<br>
            Discount Amount: ₱${discount.toFixed(2)}<br>
            Delivery Type: ${deliveryType}<br>
            Delivery Fee: ₱${deliveryFee.toFixed(2)}<br>
            Final Amount: ₱${finalAmount.toFixed(2)}
        `;
    });
});
