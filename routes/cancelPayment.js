const express = require("express")
const router = express.Router();
const { cancelSubscription } = require("../controllers/cancelPayment")
//const { paymentModel } = require("../models")

router.get("/")
router.post("/", cancelSubscription)
router.put("/")
router.delete("/")

module.exports = router;