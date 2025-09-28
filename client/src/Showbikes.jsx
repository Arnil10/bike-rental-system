import './Showbikes.css';

import { useState } from "react";
import Axios from "axios";

function Showbikes(){

  
    const [Bikeslist,setBikeslist]=useState([]);
    
    const showBikes=()=>{
        Axios.get("http://localhost:3000/showBikes").then((response)=>{
            setBikeslist(response.data)
        })
    }
   
  
    return  (
    <div className='App'>
    <div className="Showbikes">
        <button onClick={showBikes}>Show Available Bikes</button>
        <table bgcolor="black" width="700">
                    <tr bgcolor="grey">
                        <th width="151">BikeID</th>
                        <th width="151">Bike Name</th>
                        <th width="151">Model</th>
                        <th width="151">Color</th>
                        <th width="151">Bike Type</th>
                        <th width="151">TerminalID</th>
                        <th width="151">Price</th>
                        <th width="151">Available</th>
                    </tr>
        </table>
        {
        Bikeslist.map((val,key)=>{
            return ( 
            
                <table bgcolor="black" width="700">
                    <tr style={{color:"black"}}  bgcolor="lightgrey" align="center">
                        <td width="100">{val.bike_id}</td>
                        <td width="100">{val.bike_name}</td>
                        <td width="100">{val.Model}</td>
                        <td width="100">{val.color}</td>
                        <td width="100">{val.bike_type}</td>
                        <td width="100">{val.terminal_id}</td>
                        <td width="100">{val.price}</td>
                        <td width="100">{val.availability}</td>
                    </tr>
                </table>
            
            
        )})
      }
    </div>
    </div>
  
  
    );
  }
  
  export default Showbikes