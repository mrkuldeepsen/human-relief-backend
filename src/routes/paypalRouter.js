import express from "express";
import paypal from 'paypal-rest-sdk';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const paypalRouter = express.Router();

/*
const return_url = "https://human-relief-api.herokuapp.com/success";
const cancel_url = "https://human-relief-api.herokuapp.com/cancel";
*/
const url = `http://localhost:8000`;
const url_live = "https://human-relief-api.herokuapp.com";

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AaKWJXEL670WfVMvnA7dOiPm7yRlvg2ETiH-E6CcDjuGrbEYE9pT5TCXdS-JHyWCtxIqVo8MIgLEKN6_',
  'client_secret': 'EGczKasQAKWS-UqWHNj-3SM3BHnZ4omDg6DbxOf0_HVFqRjvl9GpyuHY1Qz7vf3rC_jBt-1unBIUG4AG'
});

var amt = null;
var pid = null;

paypalRouter.get('/pay/:amt', (req, res) => {

  amt = req.params.amt;

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": `${url_live}/success`,
      "cancel_url": `${url_live}/cancel`
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": " - Human Relief",
          "sku": pid,
          "price": amt,
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": amt
      },
      "description": "Do a good deed by giving to those in need. for the best team ever"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });

});

paypalRouter.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  console.log("payerId", payerId, "paymentId", paymentId)
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": amt
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log("error", error.response);
      throw error;
    } else {
      res.sendFile(__dirname + "/success.html")
    }
  });
});

paypalRouter.get('/cancel', (req, res) => {
  res.sendFile(__dirname + "/cancel.html")
})

export default paypalRouter;
