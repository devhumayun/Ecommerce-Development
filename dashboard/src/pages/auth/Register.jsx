import { Link } from 'react-router-dom';
import whiteLogo from '../../assets/img/logo-white.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/auth/authApiSlice';
import { sweetAlertBasic, sweetAlertStandard } from '../../utlis/sweetAlert';
import { createToast } from '../../utlis/toast';
import { setMessageEmpty } from '../../features/auth/authSlice';

const Register = () => {

  const dispatch = useDispatch()
  const {error, message} = useSelector(state => state.auth)

  const [ input, setInput ] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: ""
  })
  const handleInputChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name] : e.target.value
    }))
  }

  const handleUserRegister = (e) => {
    e.preventDefault()

    if(!input.name || !input.email || !input.password){
      sweetAlertBasic("All Fields are requried")
    }

    if( input.password !== input.cPassword){
      sweetAlertStandard({title: "Password not match", msg:"Password and comfirm password must have to me same!"}, "info")
    }else{
      dispatch(createUser({
        name: input.name,
        email: input.email,
        password: input.password
      }))
      setInput({
        name: "",
        email: "",
        password: "",
        cPassword: ""
      })
    }
  }

  useEffect(() => {
    if(error){
      createToast(error)
      dispatch(setMessageEmpty())
    }
    if(message){
      createToast(message, "success")
      dispatch(setMessageEmpty())
    }
  }, [error,message])

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img
                  className="img-fluid"
                  src={whiteLogo}
                  alt="Logo"
                />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Register</h1>
                  <p className="account-subtitle">Access to our dashboard</p>

                  <form onSubmit={handleUserRegister}>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Name"
                        name='name'
                        value={input.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Email"
                        name='email'
                        value={input.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Password"
                        name='password'
                        value={input.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Confirm Password"
                        name='cPassword'
                        value={input.cPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <div className="login-or">
                    <span className="or-line"></span>
                    <span className="span-or">or</span>
                  </div>
               
                  {/* 
                  <div className="social-login">
                    <span>Register with</span>
                    <a href="#" className="facebook">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#" className="google">
                      <i className="fa fa-google"></i>
                    </a>
                  </div> */}

                  <div className="text-center dont-have">
                    Already have an account? <Link to="/login">Login</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
