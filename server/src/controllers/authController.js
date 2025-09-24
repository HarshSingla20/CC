import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessAndRefreshTokens = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    if (!user) throw new Error("User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch ( error ) {
    throw error;
  }
};

export const signup =async (req, res) => {    
    try {
        const { phoneNumber, password, name } = req.body;
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        } 

        const user = await User.create(req.body);

        return res.status(201).json({
            phoneNumber: user.phoneNumber,
            name: user.name,
            role: user.role,
            preferredLanguage: user.preferredLanguage,
            location: user.location,
            landsize: user.landsize,
            crop: user.crop,
            _id: user._id,
        })

    } catch (error) {
        console.log("Error in signup");
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        if(!user){
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: {
                    name: user.name,
                    role: user.role,
                    number: user.phoneNumber,
                },
                accessToken, refreshToken, message: "User logged in successfully"
            });
    } catch (error) {
        console.log("Error in login");
        return res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $unset: {
                    refreshToken: undefined,
                }
            },
            {
                new: true,
            }
        )

        const options = {
            httpOnly: true,
            secure: true,
        };
        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout");
        return res.status(500).json({ message: error.message });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;
        if (!incomingRefreshToken) {
            return res.status(401).json({ message: "Unauthorized request: No refresh token" });
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token: User not found" });
        }
        
        if (user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        const options = {
            httpOnly: true,
            secure: true,
        };
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({ accessToken, refreshToken, message: "Access token refreshed" });
    } catch (error) {
        console.log("Error in refreshAccessToken");
        return res.status(500).json({ message: error.message });
    }
}