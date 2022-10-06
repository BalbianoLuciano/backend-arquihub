const Stripe = require("stripe");


const stripe = new Stripe("sk_test_51LoIVcAfxOW2aSoAZxRESVkUopMD8CdZgi1tZZiioC6P6z1dnEo8rP3LRBaqWcMpNFRbYHBDa34Luct59KjKjyw800p3UAHZBy")


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

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{plan: "price_1Lpk8NAfxOW2aSoA9FxPYA32"}],
    expand: ['latest_invoice.payment_intent']
  });
  const status = subscription['latest_invoice']['payment_intent']['status']
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({'client_secret': client_secret, 'status': status});
}

module.exports = {
  postPaymentSubscription
}