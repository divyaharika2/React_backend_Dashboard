import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }

    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({username, email, password})
      })
      
      const data =await response.json();
      if(response.ok){
        console.log(data)
        setUsername("");
        setEmail("");
        setPassword("");
        alert("Vendor registered Success")
        showLoginHandler()
      }
      else{
        setError(data.error)
      }

    } catch (error) {
      console.error("registration failed", error);
      alert("Registration failed")
    }
  }

  return (
    <div className="registerSection">
        <form className="authForm" onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label htmlFor="">Username</label>
            <input type="text" name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='enter your name' /><br />
            <label htmlFor="email">Email</label>
            <input type="text" name='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='enter your email' /><br />
            <label htmlFor="password">Password</label>
            <input type="password" name='password' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='enter your password' /><br />
            <div className="btnSubmit">
               <button type='submit'>Submit</button>
            </div><br />
        </form> 
    </div>
  )
}

export default Register
