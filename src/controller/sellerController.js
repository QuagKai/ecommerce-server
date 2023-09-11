const Seller = require("../models/seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = { userId: user.id, username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

const sellerRegister = async (req) => {
  try {
    const { email, password, phone, businessName } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const seller = new Seller({
      email,
      password: hashedPassword,
      phone,
      businessName,
    });
    seller.save();

    return [{ message: "Register successfully!" }, { status: 200 }];
  } catch (error) {
    console.log(error);
    return [{ message: error }];
  }
};

const sellerLogin = async (req) => {
  try {
    const { emailOrPhone, password } = req.body;

    const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
      emailOrPhone
    );

    let user;
    if (isEmail) {
      user = await Seller.findOne({ email: emailOrPhone });
    } else {
      user = await Seller.findOne({ phone: emailOrPhone });
    }

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

      const token = generateToken(user);
      return { message: "Login successful", status: 200, token };
    } else {
      return { error: "Incorrect password", status: 401 };
    }
  } catch (error) {
    console.error(error);
    return { error: "Login failed", status: 500 };
  }
};

module.exports = { sellerRegister, sellerLogin };
