const router = require("express").Router();
const { check } = require('express-validator');
const { signin, signup, signout, userData, updateUserData, isSignedIn, leaderboard, forgotPassword, updatePassword} = require("../Controllers/AuthController");
const { expressjwt: jwt } = require("express-jwt");
router.post(
    "/signup",
    [
        check("username", "Username must be 3+ chars long").isLength({ min: 3}),
        check("email", "Email is required").isEmail(),
        check("password", "Password must contain 8+ chars").isLength({ min: 8})
    ],
    signup
);

router.post(
    "/signin",
    [
        check("username", "Username is required").isLength({min: 1}),
        check("password", "Password is required").isLength({ min: 1})
    ],
    signin
);



router.get("/leaderboard", leaderboard);
router.get("/signout", signout);

router.get("/:id", isSignedIn, userData);
router.patch("/:id", isSignedIn, updateUserData);





router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", updatePassword);
module.exports = router;
