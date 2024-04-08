import React from 'react'
import { useState } from 'react'
export default function Register() {
const [username, setusername] = useState('')
const [password, setpassword] = useState('')

  return (
<div className="bg-blue-50 h-screen flex items-center">
    <form action="" className='mx-auto w-64'>
        <input value={username} onChange={ev=> setusername(ev.target.value)} type="text" placeholder='Username' name='username' className='block  border-sm w-full p-2 mb-2' />
        <input value={password} onChange={ev=> setpassword(ev.target.value)} type="password" placeholder='Enter Password' name='password' className='block border-sm w-full p-2 mb-2' />
<button className='bg-blue-500 w-full border-sm text-white '>Register</button>




    </form>
</div>
  )
}
