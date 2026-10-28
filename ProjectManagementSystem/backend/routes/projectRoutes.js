const express=require("express");
const router=express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const {getProjects,createProject,updateProject,deleteProject}=require("../controllers/projectController");

router.get("/",protect,getProjects);
router.post("/",protect,adminOnly,createProject);
router.put("/:id",protect,adminOnly,updateProject);
router.delete("/:id",protect,adminOnly,deleteProject);

module.exports=router;