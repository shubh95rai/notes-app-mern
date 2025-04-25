import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function createAccount(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const tokenBody = {
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenBody, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      user: tokenBody,
      accessToken,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  // console.log(password);

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const tokenBody = {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    const accessToken = jwt.sign(tokenBody, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      user: tokenBody,
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
}

export async function getUser(req, res) {
  const user = req.user;

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    message: "User fetched successfully",
  });
}
