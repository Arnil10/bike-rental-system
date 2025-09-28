import './Addbikes.css';


import { useState } from "react";
import Axios from "axios";


function Addbikes(){

  
  const [BikeName,setBikeName]=useState("")
  const [Model,setModel]=useState("")
  const [Color,setColor]=useState("")
  const [BikeType,setBikeType]=useState("")
  const [Price,setPrice]=useState(0)
  const [TerminalID,setTerminalID]=useState(0)
  const [Availability,setAvailability]=useState("");

  const addBikes=()=>{
    Axios.post('http://localhost:3000/addBikes',{
      BikeName:BikeName,
      Model:Model,
      Color:Color,
      BikeType:BikeType,
      Price:Price,
      TerminalID:TerminalID,
      Availability:Availability,

    }).then(()=>{
      console.log("success");
    })
  };

  return  (
  <div className="App">
    <div className="addBikes">
      <label style={{color:"black"}}>Bike Name:</label>
      <input size="143"type="text" onChange={(event)=>{setBikeName(event.target.value)}}/>
      <label style={{color:"black"}}>Model:</label>
      <input type="text" onChange={(event)=>{setModel(event.target.value)}}/>
      <label style={{color:"black"}}>Color:</label>
      <input type="text" onChange={(event)=>{setColor(event.target.value)}}/>
      <label style={{color:"black"}}>Bike type:</label>
      <input type="text" onChange={(event)=>{setBikeType(event.target.value)}}/>
      <label style={{color:"black"}}>Price:</label>
      <input type="number" onChange={(event)=>{setPrice(event.target.value)}}/>
      <label style={{color:"black"}}>Terminal ID:</label>
      <input type="number" onChange={(event)=>{setTerminalID(event.target.value)}}/>
      <label style={{color:"black"}}>Availability:</label>
      <input type="text" onChange={(event)=>{setAvailability(event.target.value)}}/>
      <button onClick={addBikes}>ADD</button>
    </div>
  </div>


  );
}

export default Addbikes
