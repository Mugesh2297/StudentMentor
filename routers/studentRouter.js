const express = require("express");
const router = express.Router();
const studentModule = require("../modules/studentModule");





router.get("/student-all",studentModule.getStudentsAll);

router.get("/student/:id",studentModule.getStudentById);


router.put("/assign_student/:id", studentModule.assignStudenttoMentor);


router.post("/student",studentModule.createStudent);


router.delete("/delete_student/:id",studentModule.deleteStudent);


module.exports = router;