const Users = require('../models/Users');

const getAllUsers = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const UsersData = await Users.find()
      .skip(skip)
      .limit(limit);

    const totalUsers = await Users.countDocuments();

    return {
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      UsersData,
    };
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw new Error("Error fetching rides");
  }
};

module.exports={ getAllUsers }