async function initTxn() {
  const createOrderUrl = "http://localhost:8888/api/create-order";
  const requestPayload = {
    customer_details: {
      customer_id: "CUSTOMER_UNIQUE_ID_12345",
      customer_phone: "9876543210",
    },
    order_amount: 1,
    order_currency: "INR",
    order_meta: {
      // return_url: "https://grok.com/",
      return_url: "http://127.0.0.1:5500/index.html#user-data",
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
    const cashfree = Cashfree({ mode: "sandbox" }); // "production" for live
    cashfree.checkout({
      paymentSessionId: data.payment_session_id,
      redirectTarget: "_blank", // Opens in new tab
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
