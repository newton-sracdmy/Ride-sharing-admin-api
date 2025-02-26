const PaymentService = require("../services/paymentService");
const fs = require("fs");
const path = require("path");
const util = require("util");

const getPaymentList = async (ctx) => {
    try {
        const { startDate, endDate, status, search, page = 1, limit = 10 } = ctx.query;

        if (startDate && !endDate) {
            ctx.status = 400;
            ctx.body = { message: "endDate is required when startDate is provided" };
            return;
        }

        const payments = await PaymentService.getPayments({
            startDate,
            endDate,
            status,
            search,
            page: parseInt(page),
            limit: parseInt(limit),
        });

        ctx.status = 200;
        ctx.body = { success: true, data: payments };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};


const getPaymentFilterByDate = async (ctx) => {
    try {
        const { startDate, endDate } = ctx.query;

        if (startDate && !endDate) {
            ctx.status = 400;
            ctx.body = { message: "endDate is required when startDate is provided" };
            return;
        }

        const payments = await PaymentService.getPaymentByDate({
            startDate,
            endDate,
        });

        const filePath = path.join(__dirname, 'payments.csv');

        fs.writeFileSync(filePath, payments);

        ctx.set('Content-Type', 'text/csv');
        ctx.set('Content-Disposition', 'attachment; filename="payments.csv"');
        ctx.body = fs.createReadStream(filePath);
    } catch (error) {
        ctx.status = 500;
        ctx.body = { success: false, message: error.message };
    }
};

 const getPaymentById = async (ctx) => {
    const { id }= ctx.params;

    try{
        const payment = await PaymentService.getPaymentById(id);
        if(!payment)
        {
            ctx.status=404;
            ctx.body = {message: 'Payment not found' };
        }
        else{
            ctx.status = 200;
            ctx.body = payment;
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {message: 'Internal Server Error', error:error.message}
    }
 }

 const getPaymentByUser = async (ctx) => {
    const { userId }= ctx.params;

    try{ 
        const payment = await PaymentService.getPaymentByUser(userId);
        if(!payment)
        {
            ctx.status=404;
            ctx.body = {message: 'Payment not found' };
        }
        else{
        const filePath = path.join(__dirname, 'payments.csv');

        fs.writeFileSync(filePath, payment);

        ctx.set('Content-Type', 'text/csv');
        ctx.set('Content-Disposition', 'attachment; filename="payments.csv"');
        ctx.body = fs.createReadStream(filePath);
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {message: 'Internal Server Error', error:error.message}
    }
 }

module.exports = { getPaymentList, getPaymentFilterByDate, getPaymentById, getPaymentByUser };
