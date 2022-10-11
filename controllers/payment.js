const { usersModel } = require("../models");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const emailer = require("../config/emailer");
const {payAccepted, subscriptionEnded} = require("../utils/templates/payment")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 


const postPaymentSubscription = async (req, res) => {
  const { userId, email, payment_method } = req.body
  const customer = await stripe.customers.create({
    payment_method: payment_method, //viene desde el front es el result_paymentMethod.id
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });
  console.log(customer)

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{plan: "price_1Lpk8NAfxOW2aSoA9FxPYA32"}],
    expand: ['latest_invoice.payment_intent', 'customer'],    
  });
  console.log(subscription)
  const status = subscription['latest_invoice']['payment_intent']['status']
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  console.log(status)
  console.log(client_secret)

  if(status === 'succeeded'){
      const user = await usersModel.findById(userId)
      user.premium = true;
      //console.log(email)
      user.save()
      let emailTo = customer.email;
      emailer.sendMail(emailTo, "Bienvenido a Arquihub!", payAccepted)
    }  

  res.json({'client_secret': client_secret, 'status': status});
}

// const deleteSubscription = async (req, res) => {


// }

module.exports = {
  postPaymentSubscription
}