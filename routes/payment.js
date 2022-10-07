const express = require("express")
const router = express.Router();
const { postPaymentSubscription } = require("../controllers/payment")
//const { paymentModel } = require("../models")

router.get("/")
router.post("/", postPaymentSubscription)
router.put("/")
router.delete("/")

module.exports = router;
