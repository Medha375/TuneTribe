import express from "express";
import{editProfile, logout, register} from "../controllers/user.controller.js";
import isautheticted from "../middlewares/isauthenticated.js";
import upload from "../middlewares/multer.js";

const router= express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isautheticted);
router.route('/profile/edit').post(isautheticted,upload.single('profilePicture'),editProfile);

router.route('/followorunfollow/:id').post(isautheticted, followorunfollow);


export default router;