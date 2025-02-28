const { ACCOUNT_STATUS, ACCOUNT_TYPE } = require('../constants/enums');
const Users = require('../models/Users');
const Vehicles = require('../models/Vehicles');
const mongoose = require("mongoose");

const getAllUsers = async (type, page, limit, isOnline, status, search, district, upazila, union) => {
  const query = {};

  if (type) {
    query.type = type;
  }

  if (isOnline && isOnline !== "all") {
    query.isOnline = isOnline == 'true' ? true : false;
  }

  if (status && status !== "all") {
    query.status = status;
  }


  if (district || upazila || union) {
    if (district) {
      query["carLocation.district"] = district;
    }
    if (upazila) {
      query["carLocation.upazila"] = upazila;
    }
    if (union) {
      query["carLocation.union"] = union;
    }
  }

  const totalUsers = await Users.countDocuments(query);

  const users = await Users.aggregate([
    { $match: query }, 
    {
        $lookup: {
            from: "vehicles",
            let: { userId: { $toString: "$_id" } },
            pipeline: [
                {
                    $match: {
                        $expr: { $eq: ["$driver", "$$userId"] }
                    }
                },
                {
                    $addFields: {
                        full_car_number: {
                            $concat: [
                                { $ifNull: ["$car_number.part_1", ""] }, " ",
                                { $ifNull: ["$car_number.part_2", ""] }, " ",
                                { $ifNull: ["$car_number.part_3", ""] }
                            ]
                        }
                    }
                }
            ],
            as: "vehicle"
        }
    },
    { 
        $unwind: {
            path: "$vehicle",
            preserveNullAndEmptyArrays: true
        }
    },
    search
        ? {
            $match: {
                $or: [
                    { phone: { $regex: search, $options: "i" } },
                    { name: { $regex: search, $options: "i" } },
                    { "vehicle.full_car_number": { $regex: search, $options: "i" } }
                ]
            }
        }
        : null,
    { $skip: (page - 1) * limit }, 
    { $limit: limit }
].filter(Boolean));

  return {
    users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    },
  };
};

const getUserById = async (id) => {
  const user = await Users.aggregate([
      {
          $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
          $lookup: {
              from: "vehicles",
              let: { userId: { $toString: "$_id" } },
              pipeline: [
                  {
                      $match: {
                          $expr: { $eq: ["$driver", "$$userId"] }
                      }
                  }
              ],
              as: "vehicle"
          }
      },
      {
          $lookup: {
              from: "payments",
              let: { userId: { $toString: "$_id" } },
              pipeline: [
                  {
                      $match: {
                          $expr: { $eq: ["$user", "$$userId"] }
                      }
                  },
                  {
                      $group: {
                          _id: null,
                          totalPayment: { $sum: "$amount" }
                      }
                  }
              ],
              as: "payment"
          }
      },
      {
          $unwind: {
              path: "$vehicle",
              preserveNullAndEmptyArrays: true
          }
      },
      {
          $unwind: {
              path: "$payment",
              preserveNullAndEmptyArrays: true
          }
      },
      {
          $addFields: {
              totalPayment: { $ifNull: ["$payment.totalPayment", 0] }
          }
      }
  ]);

  return { data: user[0], status: 200 };
};


const getApprovedDrivers = async () => {
  return await Users.countDocuments({ status: ACCOUNT_STATUS.ACTIVE, type: ACCOUNT_TYPE.DRIVER });
};

const getUnapprovedDrivers = async () => {
  return await Users.countDocuments({ status: ACCOUNT_STATUS.INACTIVE, type: ACCOUNT_TYPE.DRIVER });
};


const getDriversToday = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)); 
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const activeDrivers = await Users.find({
    isOnline: true, 
    lastActive: { $gte: startOfDay },
  });

  const inactiveDrivers = await Users.find({
    isOnline: false,  
    lastActive: { $lt: startOfDay }, 
  });

  return {
    activeDrivers: activeDrivers.length,
    inactiveDrivers: inactiveDrivers.length,
  };
};

const updateUserStatus = async (userId, status) => {
  if (!Object.values(ACCOUNT_STATUS).includes(status)) {
    throw new Error("Invalid status value");
  }
 
  const user = await Users.findByIdAndUpdate(userId, { status }, { new: true });
  if (!user) throw new Error("User not found");

  return user;
};


module.exports={ 
  getAllUsers,
  getUserById, 
  getApprovedDrivers,
  getUnapprovedDrivers,
  getDriversToday,
  updateUserStatus
}