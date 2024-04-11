import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
export default function Register() {
const [username, setusername] = useState('')
const [password, setpassword] = useState('')
 async function Register(ev) {
  ev.preventDefault();

  const response = await axios.post('/register', {username,password}) 
  console.log({username,password})

}
  return (
<div className="bg-blue-50 h-screen flex items-center">
    <form action="" className='mx-auto w-64' onSubmit={Register}>
        <input value={username} onChange={ev=> setusername(ev.target.value)} type="text" placeholder='Username' name='username' className='block  border-sm w-full p-2 mb-2' />
        <input value={password} onChange={ev=> setpassword(ev.target.value)} type="password" placeholder='Enter Password' name='password' className='block border-sm w-full p-2 mb-2' />
<button className='bg-blue-500 w-full border-sm text-white '>Register</button>




    </form>
</div>
  )
}
