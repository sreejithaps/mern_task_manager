const userdb  = require('../models/User');

exports.getUserOne = async (logindata) => {
    try {
        const user = await userdb.findOne(logindata);
        return user;
    } catch (error) {
        throw error;
    }
};

exports.createUser = async (userdata) => {
    try {
        const user = new userdb(userdata);
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};  