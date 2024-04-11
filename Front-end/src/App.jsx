
import axios from 'axios';
import React from 'react'

import  Register  from './Register';


function App() {

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials =true; 
  return (

<Register/>

  )
}

export default App
