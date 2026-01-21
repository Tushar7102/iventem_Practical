const StudentModel = require("../models/crudSchema");

const get =async(req, res) => {
    try {
        const data=await StudentModel.find();
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const getone = async(req, res) => {
    const id=req.params.id;
    if(!id){
        return res.status(400).json({message:"Invalid ID"})
    }
    const data= await StudentModel.findById(id);
    if(!data){
        return res.status(404).json({message:"Data not found"})
    }else{
        try {
             res.status(200).json({ data })
        } catch (error) {
            console.log(error)
        }
    }
}

const post = async(req, res) => {
    const {name,age,city,fees}=req.body
     if (!name, !age, !city, !fees) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
   
   try {
     await StudentModel.create(req.body);
    res.send('API is working properly');
    
   } catch (error) {
    console.log(error)
   }
}

const put = async(req, res) => {
   const id=req.params.id;
   const user=await StudentModel.findById(id);
    if(!user){
        return res.status(400).json({message:"Invalid ID"})
    }
    try {
        await StudentModel.findByIdAndUpdate(id,req.body);
        res.status(200).json({message:"User Updated Successfully"})
    } catch (error) {
        console.log(error)
    }

}

const deleteuser = async(req, res) => {
    const id=req.params.id;
    if(!id){
        return res.status(400).json({message:"Invalid ID"})
    }
    try {
        await StudentModel.findByIdAndDelete(id);
        res.status(200).json({message:"User Deleted Successfully"})

    } catch (error) {
        console.log(error)
    }
}

module.exports = { get,getone,post,put,deleteuser };