const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// UPDATE INFO
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new:true });

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can only update your account!");
    }
})

// CHANGE PASSWORD
router.put("/change-password/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.body.userId);

            const validateOldPassword = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!validateOldPassword) {
                res.status(400).json("Password is not true");
            } else {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.newPassword , salt);
    
                    await User.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, { new:true });
        
                    res.status(200).json("Password has been updated");
                } catch(err) {
                    res.status(500).json(err);
                }
            }
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can only update your account!");
    }
})

// GET 
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;
