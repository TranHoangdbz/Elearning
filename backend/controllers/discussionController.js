const mongoose = require("mongoose");
const Course = require("../models/course");
const Quizz = require("../models/quizz");
class discussionController {
    getLessonandQuizzByCourseID = async(req ,res) => {
        console.log("req.body", req.body);
        console.log("req.params.id", req.params.id);
        try {
            const id = mongoose.Types.ObjectId(req?.params?.id);
            var currentCourse;
            await Course.findById(req.params.id).populate("lessons")
                .then(data => {
                    currentCourse = data;
                })
                .catch(error => {
                    throw new Error("This course does not exist!");
                })
            console.log("currentCourse", currentCourse) 

            var currentLessonList = currentCourse.lessons;
            // console.log("currentLessonList", currentLessonList)  
            var allQuizzs;
            
            await Quizz.find()
                .then((data)=>{
                    allQuizzs = data;
                })
                .catch((error)=> {
                    throw new Error("Can't find quizzs");
                })
                // console.log("allQuizzs", allQuizzs)

            // Sau khi get all quizz thì sau đó quăng vào từng lesson
            var temptLessonList = [] ;
            for(var i = 0; i < currentLessonList.length; i++){
                var tempQuizz = [];
                for(var k = 0; k < currentLessonList[i].quizz.length; k++){
                    for(var j = 0; j < allQuizzs.length; j++){    
                        // console.log(currentLessonList[i].quizz[k].toString(), allQuizzs[j]._id.toString())
                        if(currentLessonList[i].quizz[k].toString() == allQuizzs[j]._id.toString()){
                            tempQuizz.push({
                                _id: currentLessonList[i].quizz[k],
                                quizzCode: allQuizzs[j].quizzCode,
                                question:  allQuizzs[j].question,
                                choice:  allQuizzs[j].choice,
                            });
                            break;
                        }
                    }
                }
                temptLessonList.push({
                    ...currentLessonList[i]._doc,
                    quizz: tempQuizz,
                })
            }   
            // console.log("temptLessonList",...temptLessonList);   
            // for(var i = 0; i < temptLessonList.length; i++){
            //     console.log("temptLessonList[i]", temptLessonList[i])
            // }
            res.status(200).send({
                run: true,      
                currentCourse: {
                    ...currentCourse._doc,
                    lessons: temptLessonList,
                }
            })


        } catch (error) {   
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        
    }
}

module.exports =  new discussionController();