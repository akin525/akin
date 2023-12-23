import { Link } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
// import { toast } from 'react-toastify';
import gh from 'lg.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {

  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password,setPassword] = useState("");
  const [isloading, setisloading]=useState(false);
  const baseURL = "https://bills.sammighty.com.ng/api/auth/signin";
  const baseURL1 = "https://bills.sammighty.com.ng/api/auth/google";
  const [loading, setloading]=useState(false);

  const [con, setcon] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
  }
  const togglePassword =()=>{
    if(passwordType==="password")
    {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  function spin(){
    window.web2app.spinandwin({'token': "1380001|5xfpeJUtI3FXLaOR43f32PI7Wjjz2HfYVRoEsUev"})
  }

  function googleCallback(data) {
    // alert(JSON.stringify(data.data.email));
    setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL1, {
            name:data.data.name,
            email:data.data.email,
            dob: '1990-04-12',
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              // swal({
              //   title: "Ooops",
              //   text: response.data.message,
              //   icon: "error",
              //   confirmButtonText: "OK",
              // });

              toast.success('Login successful!', {
                position: "top-center",
                autoClose: 30000, // Time in milliseconds, or false to disable autoclose
              });
            }else{
              toast.success('Login successful!', {
                position: "top-center",
                autoClose: 30000, // Time in milliseconds, or false to disable autoclose
              });
              setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.token);
              // alert(response.data.token);

              try {
                window.web2app.biometric.saveauth({'password':password, 'username':username});
                window.web2app.pushNotification.subscribe(username);


              }catch (e) {
                console.log("Can not excecute for now");
              }
              // const [cookies, setCookie] = useCookies(response.data.username);
              window.location.href='/dashboard';
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      setError("An error occured. Check your input and try again");
    }
  }
  function google(){
    window.web2app.googlesignin.signin(googleCallback);


  }


  function myCallback(data) {
    setcon(JSON.stringify(data.success));
    // alert(JSON.stringify(data));

  }
  function myCallback1(data) {
    setcon(JSON.stringify(data.success));
  }
  function myCall(data) {
    // alert(JSON.stringify(data));
  }

  function contactCallback(data) {
    console.log("I am in callback")
    console.log(JSON.stringify(data));
      // alert(JSON.stringify(data.data));
      // alert(JSON.stringify(data.data.username));
      // alert(JSON.stringify(data.data.password));

    setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL, {
            username:data.data.username,
            password:data.data.password,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              swal({
                title: "Ooops",
                text: response.data.message,
                icon: "error",
                confirmButtonText: "OK",
              });


            }else{
              setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.token);

              // const [cookies, setCookie] = useCookies(response.data.username);
              window.location.href='/dashboard';
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      setError("An error occured. Check your input and try again");
    }

  }
  function pick(){
    window.web2app.biometric.start(contactCallback);
  }
  React.useEffect(()=> {
    try {
      window.web2app.confirmlogin.islogout(myCallback1);
      window.web2app.deviceInfo(myCallback);
     window.web2app.biometric.check(myCall)

    }catch (e) {
      console.log("Can not excecute for now");
    }
  },[]);
  const handleInputChange = (e) => {
    const {id , value} = e.target;

    if(id === "username"){
      setusername(value);
    }

    if(id === "password"){
      setPassword(value);
    }


  }
  const handleSubmit  = async () =>  {
      setisloading(true);
    setloading(true);
    try {
      axios
          .post(baseURL, {
            username:username,
            password:password,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);

            if (response.data.status == "0") {
              setError(response.data.message);
              // swal({
              //   title: "Ooops",
              //   text: response.data.message,
              //   icon: "error",
              //   confirmButtonText: "OK",
              // });
              toast.error(response.data.message, {
                position: "top-center",
                autoClose: 3000, // Time in milliseconds, or false to disable autoclose
              });

            }else{
              toast.success('Login successful!', {
                position: "center",
                autoClose: 3000, // Time in milliseconds, or false to disable autoclose
              });
              setMessage(response.data.message);
              localStorage.setItem('dataKey', response.data.data.token);
              try {
                window.web2app.biometric.saveauth({'password':password, 'username':username});
                window.web2app.pushNotification.subscribe(username);

              }catch (e) {
                console.log("Can not excecute for now");
              }
              // const [cookies, setCookie] = useCookies(response.data.username);
           window.location.href='/dashboard';
            }
            // setPost(response.data);
          });
    }catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      setError("An error occured. Check your input and try again");
    }
  }
  return (
    <>
      <div className="show-section">
      <section className="step1">
        <div className="step1-inner">
          <div className="container">
            <div className="wrapper">
              <div className="row">
                <div className="col-md-7 pe-md-4">
                  <div className="row">
                    <div className="col-md-6 tab-100">

                      <div className="company">

                        <div className="company_logon text-center">
                          <img width="50" alt="avatar" src={gh}/>
                        </div>

                        <div className="company-name">
                          <h4>SAVEBILLS &</h4>
                          <p>PAY BILLS</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 tab-100">

                      <div className="form_tabs">
                        <div className="nav nav-tabs" id="form-tabs" role="tablist">

                          <button className="nav-link active" id="car-insurance-tab" data-bs-toggle="tab"
                                  data-bs-target="#car-tab" role="tab" aria-controls="car-tab" aria-selected="true">
                            Login
                          </button>

                          <Link to="/auth/register" className="nav-link">
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="car-tab" role="tabpanel"
                         aria-labelledby="car-insurance-tab" tabIndex="0">
                      {loading ?<div className="overlay">
                            <div className="loader"></div>
                          </div>:
                          <form className="entrance_animation">

                            <div className="main-heading">
                              Buy Airtime/Data
                              <br/>
                              Pay Bills
                            </div>
                                        <ToastContainer/>

                            <br/>

                            <div>
                              <label className="label-text">Username</label>
                              <input className="form_input" type="text" name="username" placeholder="Username"
                                     value={username} onChange={(e) => handleInputChange(e)} id="username"
                                     required/>
                            </div>
                            <div>
                              <label className="label-text">Password</label>
                              <div
                                  style={{
                                    width: "auto",
                                    position: "relative",
                                    box_sizing: "border-box"
                                  }}>
                              <input className="form_input" type={passwordType} name="password"
                                     value={password} onChange={(e) => handleInputChange(e)} id="password"
                                     required/>
                                <i onClick={togglePassword} style={{
                                                      position: "absolute",
                                                      top: "28%",
                                                      right: "4%"
                                                    }} className={`fa ${passwordType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>

                                  </div>
                            </div>

                            <Link to="/auth/pass" className="forgot" href="">Forgotten Password?</Link>
                            <div className="next-btn">
                              <button type="button" onClick={handleSubmit} className="btn btn-success">Login
                              </button>
                            </div>
                          </form>
                      }
                      {con =="true" ?
                          <center>
                            <i onClick={pick} style={{
                              width:'100%',
                              fontSize:"xx-large"
                            }} id="number" className="fas fa-fingerprint"></i>
                            <h4><b>Login with Fingerprint</b></h4>
                          </center>:true}
                    </div>
                </div>
              </div>

              <div className="col-md-5">

                <div className="sidebar-slider">
                  <div id="sidebar-slide-2" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="carousel-caption">

                          <img alt="slider" src={gh}/>

                            <span>
								      			about our Safe-lock
								      		</span>

                            <div className="main-heading">
                              Create Safe-lock
                              <br/>
                              & Enjoy 10% Interest
                            </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-caption">

                          <img alt="slider" src={gh}/>

                            <span>
								      			about our Safe-lock
								      		</span>

                            <div className="main-heading">
                              Create Safe-lock
                              <br/>
                              & Enjoy 10% Interest
                            </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-caption">

                          <img alt="slider" src={gh}/>

                            <span>
								      			about our Safe-lock
								      		</span>

                            <div className="main-heading">
                              Create Safe-lock
                              <br/>
                              & Enjoy 10% Interest
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className="carousel-indicators">

                      <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="0" className="active"
                              aria-current="true" aria-label="Slide 1"></button>

                      <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="1"
                              aria-label="Slide 2"></button>

                      <button type="button" data-bs-target="#sidebar-slide-2" data-bs-slide-to="2"
                              aria-label="Slide 3"></button>
                    </div>
                  </div>
                  {/*<div className="bg-shape">*/}
                  {/*  <img alt="slider" src={gh}/>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
      </div>



      {/*<div className="container">*/}
      {/*  <div className="screen">*/}
      {/*    <div className="screen__content">*/}

      {/*      {loading ? <div className="loader-container">*/}
      {/*            <div className="spinner"/>*/}
      {/*          </div> :*/}

      {/*          <form className="login">*/}

      {/*            <div className="login__field">*/}
      {/*              <i className="login__icon fas fa-user"></i>*/}
      {/*              <input type="text" className="login__input" placeholder="User name "*/}
      {/*                     value={username} onChange={(e) => handleInputChange(e)} id="username"*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*            <div style={{*/}
      {/*              width: "auto",*/}
      {/*              position: "relative",*/}
      {/*              box_sizing: "border-box"*/}
      {/*            }}>*/}
      {/*              <div className="login__field">*/}
      {/*                <i className="login__icon fas fa-lock"></i>*/}
      {/*                <input type={passwordType} className="login__input" placeholder="Password"*/}
      {/*                       value={password} onChange={(e) => handleInputChange(e)} id="password" name="password"*/}
      {/*                />*/}
      {/*                <i onClick={togglePassword}  className={`fa ${passwordType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>*/}

      {/*              </div>*/}
      {/*            </div>*/}
      {/*            <ToastContainer/>*/}

      {/*            <button className="button login__submit" onClick={handleSubmit}>*/}
      {/*              <span className="button__text">Log In Now</span>*/}
      {/*              <i className="button__icon fas fa-chevron-right"></i>*/}
      {/*            </button>*/}
      {/*            <Link to="/auth/register" className="text-blueGray-200"*/}
      {/*            style={{*/}
      {/*              color: "black",*/}
      {/*            }}*/}
      {/*            >*/}
      {/*              <h4><b>Create new account</b></h4>*/}
      {/*                        </Link>*/}
      {/*          </form>*/}
      {/*      }*/}
      {/*      <div className="social-login">*/}
      {/*        <img*/}
      {/*            alt="..."*/}
      {/*            width="150"*/}
      {/*            src={gh}*/}
      {/*        />*/}
      {/*        /!*<h3>log in via</h3>*!/*/}
      {/*        /!*<div className="social-icons">*!/*/}
      {/*        /!*  <a href="#" className="social-login__icon fab fa-instagram"></a>*!/*/}
      {/*        /!*  <a href="#" className="social-login__icon fab fa-facebook"></a>*!/*/}
      {/*        /!*  <a href="#" className="social-login__icon fab fa-twitter"></a>*!/*/}
      {/*        /!*</div>*!/*/}

      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="screen__background">*/}
      {/*      <span className="screen__background__shape screen__background__shape4"></span>*/}
      {/*      <span className="screen__background__shape screen__background__shape3"></span>*/}
      {/*      <span className="screen__background__shape screen__background__shape2"></span>*/}
      {/*      <span className="screen__background__shape screen__background__shape1"></span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

    </>
  );
}
