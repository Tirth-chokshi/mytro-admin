const orders = [
    {
      orderCode: "20241137680",
      customer: "Abhishek",
      date: "20 Nov 2024, 11:31 AM",
      store: "IIT Gandhinagar Store: Mytro Mart",
      itemTotal: 445,
      wallet: 0,
      shippingCharge: 40,
      toCollect: 485,
      deliveryStatus: {
        status: "Processing",
        time: "20 Nov 2024, 12:01 PM",
        duration: "29 min"
      },
      paymentDetails: "COD / Due",
      feedback: "No Feedback"
    },
    {
      orderCode: "20241137679",
      customer: "Maitri",
      date: "20 Nov 2024, 9:18 AM",
      store: "Sargasan Store: Mytro Mart",
      itemTotal: 569,
      wallet: 0,
      shippingCharge: 20,
      toCollect: 589,
      deliveryStatus: {
        status: "Order Received",
        time: "20 Nov 2024, 9:18 AM"
      },
      paymentDetails: "Online Paid",
      feedback: "Good Service"
    },
    {
      orderCode: "20241137678",
      customer: "Rohan",
      date: "19 Nov 2024, 5:45 PM",
      store: "Vastrapur Store: Mytro Mart",
      itemTotal: 320,
      wallet: 50,
      shippingCharge: 30,
      toCollect: 300,
      deliveryStatus: {
        status: "Delivered",
        time: "19 Nov 2024, 6:15 PM",
        duration: "30 min"
      },
      paymentDetails: "Online Paid",
      feedback: "Excellent"
    },
    {
      orderCode: "20241137677",
      customer: "Sneha",
      date: "18 Nov 2024, 2:30 PM",
      store: "Prahlad Nagar Store: Mytro Mart",
      itemTotal: 150,
      wallet: 0,
      shippingCharge: 20,
      toCollect: 170,
      deliveryStatus: {
        status: "Shipped",
        time: "18 Nov 2024, 3:00 PM",
        duration: "30 min"
      },
      paymentDetails: "COD / Due",
      feedback: "Average"
    },
    {
      orderCode: "20241137676",
      customer: "Amit",
      date: "17 Nov 2024, 10:00 AM",
      store: "Satellite Store: Mytro Mart",
      itemTotal: 600,
      wallet: 100,
      shippingCharge: 50,
      toCollect: 550,
      deliveryStatus: {
        status: "Processing",
        time: "17 Nov 2024, 10:30 AM",
        duration: "30 min"
      },
      paymentDetails: "Online Paid",
      feedback: "Good"
    },
    {
      orderCode: "20241137675",
      customer: "Priya",
      date: "16 Nov 2024, 4:00 PM",
      store: "Gota Store: Mytro Mart",
      itemTotal: 250,
      wallet: 20,
      shippingCharge: 30,
      toCollect: 260,
      deliveryStatus: {
        status: "Delivered",
        time: "16 Nov 2024, 4:30 PM",
        duration: "30 min"
      },
      paymentDetails: "COD / Due",
      feedback: "Satisfactory"
    },
    {
      orderCode: "20241137674",
      customer: "Raj",
      date: "15 Nov 2024, 1:15 PM",
      store: "Thaltej Store: Mytro Mart",
      itemTotal: 400,
      wallet: 50,
      shippingCharge: 20,
      toCollect: 370,
      deliveryStatus: {
        status: "Shipped",
        time: "15 Nov 2024, 1:45 PM",
        duration: "30 min"
      },
      paymentDetails: "Online Paid",
      feedback: "Good"
    },
    {
      orderCode: "20241137673",
      customer: "Anjali",
      date: "14 Nov 2024, 11:00 AM",
      store: "Bopal Store: Mytro Mart",
      itemTotal: 500,
      wallet: 0,
      shippingCharge: 50,
      toCollect: 550,
      deliveryStatus: {
        status: "Processing",
        time: "14 Nov 2024, 11:30 AM",
        duration: "30 min"
      },
      paymentDetails: "COD / Due",
      feedback: "Average"
    },
    {
      orderCode: "20241137672",
      customer: "Vikas",
      date: "13 Nov 2024, 3:45 PM",
      store: "Maninagar Store: Mytro Mart",
      itemTotal: 350,
      wallet: 30,
      shippingCharge: 25,
      toCollect: 345,
      deliveryStatus: {
        status: "Delivered",
        time: "13 Nov 2024, 4:15 PM",
        duration: "30 min"
      },
      paymentDetails: "Online Paid",
      feedback: "Excellent"
    },
    {
      orderCode: "20241137671",
      customer: "Kiran",
      date: "12 Nov 2024, 2:00 PM",
      store: "Navrangpura Store: Mytro Mart",
      itemTotal: 275,
      wallet: 0,
      shippingCharge: 20,
      toCollect: 295,
      deliveryStatus: {
        status: "Shipped",
        time: "12 Nov 2024, 2:30 PM",
        duration: "30 min"
      },
      paymentDetails: "COD / Due",
      feedback: "Good"
    }
];

export default orders;