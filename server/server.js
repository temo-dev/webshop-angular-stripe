const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')("sk_test_51MW2jLCg20bhN5lJ30GPS7mTY4AsYWEzvePOTQrFpfmw65DdEBkVE6HBCQK6aWFDnbEQrozPESCNt2hYe2shKOpE00M4qbgwkQ");
app.post("/checkout", async (req, res, next) => {
  try {
    // payment and shipping =========================
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: { allowed_countries: ['CZ'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'czk' },
            display_name: 'Next day air',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "czk",
          product_data: {
            name: item.name,
            images: [item.product],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    })
    if (session) {
      res.status(200).json(session);
    }
  } catch (error) {
    next(error)
  }
})

app.listen(4242, () => console.log("Listening on port 4242"));