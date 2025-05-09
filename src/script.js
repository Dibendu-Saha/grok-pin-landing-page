document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  getOrderStatus();
});

/* order id - store and fetch
initTxn()
  1. check localStorage for order_id
  2. if present, remove
  3. add new order_id

confirmOrder()
  1. check localStorage for order_id
  2. if present, call checkOrderStatus() in document.addEventListener("DOMContentLoaded"...
  2. retrieve order_id from localStorage
  3. send with param/body
  4. remove order_id from localStorage (MANDATORY)
*/

async function initTxn() {
  const createOrderUrl = "http://localhost:8888/api/create-order",
    returnUrl = "http://127.0.0.1:5500/index.html#user-data";

  const requestPayload = {
    customer_details: {
      customer_id: "CUSTOMER_UNIQUE_ID_12345",
      customer_phone: "9876543210",
    },
    order_amount: 1,
    order_currency: "INR",
    order_meta: {
      // return_url: "https://grok.com/",
      return_url: returnUrl,
    },
  };

  try {
    const response = await fetch(createOrderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (localStorage.getItem("orderId")) {
      localStorage.removeItem("orderId");
    }

    localStorage.setItem("orderId", data.order_id);

    const cashfree = Cashfree({ mode: "sandbox" }); // "production" for live
    cashfree.checkout({
      paymentSessionId: data.payment_session_id,
      redirectTarget: "_self",
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getOrderStatus() {
  if (!localStorage.getItem("orderId")) return;

  const orderId = localStorage.getItem("orderId"),
    orderStatusUrl = "http://localhost:8888/api/create-order?orderId=" + orderId;

  try {
    const response = await fetch(orderStatusUrl),
      data = await response.json();

    console.log({ order_id: data.order_id, status: data.order_status });
  } catch {
    console.error("ERR!");
  } finally {
    localStorage.removeItem("orderId");
  }
}
