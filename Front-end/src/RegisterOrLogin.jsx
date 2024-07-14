import React from 'react';
import {useContext, useState} from "react";

import axios from 'axios' ;
import {UserContext}  from "./Usercontext"

export default function RegisterOrLogin() {
const [username, setusername] = useState('')
const [password, setpassword] = useState('')
const [LoginOrRegister,setLoginOrRegister] = useState('register')
const {setUsername,setId}= useContext(UserContext)
 async function RegisterOrLogin(ev) {
  ev.preventDefault();
const url=LoginOrRegister === 'register'?'register':'login';
  const {data} = await axios.post(`/${url}`, {username,password}) ;
     setUsername(username);
     setId(data.id); 


} 
  return (
<div className="bg-blue-50 h-screen flex items-center">
    <form action="" className='mx-auto w-64' onSubmit={RegisterOrLogin}>
        <input value={username} onChange={ev=> setusername(ev.target.value)} type="text" placeholder='Username' name='username' className='block  border-sm w-full p-2 mb-2' />
        <input value={password} onChange={ev=> setpassword(ev.target.value)} type="password" placeholder='Enter Password' name='password' className='block border-sm w-full p-2 mb-2' />
<button className='bg-blue-500 w-full border-sm text-white '>
  
  {LoginOrRegister==='register' ? 'Register' : 'Login'}
  </button>
<div className="text-center mt-2">
{LoginOrRegister==='register'&&(
<div>

Already a member? 

<button onClick={()=>{

setLoginOrRegister('login')
}}>
  Login
</button>
</div>  


)}

{LoginOrRegister==='login'&&(
<div>

Don't have an Account?

<button onClick={()=>{

setLoginOrRegister('register')
}}>
  Register
</button>
</div>  


)}


 



</div>



    </form>
</div>
  )
}
