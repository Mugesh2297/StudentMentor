const express = require("express");
const router = express.Router();
const mentorModule = require("../modules/mentorModule");





router.get("/mentor-all",mentorModule.getMentorsAll);

router.get("/mentor/:id",mentorModule.getMentorsById);


router.put("/assign_mentor/:id", mentorModule.assignMentortoStudent);


router.post("/mentor",mentorModule.createMentor);


router.delete("/delete_mentor/:id",mentorModule.deleteMentor);


module.exports = router;