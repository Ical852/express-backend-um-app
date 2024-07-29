"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Admin Session
router.post("/register", adminController_1.createAdmin);
router.post("/login", adminController_1.loginAdmin);
router.get("/fetch", authMiddleware_1.authMiddleware, adminController_1.fetchAdmin);
router.post("/update", authMiddleware_1.authMiddleware, adminController_1.update);
router.post("/logout", authMiddleware_1.authMiddleware, adminController_1.logout);
// Admin Data
router.get("/", authMiddleware_1.authMiddleware, adminController_1.getAdmins);
router.put("/:id", authMiddleware_1.authMiddleware, adminController_1.updateAdmin);
router.delete("/:id", authMiddleware_1.authMiddleware, adminController_1.deleteAdmin);
exports.default = router;
