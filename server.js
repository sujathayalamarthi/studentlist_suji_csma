const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let studentsCollection;

async function connectDB() {
  await client.connect();
  const db = client.db("studentDB");
  studentsCollection = db.collection("students");
  console.log("MongoDB Connected to studentDB database");
}
connectDB();

// GET ALL
app.get('/students', async (req, res) => {
  const students = await studentsCollection.find({}).toArray();
  res.json(students);
});

// GET ONE
app.get('/students/:id', async (req, res) => {
  const student = await studentsCollection.findOne({ id: parseInt(req.params.id) });
  if(!student) return res.status(404).json({error: "Not Found"})
  res.json(student);
});

// POST - ADD
app.post('/students', async (req, res) => {
  const lastStudent = await studentsCollection.find({}).sort({id: -1}).limit(1).toArray();
  const newId = lastStudent.length > 0? lastStudent[0].id + 1 : 1;
  const newStudent = {...req.body, id: newId };
  await studentsCollection.insertOne(newStudent);
  res.json(newStudent);
});

// PUT - EDIT
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    delete data._id; 
    delete data.id;
    
    await studentsCollection.updateOne(
      { id: parseInt(id) }, // FIXED: studentsCollection + parseInt
      { $set: data }
    )
    res.json({success: true})
  } catch(err) {
    console.log(err)
    res.status(500).json({error: err.message})
  }
})

// DELETE
app.delete('/students/:id', async (req, res) => {
  const result = await studentsCollection.deleteOne({ id: parseInt(req.params.id) });
  res.json({ message: "Deleted", result });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});