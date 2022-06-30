import React, { useEffect } from 'react';
import axios from 'axios';
import { Axios } from 'axios';
//import './work.css';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
function Work() {
  let [worktodos,setworktodos]=useState([])
  useEffect(()=>{
    getWorkTodos();
    console.log('hii hello evartho matladuthunnav');
    console.log(worktodos);
  },[])
  console.log(worktodos);
const getWorkTodos=()=>{
 // console.log("This is called")
  axios.get("http://localhost:4040/work/all-todos")
  .then(response=> {
   setworktodos(Array.from(response.data.payload))
  // console.log(response)
  })
  .catch(err=>alert(err))
}
//  console.log(worktodos) 
  let {register,handleSubmit}=useForm()
  const removetodo=(id)=>{
    axios.delete(`http://localhost:4040/work/remove/${id}`)
    .then(response=>{
      //alert("Task removed successfully")
      console.log(response);
      getWorkTodos();
    })
    .catch(err=>alert(err))
    

  }
  const addtodo= (wobj)=>{
   console.log(wobj);
   wobj.id=worktodos.length
  axios.post('http://localhost:4040/work/add-todo',wobj)
    .then(response=>{
      getWorkTodos();
    })
    .catch(err=>alert(err))
    
    console.log(worktodos)
  }
  return <div class='container m-5'>
    
    <div style={{minHeight:"400px"}}>
    {worktodos.length===0 ? <h1 class='text-danger display-3'>No Tasks found</h1> :
    <table class="table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {
          worktodos.map((element,index)=>
            <tr>
              <td>{index+1}</td>
              <td>{element.task}</td>
              <td> <button class="btn btn-danger" onClick={()=>removetodo(element.id)}>X</button> </td>
            </tr>
          )
        }
      </tbody>
    </table>}
    </div>
     <form onSubmit={handleSubmit(addtodo)} >
       <div class="row">
         <div class="col-sm-10">
           <input type="text" id="" class="form-control" placeholder='Add your task' {...register("task")} />
         </div>
         <div class="col-sm-2">
           <button class="btn btn-success" type="submit">+</button>
         </div>
       </div>
     </form>
  </div>;
  
}

export default Work;
