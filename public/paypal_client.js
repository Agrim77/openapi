console.log("Paypal_button script loaded");
paypal.Buttons({
          // Sets up the transaction when a payment button is clicked
          createOrder: function () {
            return fetch("/my-server/create-paypal-order", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              // use the "body" param to optionally pass additional order information
              // like product skus and quantities
              body: JSON.stringify({
                cart: [
                  {
                    sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                    quantity: "YOUR_PRODUCT_QUANTITY",
                  },
                ],
              }),
            })
              .then((response) => response.json())
              .then((order) => order.id);
          },
          // Finalize the transaction after payer approval
          onApprove: function (data) {
            return fetch("/my-server/capture-paypal-order", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            })
              .then((response) => response.json())
              .then((orderData) => {
                // Successful capture! For dev/demo purposes:
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                const transaction = orderData.purchase_units[0].payments.captures[0];
                //actions.redirect('thank_you.html');
                alert(
                  "Transaction " +
                    transaction.status +
                    ": " +
                    transaction.id +
                    "\n\nSee console for all available details"
                );
                // When ready to go live, remove the alert and show a success message within this page. For example:
                // var element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });
          },
        })
        .render("#paypal");