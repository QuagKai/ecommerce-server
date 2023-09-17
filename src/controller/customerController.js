const Customer = require("../models/cutomer");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = { userId: user.id, username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

const customerRegister = async (req) => {
  try {
    const { email, password, phone, address } = req.body;

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const customer = new Customer({
      email,
      password: hashedPassword,
      phone,
      address,
    });
    customer.save();
    return [{ message: "Register successfully!" }, { status: 200 }];
  } catch (error) {
    console.log(error);
    return [{ message: error }];
  }
};

const getCustomerInfo = async (req) => {
  try {
    const userId = req.body.userId;
    console.log(userId)
    const customer = await Customer.findById(userId);
    console.log(customer)
    return customer;
  } catch (error) {
    console.log(error);
    return { error: "Get info failed" };
  }
}

const customerLogin = async (req) => {
  try {
    const { emailOrPhone, password } = req.body;

    const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailOrPhone);

    let user;
    if (isEmail) {
      user = await Customer.findOne({ email: emailOrPhone });
    } else {
      user = await Customer.findOne({ phone: emailOrPhone });
    }

    if (!user) {
      return { message: 'User not found', status: 404 };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = generateToken(user);

      return { message: 'Login successful', status: 200, token };
    } else {
      return { message: 'Incorrect password', status: 401 };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Login failed', status: 500 };
  }
};

module.exports = { customerRegister, customerLogin, getCustomerInfo };
