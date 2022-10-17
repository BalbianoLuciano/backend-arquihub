const { usersModel } = require("../models");
const Stripe = require("stripe")
const nodemailer = require("nodemailer");
const { USER_MAIL, PASS_MAIL, SIGN_SECRET, STRIPE_SECRET_KEY } = process.env;
const emailer = require("../config/emailer");
const { postPaymentSubscription } = require("./payment");


let subscription = "";
let endpointSecret = SIGN_SECRET // pasarlo como variable de entorno
const stripe = new Stripe(STRIPE_SECRET_KEY)

const getWebhooks =  async (req, res) => {
  res.status(200).send("ALO")
  console.log("no llega")
  
}


const postWebhooks = async (request, response) => {
  let sig = request.headers["stripe-signature"]; //cada vez que alguien paga algo se genera este header
  
  let event;

  try {
    // se comprueba si el evento viene de stripe
    event = await stripe.webhooks.constructEventAsync(request.body, sig, endpointSecret);
    //console.log(event)
    subscription = event.data.object;
    console.log(subscription)
    
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  
  // Handle the event
  switch (event.type) {       
       
    case "customer.subscription.deleted":
      subscription = event.data.object;
      console.log(subscription.customer)      
      const user = await usersModel.findOne({idStrpe:subscription.customer})
      user.premium = false;
      user.save()
      //let emailTo = customer.email;
      //emailer.sendMail(emailTo, "Payment confirmed", payAccepted)
      
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    
    default:
      //console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
  
};


module.exports = {
  postWebhooks,
  getWebhooks
}