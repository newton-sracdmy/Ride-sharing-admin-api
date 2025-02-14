const { ACCOUNT_STATUS, ACCOUNT_TYPE } = require('../constants/enums');
const Users = require('../models/Users');

const getAllUsers = async (type) => {
  const query = {};
  if (type) {
    query.type = type;
  }

  return await Users.find(query);
};


const getUserById = async (id) => {
  try {
    const user = await Users.findById(id);

    if (!user) {
      return { message: "User not found", status: 404 };
    }
    
    return { data: user, status: 200 };
  } catch (error) {
    console.error("Error in getUserById:", error); 
    return { message: "Server error", status: 500 }; 
  }
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


module.exports={ 
  getAllUsers,
  getUserById, 
  getApprovedDrivers,
  getUnapprovedDrivers,
  getDriversToday
}