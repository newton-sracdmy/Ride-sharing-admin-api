
const { convertToCSV } = require("../helper/convertJsonToCsv");
const Coaches = require("../models/Coaches");
const Payments = require("../models/Payments");
const Tickets = require("../models/Tickets");
const getPayments = async ({ startDate, endDate, status, search, page, limit }) => {
    const filter = {};
    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate), 
            $lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)), 
        };
    }

    if (status) {
        filter.status = status;
    }

    if (search) {
        filter.$or = [
            { invoiceNumber: { $regex: search, $options: "i" } },
        ];
    }

    const payments = await Payments.find(filter)
        .populate("user")
        .populate("ride")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

        const totalPayments=await Payments.countDocuments(filter);
        return {
        payments,
          pagination: {
              currentPage: page,
              totalPages: Math.ceil(totalPayments / limit),
              totalPayments,
          },
      };
};

const getPaymentByDate = async ({ startDate, endDate }) => {
    const filter = {};
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            filter.createdAt = { $gte: start, $lte: end };
        } else {
            throw new Error("Invalid date format");
        }
    }

  const payments = await Payments.find(filter)
    .populate("user")
    .populate("ride")
    .populate({
        path: "ticket",
        populate: {
            path: "coach", 
        },
    })
    .sort({ createdAt: -1 });

    return convertToCSV(payments); 
    
};

const getPaymentById = async( id ) =>{
    
        const payment = await Payments.findById(id)
        .populate('user')
        .populate('ride')
        .populate({
            path: 'ticket',
            populate: {
                path: 'coach',
            }
        })
        .sort({createdAt: -1});
        return payment;
}

module.exports = { getPayments , getPaymentByDate , getPaymentById};
