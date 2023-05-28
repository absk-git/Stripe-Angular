const express = require("express");
const stripe = require("stripe")(
  "##Stripe secret key##"
);
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/checkout", async (req, res) => {
    try {
      const token = req.body.token; // Extract the token ID from the token object
  
      // Create a customer using the token
      const customer = await stripe.customers.create({
        email: "absk97@gmail.com",
        source: token.id,
      });
  
      // Create a PaymentIntent using the customer ID
      const paymentIntent = await stripe.paymentIntents.create({
        customer: customer.id,
        amount: 1000,
        description: "Rails Stripe transaction",
        currency: "usd",
      });
  
    //   console.log(paymentIntent);
      res.json({
        data: "success",
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing the payment.' });
    }
  });
  

app.listen(3000, () => {
  console.log("app running on port 3000");
});
