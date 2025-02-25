
const RideLocation = require('../models/RideLocation');

const getAllLocations = async (type, parent) => {
    let filter ={};
    
    if(type){
        filter.type=type;
    }

    if(parent){
        filter.parent = parent;
    }
    return await RideLocation.find(filter)
};

module.exports = { getAllLocations };
