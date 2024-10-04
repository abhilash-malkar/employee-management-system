const express = require("express");
const Router = express.Router();
const connect = require("../database/Connection");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./media/");
  },
  filename: function (req, file, cb) {
    const hash = crypto.randomBytes(16).toString("hex");
    cb(null, hash + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

Router.get("/get/:id", async (req, res) => {
  try {
    const database = await connect();
    const employee = await database.collection("t_Employee").findOne({ f_Id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ message: "Error fetching employee" });
  }
});

Router.put("/update/:id", upload.single("f_Image"), async (req, res) => {
  try {
    const database = await connect();
    const collection = database.collection("t_Employee");

    const updateData = {
      f_Name: req.body.f_Name,
      f_Email: req.body.f_Email,
      f_Mobile: req.body.f_Mobile,
      f_Designation: req.body.f_Designation,
      f_Gender: req.body.f_Gender,
      f_Course: req.body.f_Course,
    };

    if (req.file) {
      updateData.f_Image = req.file.filename;
    }

    const result = await collection.updateOne(
      { f_Id: req.params.id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Error updating employee" });
  }
});

Router.get("/get", async (req, res) => {
    const database = await connect();
    const employees = await database.collection("t_Employee").find({}).toArray();
    res.json({data:employees});
});

Router.post("/create", upload.single("f_Image"), async (req, res) => {
    try {
        const database = await connect();
        const collection = database.collection("t_Employee");

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.f_Email)) {
            return res.status(400).json({ errors: { f_Email: "Invalid email format" } });
        }

        // Check for email duplicate
        const existingEmployee = await collection.findOne({ f_Email: req.body.f_Email });
        if (existingEmployee) {
            return res.status(400).json({ errors: { f_Email: "Email already in use" } });
        }

        // Numeric validation for mobile
        if (!/^\d+$/.test(req.body.f_Mobile)) {
            return res.status(400).json({ errors: { f_Mobile: "Mobile number must contain only digits" } });
        }

        // File type validation
        if (req.file && !['image/jpeg', 'image/png'].includes(req.file.mimetype)) {
            return res.status(400).json({ errors: { f_Image: "Only JPG/PNG files are allowed" } });
        }

        const lastEmployee = await collection.findOne({}, { sort: { f_Id: -1 } });
        const newId = lastEmployee ? (parseInt(lastEmployee.f_Id) + 1).toString() : "1";

        const newEmployee = {
            f_Id: newId,
            f_Image: req.file ? req.file.filename : null,
            f_Name: req.body.f_Name,
            f_Email: req.body.f_Email,
            f_Mobile: req.body.f_Mobile,
            f_Designation: req.body.f_Designation,
            f_Gender: req.body.f_Gender,
            f_Course: req.body.f_Course,
            f_Createdate: new Date().toISOString(),
        };

        await collection.insertOne(newEmployee);
        res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Error creating employee" });
    }
});

Router.delete("/delete/:id", async (req, res) => {
  try {
    const database = await connect();
    const collection = database.collection("t_Employee");

    const employee = await collection.findOne({ f_Id: req.params.id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.f_Image) {
      const imagePath = path.join(__dirname, '../../media', employee.f_Image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    const result = await collection.deleteOne({ f_Id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Error deleting employee" });
  }
});

// Add this new route for checking email duplicates
Router.get("/check-email", async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res.status(400).json({ message: "Email parameter is required" });
    }

    const database = await connect();
    const collection = database.collection("t_Employee");

    const existingEmployee = await collection.findOne({ f_Email: email });

    res.json({ isDuplicate: !!existingEmployee });
  } catch (error) {
    console.error("Error checking email duplicate:", error);
    res.status(500).json({ message: "Error checking email duplicate" });
  }
});

module.exports = Router;
