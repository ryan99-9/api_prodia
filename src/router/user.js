const express = require("express");
const router = express.Router();
const {
    registrasi,
    updatePassword,
    updateProfile,
    login,
} = require("../controller/userC");
const { validateRegisterFields,validateUpdatePassFields,validateUpdateProfileFields,validateLoginFields } = require("../middleware/validate");


router.post("/regist", validateRegisterFields, registrasi);
router.post("/updatePass", validateUpdatePassFields, updatePassword);
router.post("/updateProfile", validateUpdateProfileFields, updateProfile);
router.post("/login",validateLoginFields, login);

module.exports = router;
