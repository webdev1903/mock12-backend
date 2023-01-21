const express = require("express");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    let { amount, interest, time } = req.body;
    let i = interest / 100;
    // F = P [({(1+i) ^n}-1)/i]
    // console.log("x", amount, interest, time);
    const maturityValue = amount * (((1 + i) ** time - 1) / i);
    const investedAmount = amount * time;
    const interestGained = maturityValue - investedAmount;
    // console.log("y", maturityValue, interestGained, investedAmount);
    return res
      .status(200)
      .send({ maturityValue, investedAmount, interestGained });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
