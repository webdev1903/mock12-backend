const express = require("express");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    let { amount, interest, time } = req.body;
    let i = interest / 100;
    // F = P [({(1+i) ^n}-1)/i]
    const maturityValue = (amount * (((1 + i) ** time - 1) / i)).toFixed(2);
    const investedAmount = (amount * time).toFixed(2);
    const interestGained = (maturityValue - investedAmount).toFixed(2);
    return res
      .status(200)
      .send({ maturityValue, investedAmount, interestGained });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
