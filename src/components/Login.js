
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Image from "../images/bg.jpg";
function Login(){
    //functions
    let [validobj,setvalidobj]=useState([])
    let [currentuser,setcurrentuser]=useState([])
    let navigate=useNavigate()
    let createnewaccount=()=>{
        navigate('/signUp')
    } 
  

    let {register,handleSubmit,formState:{errors}}=useForm()
    let [passState,setPassState]=useState(false) 
    const resetter=()=>{
        setPassState(false)
        
    }
    const myStyle={
        backgroundImage: 
 "url('https://media.istockphoto.com/photos/to-do-list-in-notebook-with-calendar-picture-id1092571024?k=20&m=1092571024&s=612x612&w=0&h=dz6l5jjYZC0lU2dUkqu5g5_0XtY3xnHs57mJDNlvJSk=')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    const forlogin= (userobj)=>{
        
           axios.post('http://localhost:4040/users/login',userobj)
          .then((response)=>{
            if(response.data.message===true){
              
              navigate('/home')
            }

            else{
                alert('invalid password')
            }
          })
          .catch(err=>alert(err))
    }
    return(
        <div className="container-md mt-5 mb-5  mx-auto " style={myStyle}>
        
        <div className="row ">
            <div className="col-lg-5 mx-auto box-shadow shadow-lg p-5 bg-light">
            <div className="display-1 text-primary">Login Here</div>
        <hr/>
            <form  onSubmit={handleSubmit(forlogin)}>
                <div className="m-3">
                    {/* name as input */}
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"  id="name" className="form-control" {...register("name",{required:true})} onClick={resetter} />
                    {errors.name?.type==='required' && <p className="text-danger">*Enter Name</p>}
                
                </div>
                <div className="m-3">
                    {/* password as input */}
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  id="password" className="form-control" {...register("password",{required:true,minLength:8})} onClick={resetter} />
                    {errors.password?.type==='required' && <p className="text-danger">*Please provide password</p> }
                    {errors.password?.type === 'minLength' && <p className="text-danger">*Password must contain 8 characters</p>  }
                </div>
                <div className="m-3">
                    <button type="submit" className="btn btn-success d-block mx-auto"  >Login</button>
                </div>
                {passState &&
                <div>
                    <h2 className="text-danger">Invalid Username or password</h2>
                </div>
                }
            </form>
            <div className="text-center mt-3">
                <a href="#" className="text-center">Need help?</a>
            </div>
            <div className="text-center mt-3">
                <p className="fw-bold text-primary">Donot have an Account?<br/> click the button below Create one Now! </p>
            </div>
            <div className="text-center mt-3">
                <button className="btn btn-secondary " onClick={createnewaccount}>Sign Up</button>
            </div>
            </div>
        </div>
        
        </div>
    )
}

export default Login;
