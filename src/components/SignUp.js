import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
  let navigate = useNavigate();
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const onsubmit=async (e)=>{
        e.preventDefault();
        let {name,email,password}=credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password}) 
          });
          const json=await response.json();
        //   console.log(json);
          if(json.success){
            // save auth token and redirect
            localStorage.setItem("token",json.authtoken);
            navigate('/');
            props.showAlert("Successfully SignedIn","success");
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
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={handleChange} id="password" required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} onChange={handleChange} id="cpassword" required minLength={5} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp
