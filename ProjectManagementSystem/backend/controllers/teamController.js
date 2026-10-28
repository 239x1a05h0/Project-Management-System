const Team=require("../models/team");
const getTeams=async(req,res)=>{
    try{
        const teams=await Team.find()
            .populate("project","name")
            .populate("members","name email role")
            .populate("createdBy","name email")
            .sort({createdAt:-1});
        res.json(teams);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const createTeam=async(req,res)=>{
    try{
        const team=await Team.create({
            name:req.body.name,
            description:req.body.description,
            project:req.body.project,
            members:req.body.members||[],
            createdBy:req.user.id
        });

        const newTeam=await Team.findById(team._id)
            .populate("project","name")
            .populate("members","name email role")
            .populate("createdBy","name email");

        res.status(201).json(newTeam);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const updateTeam=async(req,res)=>{
    try{
        const team=await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        .populate("project","name")
        .populate("members","name email role");

        if(!team){
            return res.status(404).json({
                message:"Team not found"
            });
        }
        res.json(team);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const deleteTeam=async(req,res)=>{
    try{
        const team=await Team.findByIdAndDelete(
            req.params.id
        );
        if(!team){
            return res.status(404).json({
                message:"Team not found"
            });
        }
        res.json({
            message:"Team deleted"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports={getTeams,createTeam,updateTeam,deleteTeam};