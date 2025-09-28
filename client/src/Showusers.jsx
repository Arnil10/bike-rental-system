import './Showbikes.css';


import { useState } from "react";
import Axios from "axios";

function Showusers(){

  
    const [Userlist,setUserlist]=useState([]);
    
    
    const Showusers=()=>{
        Axios.get("http://localhost:3000/showUsers").then((response)=>{
            setUserlist(response.data)
        })
    }
   
  
    return  (
    <div className='App'>
    <div className="Showbikes">
        <button onClick={Showusers}>Show Users</button>
        <table bgcolor="black" width="700">
                    <tr style={{color:"black"}} bgcolor="grey">
                        <th width="242">Email</th>
                        <th width="242">First Name</th>
                        <th width="242">Last Name</th>
                        <th width="242">phone</th>
                        <th width="242">DL Number</th>
                        
                    </tr>
        </table>
        {
        Userlist.map((val,key)=>{
            return ( 
            
                <table style={{color:"black"}} bgcolor="black" width="700">
                    <tr bgcolor="lightgrey" align="center">
                        <td width="100">{val.email}</td>
                        <td width="100">{val.First_name}</td>
                        <td width="100">{val.last_name}</td>
                        <td width="100">{val.phone}</td>
                        <td width="100">{val.dlnumber}</td>
                       
                    </tr>
                </table>
            
            
        )})
      }
    </div>
    </div>
  
  
    );
  }
  
export default Showusers