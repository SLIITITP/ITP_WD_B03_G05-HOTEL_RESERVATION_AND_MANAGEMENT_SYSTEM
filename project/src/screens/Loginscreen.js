import Loader from '../components/Loader'
import Error from '../components/Error'
import React , {useState , useEffect} from 'react'
import axios from 'axios'



function Loginscreen() {

 
  const [email , setemail] = useState('') 
  const [password , setpassword] = useState('') 
 
  const [loading , setloading] = useState(false);
  const [error , seterror] = useState();

  async function login(){
   
      const user={
       
        email,
        password,
       
      }
      try {
        setloading(true)
        const result = (await axios.post('/api/users/login' , user)).data
        setloading(false);

        localStorage.setItem('currentUser' , JSON.stringify(result));
        window.location.href='/home'


      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)

      }


    }
    
  return (
    <div>

      <div className='row justify-content-center mt-5' >
        <div className="col-md-5 mt-5"> 

            {error && (<Error message = 'Invalid Credentionals'/>)}


            <div className='bs'>
              <h2>Welcome Back !</h2>

             <b><i>User Email</i></b>
              <input type='text' className='form-control' placeholder=''
              value={email} onChange={(e) => {setemail(e.target.value)}}/>
              
               <b><i>password</i></b>
              <input type='password' className='form-control' placeholder=''
              value={password} onChange={(e) => {setpassword(e.target.value)}}/>
              

              <button type="button" class="btn btn-primary btn-lg btn-block mt-3" onClick={login}>login</button>
              
              
            </div>
        </div>

      </div>

    </div>
  )
} 

export default Loginscreen
