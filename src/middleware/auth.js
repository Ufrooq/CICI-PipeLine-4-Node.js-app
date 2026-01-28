const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/User');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', async (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        try {
            // Fetch the user from database using the ID from JWT
            const user = await findUserById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Format user object for response (remove sensitive data)
            const userObj = user.toObject();
            userObj.id = userObj._id.toString();
            delete userObj._id;
            delete userObj.__v;
            delete userObj.password;

            req.user = userObj;
            next();
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
};

module.exports = { authenticateToken };