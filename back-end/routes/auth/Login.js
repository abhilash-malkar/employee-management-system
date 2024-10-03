const express=require("express");
const Router =express.Router();
const connect = require("../database/Connection");


Router.post("/check", async (req, res) => {
    const { username, password } = req.body;
    const database = await connect();
    
    const users = await database.collection("t_login").findOne({ f_userName: username });
    
    if (!users) {
        return res.status(404).json({status:false, error: "User not found" });
    }
    
    if (users.f_Pwd !== password) {
        return res.status(401).json({ status:false, message: "Invalid password" });
    }
    
    res.json({status:true, message: "Login successful" });
});


Router.get("/all", async (req, res) => {
    const database = await connect();
    const users = await database.collection("t_login").find({}).toArray();
    res.json({status:true, users});
});

module.exports = Router;