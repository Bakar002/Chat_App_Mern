
import axios from 'axios';
import React from 'react'


import{ UserContextProvider} from './Usercontext';
import Routes from './Routes';


function App() {

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials =true; 


  return (
<UserContextProvider>
<Routes/>
</UserContextProvider>


  )
}

export default App
