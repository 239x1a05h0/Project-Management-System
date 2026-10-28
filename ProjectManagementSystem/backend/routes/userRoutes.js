const express=require("express");
const router=express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const {getUsers,getUserById,updateUser,deleteUser}=require("../controllers/userController");

router.get("/",protect,getUsers);
router.get("/:id",protect,getUserById)
router.put("/:id",protect,adminOnly,updateUser);
router.delete("/:id",protect,adminOnly,deleteUser);

module.exports=router;
