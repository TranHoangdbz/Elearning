const mongoose = require("mongoose");
const Course = require("../models/course");

class discussionController {
    getCourseByID = async(req, res) => {
        try {
            const id = req?.params?.id;
            console.log("id", req?.params?.id);
            var newI2 = await Course.find();
            // console.log("newI2", newI2); 
            for(var i = 0; i < newI2.length; i++){
                console.log(newI2[i]._id.toString(), id);
                if(newI2[i]._id.toString()==id){
                    console.log("tìm ra rồi");
                }
            }


            await Course.findOne({
                _id: req.params.id,
            }).populate("lesson")
            .then(data => {
                if(data==null) throw new Error("This course does not exist!");
                return res.status(200).json({
                    success: true,
                    message: "Get the course's details successfully!",
                    data: data,
                });
            })
            .catch(error => {
                throw new Error("This course does not exist!");
            })
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } 
}

module.exports =  new discussionController();