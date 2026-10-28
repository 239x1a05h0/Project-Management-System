const express=require("express");
const router=express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const {getTeams,createTeam,updateTeam,deleteTeam}=require("../controllers/teamController");
router.get("/",protect,getTeams);
router.post("/",protect,adminOnly,createTeam);
router.put("/:id",protect,adminOnly,updateTeam);
router.delete("/:id",protect,adminOnly,deleteTeam);
module.exports=router;