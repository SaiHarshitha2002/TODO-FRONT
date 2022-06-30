import React, { useEffect } from 'react';
import axios from 'axios';
import {useState} from 'react';
import { useForm } from 'react-hook-form';
function Personal() {  
  let [Personaltodos,setPersonaltodos]=useState([])
  useEffect(()=>{
   getPersonalTodos();
  },[])
  const getPersonalTodos=()=>{
    axios.get("http://localhost:4040/Personal/all-todos")
    .then(response=>setPersonaltodos(Array.from(response.data.payload)))
    .catch(err=>alert(err))
  }
  let {register,handleSubmit}=useForm()
  const removetodo=(id)=>{
    axios.delete(`http://localhost:4040/Personal/remove/${id}`)
    .then(response=>{
      getPersonalTodos();
    })
    .catch(err=>alert(err))

  }
  const addtodo=(obj)=>{
    obj.id=Personaltodos.length
   axios.post("http://localhost:4040/Personal/add-todo",obj)
   .then(response=>{
     getPersonalTodos();
   })
   .catch(err=>alert(err))
  }
  return <div class='container m-5'>
    
    <div style={{minHeight:"400px"}}>
    {Personaltodos.length===0 ? <h1 class='text-danger display-3'>No Tasks found</h1> :
    <table class="table">
      <thead>
        <tr>
          <th>Sno</th>
          <th>Task</th>
        </tr>
      </thead>
      <tbody>
        {
          Personaltodos.map((element,index)=>
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

export default Personal;
