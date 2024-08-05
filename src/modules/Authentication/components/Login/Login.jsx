
import logo from '../../../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {  toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';



    export default function Login({saveLoginData}) {

    let navigate = useNavigate();
    let { register,
          handleSubmit,
          formState: {errors},
        } = useForm();
        let onSubmit = async (data) =>{
    //for api
      try {
      let response = await axios. post ('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);

      console.log(response);
      localStorage.setItem("token",response.data.token);    
      saveLoginData();
    //tostfay
      toast.success("login successfully");
      navigate("/dashboard");

      } catch (error) {
        toast.error (error .response .data.message);
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                      <div className="input-group mb-3 ">

                      <span className="input-group-text d-flex" id="basic-addon1">
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


                      <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                      <FontAwesomeIcon icon={faKey} />
                      </span>
                      <input type="password"
                      className="form-control" 
                      placeholder="password" 
                      aria-label="password" 
                      aria-describedby="basic-addon1"
                      
                      {...register('password',{
                        required:'password is required'
                      })}
                      />
                      </div>
                      {errors.password && <span className='text-danger'>{errors.password.message} </span> }

                      <div className='links d-flex justify-content-between'>
                      <Link to='Resetpass'className='text-decoration-none text-success'>Register Now?</Link>
                      <Link to='Forgetpass' className='text-decoration-none text-success'>Forgot Password?</Link>
                      </div>
                      
                      

                      <button type='submit' 
                      className='btn btn-success d-block w-100 my-3'>login</button>
                </Form>
              </div>

            </div>
        </div>
    </div>

  )
}
