const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.MONGODB_CLUSTER;
const DB = "StudentMentor";


module.exports.getMentorsAll = async (req, res, next) => {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const Mentors =  await db.collection("mentor").find({},{"_id":1,"Mentor_name":1,"Class_spl":0,"Age":0,"Students":1,"Rating":0}).toArray();
        await connection.close()
        res.status(200).json(Mentors);

    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
};




module.exports.getMentorsById = async (req, res, next) => {
    const id = req.params.id
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const mentor = await db.collection("mentor").findOne({_id:ObjectId(id)});
        await connection.close()
        res.status(200).json(mentor);

    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
};

module.exports.createMentor = async (req, res, next) => {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        await db.collection("mentor").insertOne(req.body);
        await connection.close()
        res.status(200).json({Message:"Mentor is Created Done"});

    } catch (error) {
        res.status(500).json({Message:"Something went wrong"});
        console.log(error);
    }
};


module.exports.assignMentortoStudent = async (req, res, next) => {
    const id = req.params.id;
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const edit = await db.collection("student").findOneAndUpdate({_id:ObjectId(id)},{$set:req.body});
        await connection.close()

        res.json(edit)
    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
};


module.exports.deleteMentor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        let user = await db
          .collection("mentor")
          .findOneAndDelete({_id:ObjectId(id)});
        await connection.close();
    
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
      }
};