const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found.' });
    }

    req.user = user; // Attach user to the request
    console.log("here  === ",req.user);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed.' });
  }
};


exports.checkAdmin = (req, res, next) => {
    const { role } = req.user; // Assume `req.user` is populated by authentication middleware
  
    if (role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    console.log('Access granted administrator');
  
    next();
};


// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(email,"---- ",password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await user.matchPassword(password); // Compare hashed password
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token,user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password} = req.body;
  role = 'admin'


  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user
    const user = new User({ name, email, password,role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
