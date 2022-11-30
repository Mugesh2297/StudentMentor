const mongodb = require("mongodb");
const {ObjectId} = require("mongodb");
const mongoClient = mongodb.MongoClient;
const URL = process.env.MONGODB_CLUSTER;
const DB = "StudentMentor";


module.exports.getStudentsAll = async (req, res, next) => {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB); 
        const Students =await db.collection("student").find().toArray();
        await connection.close();
        res.status(200).json(Students);

    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
};


module.exports.getStudentById = async (req, res, next) => {
    const id = req.params.id
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const student = await db.collection("student").findOne({_id:ObjectId(id)});
        await connection.close()
        res.status(200).json(student);

    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong"})
        console.log(error);
    }
};

module.exports.createStudent = async (req, res, next) => {
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB); 
        await db.collection("student").insertOne(req.body);
        await connection.close();
        res.status(200).json({Message:"Student create Done"});

    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
};


module.exports.assignStudenttoMentor = async (req, res, next) => {
    const id = req.params.id;
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        const edit = await db.collection("mentor").findOneAndUpdate({_id:ObjectId(id)},{$set:req.body});
        await connection.close()

        res.json(edit)
    } catch (error) {
        res.status(500).json({Message:"Something Went wrong"});
        console.log(error);
    }
};


module.exports.deleteStudent = async (req, res, next) => {
    const id = req.params.id;
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        let user = await db
          .collection("student")
          .findOneAndDelete({_id:ObjectId(id)});
        await connection.close();
    
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "something went wrong" });
      }
};