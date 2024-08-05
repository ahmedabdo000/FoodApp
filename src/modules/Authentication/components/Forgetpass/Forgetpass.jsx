import logo from '../../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';



export default function Forgetpass() {


  let {
    register,
    handlSubmit,
    formState:{errors}
  } = useForm();

  let onSubmit = async (data) =>{
    //for api
      try {
      let response= await axios. post ('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
        console.log(response)
      toast.success("login successfully")
      Navigate("/Resetpass");

      } catch (error) {
      toast.error (error.response.data.message);
      }
      };

  return (
    <div className="auth-container bg-overlay">
    <div className="container-fluid ">
        <div className="row  vh-100 justify-content-center align-items-center ">
          <div className="col-md-5 bg-white px-5 py-3 text-center rounded rounded-2">
            <div>
             <img src={logo} alt='food-logo' className='w-50'/>
            </div>

            <div >
              <h3>Forget Your Password?</h3>
              <p>No worries! Please enter your email and we will send a password reset link </p>
            </div>
        
              <Form  onSubmit={handlSubmit(onSubmit)}>
              <div className="input-group mb-3">
          
              <span className="input-group-text" id="basic-addon1">
              <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input type="text" 
                      className="form-control" 
                      placeholder="Enter your E-mail" 
                      aria-label="Username" 
                      aria-describedby="basic-addon1"

                      {...register("email",{
                        required:'email is required',
                        pattern:{
                          value:'/^[A-Z0-9._%+-]+@[A-Z0-9.-]+/.[A-Z]{2,}$/i;',
                          message:'email shoud be valid mail'
                        }
                      })}

              />
              </div>
              {errors.email&& <span className='text-danger'>{errors.email.message} </span> }
              </Form>
              <button type='submit' 
              className='btn btn-success d-block w-100 my-3'>submit</button>
          </div>

        </div>
    </div>
</div>


  )
}
