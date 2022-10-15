const { usersModel } = require("../models");
const Stripe = require("stripe");
const nodemailer = require("nodemailer");
const emailer = require("../config/emailer");
const {payAccepted, subscriptionEnded} = require("../utils/templates/payment")

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 


const cancelSubscription = async (req, res) => {

  try {    
    
    const { userId } = req.body
    
    const user = await usersModel.findById(userId)

    const stripeCustomer = await stripe.customers.retrieve(user.idStrpe, {expand: ['subscriptions']})

   
    const subscriptionId = await stripe.subscriptions.update(stripeCustomer.subscriptions.data[0].id, {cancel_at_period_end: true})

    //const cancel_at_period_end = subscriptionId['cancel_at_period_end']
    console.log(subscriptionId)

    //console.log(stripeCustomer.subscriptions.data[0].id)
    //console.log(cancelSubscription)

//   const subscription = await stripe.subscriptions.create({
//     customer: customer.id,
//     items: [{plan: "price_1LsHCNAfxOW2aSoAvz1i35DW"}],
//     expand: ['latest_invoice.payment_intent', 'customer'],    
//   });
  //console.log(subscription)
  //const status = subscription['latest_invoice']['payment_intent']['status']
  //const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  // const stripeCustomer = await stripe.customers.retrieve();
  // console.log(stripeCustomer)

  //console.log(status)
  //console.log(client_secret)

//   if(status === 'succeeded'){
//     const user = await usersModel.findById(userId)
//     user.premium = true;
//     //console.log(email)
//     user.save()
//     let emailTo = customer.email;
//     emailer.sendMail(emailTo, "Bienvenido a Arquihub!", payAccepted)
//   }  
  
  
  //res.json({'client_secret': client_secret, 'status': status});
  //res.json(stripeCustomer)
  res.json(subscriptionId)

} catch (error) {
    res.status(400).send('Error Subscription Cancel')
  }
};

// const cancelSubscription = async (req, res) => {
//   const { email } = req.body

//   const stripeCustomer = await stripe.customers.retrieve();
//   console.log(stripeCustomer)

// }

module.exports = {
  cancelSubscription,
  //cancelSubscription
}