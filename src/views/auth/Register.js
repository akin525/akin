import React, {useState, useEffect} from "react";
import axios from "axios";
import swal from "sweetalert";
import gh from 'lg.png'
import {Link} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";


export default function Register() {

  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [number, setnumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [password,setPassword] = useState("");
  const [isloading, setisloading]=useState(false);
  const [confirmPassword,setConfirmPassword] = useState("");
  const baseURL ="https://server.savebills.com.ng/api/auth/signup";
  // const baseURL ="https://server.savebills.com.ng/api/auth/signup";
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setloading]=useState(false);

  const handlePasswordChange =(evnt)=>{
    setPasswordInput(evnt.target.value);
  }

    const [refer, setRefer] = useState(null);

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const referValue = searchParams.get('refer');
      setRefer(referValue);
    }, []);

  const togglePassword =()=>{
    if(passwordType==="password")
    {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
console.log(baseURL);
    const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "name"){
      setname(value);
    }
    if(id === "username"){
      setusername(value);
    }
    if(id === "number"){
      setnumber(value);
    }
    if(id === "email"){
      setEmail(value);
    }
    if(id === "gender"){
      setgender(value);
    }
      if(id === "address"){
        setaddress(value);
      }if(id === "refer"){
        setRefer(value);
      }
      if(id === "dob"){
        setdob(value);
      }
    if(id === "password"){
      setPassword(value);
    }
    if(id === "confirmPassword"){
      setConfirmPassword(value);
    }


  }
  const btns = document.querySelectorAll('button');
  btns.forEach((items)=>{
    items.addEventListener('click',(evt)=>{
      evt.target.classList.add('activeLoading');
    })
  })

  const handleSubmit  = async () =>  {
    // console.log(name,username,email,number,password,confirmPassword);
    setisloading(true);

    setloading(true);

    try {
      axios
          .post(baseURL, {
            username:username,
            name:name,
            phone: number,
            email:email,
            password:password,
            address:address,
            gender:gender,
            dob:dob,
            role: ["moderator", "user"],
            refer:refer,
          })
          .then(response => {
            setError("");
            setMessage(response);
            setisloading(false);
            setloading(false);


            if (response.data.status === "0") {
              setError(response.data.message);
              // swal({
              //   title: "Ooops",
              //   text: response.data.message,
              //   icon: "error",
              //   confirmButtonText: "OK",
              // })
              toast.error(response.data.message, {
                position: "top-center",
                autoClose: 3000, // Time in milliseconds, or false to disable autoclose
              });


            }else{
              // setMessage(response.data.message);
              // swal({
              //   title: "Success",
              //   text: response.data.message,
              //   icon: "success",
              //   confirmButtonText: "OK",
              // }).then(function () {
              //   // Redirect the user
              //   window.location.href = "/dashboard";
              // });

              toast.success(response.data.message, {
                position: "center",
                autoClose: 3000, // Time in milliseconds, or false to disable autoclose
              });
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
                            Sign Up
                          </button>

                          <Link to="/auth/login" className="nav-link">
                            Login
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="car-tab" role="tabpanel"
                         aria-labelledby="car-insurance-tab" tabIndex="0">
                      {loading ? <div className="overlay">
                            <div className="loader"></div>
                          </div> :
                          <form className="entrance_animation">

                            <div className="main-heading">
                              Buy Airtime/Data
                              <br/>
                              Pay Bills
                            </div>

                            <br/>
                            <ToastContainer/>

                            <div>
                              <label className="label-text">Name</label>
                              <input className="form_input" type="text" name="name" placeholder="Full Name"
                                     value={name} onChange={(e) => handleInputChange(e)} id="name"

                                     required/>
                            </div>
                            <div className="row">
                              <div className="col-md-6 tab-100">
                                <label className="label-text">Username</label>
                                <input className="form_input" type="text" name="username" placeholder="Username"
                                       value={username} onChange={(e) => handleInputChange(e)} id="username"

                                />
                              </div>
                              <div className="col-md-6 tab-100">
                                <label className="label-text">Email</label>
                                <input className="form_input" type="text"  name="email"
                                       placeholder="Name@example.com"
                                       value={email} onChange={(e) => handleInputChange(e)} id="email"
                                       required/>
                              </div>
                              <div className="col-md-6 tab-100">
                                <label className="label-text">Phone Number</label>
                                <input className="form_input" type="number" name="phone" placeholder="081"
                                value={number} onChange={(e)=>handleInputChange(e)} id="number"
                                />
                              </div>
                              <div className="col-md-6 tab-100">
                                <label className="label-text">Gender</label>
                                <select className="form_select" name="gender"
                                        value={gender} onChange={(e) => handleInputChange(e)} id="gender"
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                              </div>
                            </div>

                            <div className="multi-select">
                              <div className="row">
                                <div className="col-md-6 tab-100">
                                  <label className="label-text">Addres</label>
                                  <input className="form_input" type="text" name="address" placeholder="Address"
                                         value={address} onChange={(e)=>handleInputChange(e)} id="address"
                                         required/>
                                </div>
                                <div className="col-md-6 tab-100">
                                  <label className="label-text">Date Of Birth</label>
                                  <input className="form_input" type="date" name="dob" placeholder="Nemar"
                                         value={dob} onChange={(e)=>handleInputChange(e)} id="dob"
                                         required/>
                                </div>
                                <div>
                                  <label className="label-text">Password</label>
                                  <input className="form_input" type="password" name="password"
                                         value={password} onChange={(e)=>handleInputChange(e)} id="password"
                                         required/>
                                </div>
                              </div>
                              <div className="multi-select-inner"></div>
                            </div>

                            <div className="next-btn">
                              <button type="button" onClick={handleSubmit} className="btn btn-success">Sign Up</button>
                            </div>
                          </form>
                      }
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
                {/*  <div className="bg-shape">*/}
                {/*    <img alt="slider" src="{{asset(" images/bn.jpeg")}}">*/}
                {/*  </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
        </div>


      {/*  <div className="container mx-auto px-4 h-full">*/}
      {/*  <div className="flex content-center items-center justify-center h-full">*/}
      {/*    <div className="w-full lg:w-6/12 px-4">*/}
      {/*      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">*/}
      {/*        <div className="rounded-t mb-0 px-6 py-6">*/}
      {/*          <div className="text-center mb-3">*/}
      {/*            <h6 className="text-blueGray-500 text-sm font-bold">*/}
      {/*              Sign up Here*/}
      {/*            </h6>*/}
      {/*          </div>*/}
      {/*          <div className="btn-wrapper text-center">*/}
      {/*            <button*/}
      {/*                className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
      {/*                type="button"*/}
      {/*            >*/}
      {/*              <img*/}
      {/*                  alt="..."*/}
      {/*                  width="200"*/}
      {/*                  src={gh}*/}
      {/*              />*/}
      {/*            </button>*/}
      {/*          </div>*/}
      {/*          <hr className="mt-6 border-b-1 border-blueGray-300" />*/}
      {/*        </div>*/}
      {/*        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">*/}
      {/*          /!*<div className="text-blueGray-400 text-center mb-3 font-bold">*!/*/}
      {/*          /!*  <small>Or sign up with credentials   {process.env.SAM}</small>*!/*/}
      {/*          /!*</div>*!/*/}
      {/*          {loading ? <div className="loader-container">*/}
      {/*                <div className="spinner"/>*/}
      {/*              </div> :*/}
      {/*              <form>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Name*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="text"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="Name"*/}
      {/*                      value={name} onChange={(e) => handleInputChange(e)} id="name"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Username*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="text"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="Username"*/}

      {/*                      value={username} onChange={(e) => handleInputChange(e)} id="username"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Referral*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="text"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="Refer name"*/}

      {/*                      value={refer} onChange={(e) => handleInputChange(e)} id="refer" readOnly*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Phone Number*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="number"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="phone-number"*/}
      {/*                      value={number} onChange={(e) => handleInputChange(e)} id="number"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Date of birth*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="date"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      value={dob} onChange={(e) => handleInputChange(e)} id="dob"*/}
      {/*                  />*/}
      {/*                </div>*/}

      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Email*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="email"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="Email"*/}
      {/*                      value={email} onChange={(e) => handleInputChange(e)} id="email"*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Gender*/}
      {/*                  </label>*/}
      {/*                  <select name="network"*/}
      {/*                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                          value={gender} onChange={(e) => handleInputChange(e)} id="gender"*/}
      {/*                          required="">*/}

      {/*                    <option>Select Gender</option>*/}
      {/*                    <option value="Male">MALE</option>*/}
      {/*                    <option value="Female">FEMALE</option>*/}

      {/*                  </select>*/}
      {/*                </div>*/}
      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Address*/}
      {/*                  </label>*/}
      {/*                  <input*/}
      {/*                      type="text"*/}
      {/*                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                      placeholder="Address"*/}
      {/*                      value={address} onChange={(e) => handleInputChange(e)} id="address"*/}
      {/*                  />*/}
      {/*                </div>*/}

      {/*                <div className="relative w-full mb-3">*/}
      {/*                  <label*/}
      {/*                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                      htmlFor="grid-password"*/}
      {/*                  >*/}
      {/*                    Password*/}
      {/*                  </label>*/}

      {/*                  <div style={{*/}
      {/*                    width: "auto",*/}
      {/*                    position: "relative",*/}
      {/*                    box_sizing: "border-box"*/}
      {/*                  }}>*/}
      {/*                    <input*/}
      {/*                        type={passwordType}*/}
      {/*                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                        placeholder="Password"*/}
      {/*                        value={password} onChange={(e) => handleInputChange(e)} id="password" name="password"*/}
      {/*                    />*/}
      {/*                    <i onClick={togglePassword} style={{*/}
      {/*                      position: "absolute",*/}
      {/*                      top: "28%",*/}
      {/*                      right: "4%"*/}
      {/*                    }} className={`fa ${passwordType === "password" ? "fa-eye-slash" : "fa-eye"}`}></i>*/}

      {/*                  </div>*/}
      {/*                </div>*/}


      {/*                <div>*/}
      {/*                  <label className="inline-flex items-center cursor-pointer">*/}
      {/*                    <input*/}
      {/*                        id="customCheckLogin"*/}
      {/*                        type="checkbox"*/}
      {/*                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"*/}
      {/*                    />*/}
      {/*                    <span className="ml-2 text-sm font-semibold text-blueGray-600">*/}
      {/*                  I agree with the{" "}*/}
      {/*                      <a*/}
      {/*                          href="#pablo"*/}
      {/*                          className="text-lightBlue-500"*/}
      {/*                          onClick={(e) => e.preventDefault()}*/}
      {/*                      >*/}
      {/*                    Privacy Policy*/}
      {/*                  </a>*/}
      {/*                </span>*/}
      {/*                  </label>*/}
      {/*                </div>*/}

      {/*                <div className="text-center mt-6">*/}
      {/*                  <button*/}
      {/*                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"*/}
      {/*                      type="button" onClick={isloading ? null : handleSubmit}*/}
      {/*                  >*/}
      {/*                    Create Account<span className="load loading"></span>*/}
      {/*                  </button>*/}
      {/*                </div>*/}
      {/*              </form>*/}
      {/*          }*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="flex flex-wrap mt-6 relative">*/}
      {/*        <div className="w-1/2">*/}
      {/*          <a*/}
      {/*              href="#"*/}
      {/*              onClick={(e) => e.preventDefault()}*/}
      {/*              className="text-blueGray-200"*/}
      {/*          >*/}
      {/*            <small>Home</small>*/}
      {/*          </a>*/}
      {/*        </div>*/}
      {/*        <div className="w-1/2 text-right">*/}
      {/*          <Link to="/auth/login" className="text-blueGray-200">*/}
      {/*            <small>Already Signup</small>*/}
      {/*          </Link>*/}
      {/*        </div>*/}
      {/*      </div>*/}

      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
}
