const MiddleWare = require("../middlewares/MiddleWare")
const User = require("../models/userModel");
const argon2 = require("argon2");


const index = async (req, res) => {
    req.body = {
        email: "chikhi.dev@gmail.com",
        password: "test123"
    }
    try {
        // Set email and password from the request body
        const { email, password } = req.body;

        // Create a query object for database search
        const query = { email, password };

        // Validate input values
        const { error } = MiddleWare.validate.validateEmailPass(query);
        if (error) {
            return res.status(400).json({
                success: false,
                data: error
            });
        }

        // Search for user by email
        const user = await User.findOne({ email }).select("email password");

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                data: {
                    message: "This user does not exist!"
                }
            });
        }

        // Verify user's password
        const isPasswordMatch = await argon2.verify(user.password, password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                data: {
                    message: "Incorrect password"
                }
            });
        }

        // Generate a JSON Web Token (JWT) for the authenticated user
        const token = user.generateAuthToken();

        // Return success response with JWT and message
        res.set('Authorization', token);
        return res.status(200).json({
            success: true,
            data: {
                message: "Logged in successfully"
            }
        });
    } catch (error) {
        // Handle any errors that may occur during the execution of the function
        return res.status(500).json({
            success: false,
            data: {
                message: "Something went wrong, please try again later"
            }
        });
    }
}



module.exports = index