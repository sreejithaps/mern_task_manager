const {getUserOne, createUser} = require('../helpers/userHelper');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'my_jwt_secret_key';

const registerUser = async (req, res) => {
    try {
        const userdata = req.body;
       const newUser = await createUser(userdata);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
};

const loginUser = async (req, res) => {
    try {
        const logindata = req.body;
        const user = await getUserOne(logindata);
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
};

module.exports = {
    registerUser,
    loginUser
};
