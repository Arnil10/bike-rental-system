import './Showbikes.css';

import { useState } from "react";
import Axios from "axios";

function ShowTerminals(){

  
    const [Terminallist,setTerminallist]=useState([]);
    
    const showTerminals=()=>{
        Axios.get("http://localhost:3000/showTerminals").then((response)=>{
            setTerminallist(response.data)
        })
    }
   
  
    return  (
    <div className='App'>
    <div className="Showbikes">
        <button onClick={showTerminals}>Show Terminals</button>
        <table bgcolor="black" width="700">
                    <tr bgcolor="grey">
                        <th width="402">Terminal ID</th>
                        <th width="402">Terminal Name</th>
                        <th width="402">No of Bikes</th>
                    </tr>
        </table>
        {
        Terminallist.map((val,key)=>{
            return ( 
            
                <table bgcolor="black" width="700">
                    <tr style={{color:"black"}} bgcolor="lightgrey" align="center">
                        <td width="100">{val.terminal_id}</td>
                        <td width="100">{val.terminal_name}</td>
                        <td width="100">{val.no_of_bikes}</td>
                    
                    </tr>
                </table>
            
            
        )})
      }
    </div>
    </div>
  
  
    );
  }
  
  export default ShowTerminals;