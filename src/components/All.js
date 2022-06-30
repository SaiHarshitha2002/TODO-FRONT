import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import {toall} from "./Work"
function All() {
  
  let [Birthdays,setBirthdays]=useState([])
  let [worktodos,setworktodos]=useState([])
  let [Personaltodos,setPersonaltodos]=useState([])
  let [wishlisttodos,setwishlisttodos]=useState([])
  const getBirthdays=()=>{
    axios.get("http://localhost:4040/birthdays/all-todos")
    .then((response)=> {
      console.log(response); 
      setBirthdays(Array.from(response.data.payload))})
    .catch(err=>alert(err))
  }
  const getWorkTodos=()=>{
    // console.log("This is called")
     axios.get("http://localhost:4040/work/all-todos")
     .then(response=> {
      setworktodos(Array.from(response.data.payload))
     // console.log(response)
     })
     .catch(err=>alert(err))
   }
   const getPersonalTodos=()=>{
    axios.get("http://localhost:4040/Personal/all-todos")
    .then(response=>setPersonaltodos(Array.from(response.data.payload)))
    .catch(err=>alert(err))
  }
  const getwishlistTodos=()=>{
    axios.get("http://localhost:4040/wishlist/all-todos")
    .then((response)=>{
      console.log(response);
      setwishlisttodos(Array.from(response.data.payload))})
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    getBirthdays();
    getWorkTodos();
    getPersonalTodos();
    getwishlistTodos();
  },[])
  return <div>
  <div class='container-md m-5'>
      
      <div >
      {Birthdays.length===0 ?<div></div> :
      <table class="table">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Task</th>
            
          </tr>
        </thead>
        <tbody>
          {
            Birthdays.map((element,index)=>
              <tr>
                <td>{index+1}</td>
                <td>{element.task}</td>
              
                <td>Birthday</td>
              </tr>
            )
          }
        </tbody>
      </table>}
      </div>

  
  
  <div >
    {worktodos.length===0 ?<div></div> :
    <table class="table ms-4">
     
      <tbody>
        {
          worktodos.map((element,index)=>
            <tr>
              <td>{index+1}</td>
              <td>{element.task}</td>
              <td>Work</td>
            </tr>
          )
        }
      </tbody>
    </table>}
    </div>
    
    <div >
    {Personaltodos.length===0 ?<div></div> :
    <table class="table ms-5">
      
      <tbody>
        {
          Personaltodos.map((element,index)=>
            <tr>
              <td>{index+1}</td>
              <td>{element.task}</td>
              <td className='ms-2'>Personal</td>
            </tr>
          )
        }
      </tbody>
    </table>}
    </div>
    
    <div >
    {wishlisttodos.length===0 ?<div></div> :
    <table class="table ms-5">
     
      <tbody>
        {
          wishlisttodos.map((element,index)=>
            <tr>
              <td>{index+1}</td>
              <td>{element.task}</td>
              <td>Wishlist</td>
            </tr>
          )
        }
      </tbody>
    </table>}
    </div>
    </div>
  </div>;

}

export default All;
