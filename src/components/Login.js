import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


function Login(props) {
    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({email:"",password:""});
    const onsubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success){
            // save auth token and redirect
            localStorage.setItem("token",json.authtoken);
            navigate('/');
            props.showAlert("Successfully Logged In","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
        }
        const handleChange = (e) => {
          setcredentials({ ...credentials, [e.target.name]: e.target.value })
        }
  return (
    <div>
      <form onSubmit={onsubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
