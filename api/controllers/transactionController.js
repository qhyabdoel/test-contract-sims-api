const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");
const serviceModel = require("../models/serviceModel");
const { v4: uuidv4 } = require("uuid");

// Get bamer list
async function getTransactionHistory(req, res) {
  try {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    const transactions = await transactionModel.getTransactionHistory(
      limit,
      offset
    );
    res.json({
      status: 0,
      message: "Get history berhasil",
      data: { offset, limit, records: transactions },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Gagal mengambil transaction history" });
  }
}

// Create transaction
async function createTransaction(req, res) {
  try {
    const user = await userModel.getUserByEmail(req.user.email);

    const service = await serviceModel.getServiceByCode(req.body.service_code);
    if (!service)
      return res
        .status(400)
        .json({ status: 102, message: "Service atau layanan tidak ditemukan" });

    if (user.balance < service.service_tariff)
      return res.status(400).json({ error: "Balance tidak cukup" });

    const totalBalance = user.balance - service.service_tariff;

    const updateUser = await userModel.updateUserBalance(
      req.user.id,
      totalBalance
    );

    // create transaction history after update balance
    const invoice_number = uuidv4();
    const transaction = await transactionModel.createTransactionHistory(
      invoice_number,
      "PAYMENT",
      service.service_name,
      service.service_tariff
    );

    res.status(201).json({
      status: 0,
      message: "Trnsaksi berhasil",
      data: {
        invoice_number,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: "PAYMENT",
        total_amount: service.service_tariff,
        created_on: transaction.created_on,
      },
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Gagal membuat transaction" });
  }
}

module.exports = {
  getTransactionHistory,
  createTransaction,
};
