const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    const token = req.headers['procources-access-token'];
    if (!token) return res.status(403).json({ msg: 'No token provided.' });

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) return res.status(500).json({ msg: err });
      console.log(data);
      const check = req.body.role.findIndex(function (role) {
        return role == data.role;
      });
      if (check == -1) return res.json({ message: 'Wrong role' });
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = auth;
