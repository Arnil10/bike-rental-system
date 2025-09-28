
const express = require('express')
const app= express()
const mysql=require('mysql2');
const cors= require('cors')


app.use(cors());
app.use(express.json())

const db= mysql.createConnection({
    user: 'root',
    host:'localhost',
    password:'ronsylpeto1',
    database: 'bike_rental',
});

app.post('/addBikes', (req,res)=> {
    const BikeName=req.body.BikeName;
    const Model=req.body.Model;
    const Color=req.body.Color;
    const BikeType=req.body.BikeType;
    const Price=req.body.Price;
    const TerminalID=req.body.TerminalID;
    const Availability=req.body.Availability;

    db.query('INSERT INTO bike (bike_name,Model,color,bike_type,price,terminal_id,availability) VALUES (?,?,?,?,?,?,?)',
        [BikeName,Model,Color,BikeType,Price,TerminalID,Availability],
        (err , result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("values inserted");
            }
        }
    )
})

app.get('/showBikes',(req,res)=>{
    db.query('SELECT * FROM bike',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get('/showUsers',(req,res)=>{
    db.query('SELECT email,First_name,last_name,phone,dlnumber FROM user',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.get('/showTerminals',(req,res)=>{
    db.query('SELECT * FROM terminal',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.put('/updatePrice',(req,res)=>{
    const id=req.body.bike_id;
    const price=req.body.price;
    db.query("UPDATE bike SET price=? WHERE bike_id=?",
        [price,id],(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    )
})


app.delete('/deleteBike/:id',(req,res)=>{
    const id=req.params.id;
    db.query("DELETE FROM bike WHERE bike_id=?",id,(err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
    })
})













app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send({ success: false, message: "Missing username or password." });
    }
  
    const query = "SELECT * FROM user WHERE First_name = ? AND password = ?";
    db.query(query, [username, password], (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send({ success: false, message: "Internal server error." });
      }
  
      if (result.length > 0) {
        res.status(200).send({ success: true, username: result[0].First_name });
      } else {
        res.status(401).send({ success: false, message: "Invalid username or password." });
      }
    });
  });



  app.get("/getBikeDetails/:bikeId", (req, res) => {
    const bikeId = req.params.bikeId;  // Get bikeId from the URL parameter
  
    // SQL query to get bike details by bikeId
    const query = "SELECT * FROM bike WHERE bike_id = ?";
    
    db.execute(query, [bikeId], (err, results) => {
      if (err) {
        console.error("Error fetching bike details:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Bike not found" });
      }
  
      // Send the bike details as a response
      res.status(200).json(results[0]);
    });
  });



  app.post("/bookBike", (req, res) => {
    const { bikeId, startDate, endDate, userName ,days } = req.body;
  
    // Validation checks
    if (!bikeId || !startDate || !endDate || !userName) {
      return res.status(400).json({ message: "Please provide all details." });
    }
  
    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ message: "End date must be after start date." });
    }
  
    // Insert booking into the database
    const query = `
      INSERT INTO transaction (email,bike_id, start_date, end_date,estimated_price)
      VALUES (?, ?, ?, ?,?)`;
  
    db.query(query, [userName,bikeId, startDate, endDate,days], (err, result) => {
      if (err) {
        console.error("Error inserting booking: ", err);
        return res.status(500).json({ message: "Internal server error." });
      }
  
      res.status(201).json({
        message: "Booking successful",
        bookingId: result.insertId, // Booking ID from the database
      });
    });
  });



  app.get('/showTransactions',(req,res)=>{
    db.query('SELECT * FROM transaction',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})


app.delete('/deleteTrans/:email',(req,res)=>{
    const email=req.params.email;
    db.query("DELETE FROM transaction WHERE email=?",email,(err,result)=>{
        if(err){
            console.log(err);

        }else{
            res.send(result);
        }
    })
})







app.post('/signUp',(req,res)=>{

    const Email=req.body.email;
    const FirstName=req.body.Firstname;
    const LastName=req.body.Lastname;
    const Password=req.body.password;
    const Phone =req.body.phone;
    const DLnumber=req.body.dlnumber;

    db.query('INSERT INTO user (email,First_name,last_name,password,phone,dlnumber) VALUES (?,?,?,?,?,?)',
        [Email,FirstName,LastName,Password,Phone,DLnumber],
        (err , result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send("values inserted");
            }
        }
    )
})





app.listen(3000,()=>{
    console.log('yay running server on port 3000 ')
})