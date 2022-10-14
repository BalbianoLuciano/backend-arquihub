const express = require("express")
const router = express.Router();
const { cancelSubscription } = require("../controllers/cancelPayment")
//const { paymentModel } = require("../models")

router.get("/")
router.post("/")
router.put("/", cancelSubscription)
router.delete("/")

module.exports = router;