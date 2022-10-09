const Stripe = require("stripe");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 



// const postPayment = async (req, res) => {
  
//   try {
    
//     const { id, amount } = req.body
  
//     const payment = await stripe.paymentIntents.create({
//       amount,
//       currency: "USD",
//       description: "suscription",
//       payment_method: id,
//       confirm:true
//     })
//     console.log(payment)
//     res.send({message: 'Successful Payment'})
//   } catch (error) {
//     console.log(error)
//     res.json({mesagge: error.raw.message})
    
//   }

// }

const postPaymentSubscription = async (req, res) => {
  const {email, payment_method } = req.body
  const customer = await stripe.customers.create({
    payment_method: payment_method, //viene desde el front es el result_paymentMethod.id
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });
  console.log("Esta es la suscripcion" + customer)

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{plan: "price_1Lpk8NAfxOW2aSoA9FxPYA32"}],
    expand: ['latest_invoice.payment_intent'],    
  });
  console.log("Esta es la suscripcion" + subscription)
  const status = subscription['latest_invoice']['payment_intent']['status']
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  console.log("Esta es la suscripcion" + status)
  console.log("Esta es la suscripcion" + client_secret)

  res.json({'client_secret': client_secret, 'status': status});
}

module.exports = {
  postPaymentSubscription
}