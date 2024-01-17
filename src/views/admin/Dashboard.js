

import React, {useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";


import dev from 'deve.png';
import safe from '../../sf.jpg';
import {toast} from "react-toastify";
import airtime from '../../airtime.svg';
import dat from '../../data.png';
import tv from '../../tv.png';
import ele from '../../ele.png';
import wae from '../../wae.jpeg';
import nec from '../../nec.jpeg';
import give from '../../give.png';
import fund from '../../fund.jpeg';
export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const refer1="https://server.savebills.com.ng/api/auth/register?refer=";
    const regene="https://server.savebills.com.ng/api/auth/newaccount1";


    const [totaldeposit, setTotaldeposit] = useState("0");
    const [totalbill, setTotalbill] = useState("0");
    const [allock, setallock] = useState("0");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("0");
    const [bonus, setbonus] = useState("0");
    const [account_number, setaccount_number] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [bank, setBank] = useState("");
    const [name, setName] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [post, setPost] =useState(null);
    const [all, setall] = useState([]);
    const [noti, setnoti] = useState("");
    const [apikey, setapikey] = useState("");
    const [con, setcon] = useState("");

    const refer = `${refer1}${name}`;
    let token=localStorage.getItem('dataKey');
    function spin(){
        window.web2app.spinandwin({'token': "1380001|5xfpeJUtI3FXLaOR43f32PI7Wjjz2HfYVRoEsUev"})
    }

    function myCallback(data) {
        setcon(JSON.stringify(data.success));

    }
    React.useEffect(() => {
        try {
            window.web2app.deviceInfo(myCallback);

        }catch (e) {
            console.log("Can not excecute for now");
        }
        setLoading(true);
        axios
            .get(baseURL, {
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);

                if (response.data.status ==="0"){
                    window.location='/login';
                }
                // console.log(response.data);
                setusername(response.data.data.username);
                setName(response.data.data.username);
                setEmail(response.data.data.email);
                setBalance(response.data.data.wallet);
                setTotalbill(response.data.data.totalbill);
                setTotaldeposit(response.data.data.totaldeposit);
                setall(response.data.data.bills);
                setallock(response.data.data.allock);
                setaccount_number(response.data.data.account_number);
                setaccount_name(response.data.data.account_name);
                setBank(response.data.data.bank1)
                setbonus(response.data.data.referbonus);
                setnoti(response.data.data.noti);
                setapikey(response.data.data.apikey);

                setMessage(response.data.message);


                setPost(response.data);
                setLoading(false);
            });

    }, []);
    const handleSubmitacct  = async () =>  {
        setLoading(true);
        try {
            axios
                .post(regene, {
                    username:username,
                })
                .then(response => {
                    setError("");
                    setMessage(response);
                  setLoading(false);

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
                        toast.success(response.data.message, {
                            position: "center",
                            autoClose: 3000, // Time in milliseconds, or false to disable autoclose
                        });
                        window.location.href='/dashboard';


                    }
                    // setPost(response.data);
                });
        }catch (e) {
            setError("An error occured. Check your input and try again");
        }
    }

    return (
    <>
        <div >
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>My Dashboard</h2>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="">
                        <div className="col-md-12">

                            <div className="full-height">
                                <div className="">
                                    <div className="card-title"><span
                                        id="greet"><b>Welcome back {username}</b></span>
                                    </div>
                                    <hr></hr>
                                        <p style={{margin:"10px", backgroundImage:"linear-gradient(45deg,#477f9a,#465abdd9)",backgroundColor:"#ff0000",borderRadius:"10px",color:"white",padding:"7px",fontSize:"14px"}}>
                                            <span style={{color:"orange"}}><b>**NEW**</b></span>&nbsp; Own a
                                            savebills.com.ng retailer website and retail all our services; Such as
                                            DATA, Recharge cards printing, AIRTIME and BILLS Payment. <Link
                                            className="w3-btn  w3-border w3-round-large" t0={"/vtu"}
                                            style={{backgroundColor:"white",color:"blue"}}>Click Here</Link></p>

                                </div>
                                <b><b>

                                    <marquee
                                        style={{backgroundColor: "white", color:"#d1026d", padding: "10px", fontSize: "15px"}}> MTN
                                        SME NOW AVAILABLE @ cheap price
                                    </marquee>

                                </b></b></div>
                            <b><b>


                            </b></b></div>

                    </div>
                </div>


                <div className="row">

                    <div className="col-4 col-sm-3 col-lg-3">
                        <Link to="/data">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                                          <span style={{fontSize: "30px"}}>

                                 <img width="50"
                                      src={dat}/>
                             </span>
                                    {/*{{--                            <div class="h6  text-dark">Data</div>--}}*/}
                                    <small>Data</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <Link to="/airtime">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                                         <span style={{fontSize: "30px"}}>

                                 <img width="50"
                                      src={airtime}/>
                             </span>
                                    <small>Airtime</small>
                                    {/*{{--                            <div class="h6  text-dark">Airtime</div>--}}*/}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <Link to="/tv">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                                    <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={tv}/>
                             </span>
                                    <div className="h6 m-2 text-dark">Tv</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <Link to="/elect">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                             <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={ele}/>
                             </span>
                                    <small>Electricity</small>
                                    {/*{{--                            <div class="h6 m-2 text-dark">Electricity</div>--}}*/}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <Link to="/fund">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                             <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={fund}/>
                             </span>
                                    {/*{{--                            <div class="h6 m-2 text-dark">Fund Wallet</div>--}}*/}
                                    <small>Fund Wallet</small>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <a href="#">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                             <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={give}/>
                             </span>
                                    <small>Giveaway</small>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <a href="#">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                             <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={wae}/>
                             </span>
                                    <smalls>Waec</smalls>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-4 col-sm-3 col-lg-3">
                        <a href="#">
                            <div className="card">
                                <div className="card-body p-3 text-center">
                             <span style={{fontSize: "30px"}}>
                                 <img width="50"
                                      src={nec}/>
                             </span>
                                    <small>Neco</small>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>


                {/*<div className="alert alert-info alert-dismissible alert-alt fade show text-white">*/}
                    {/*    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">*/}
                    {/*    </button>*/}
                    {/*    <strong className="text-white">Alert!</strong> {noti}.*/}
                    {/*</div>*/}


                {loading ? <div className="overlay">
                        <div className="loader"></div>
                    </div> :
                    <div className="row">
                    <div className="col-xl-6">
                    <div className="card overflow-hidden">
                    <div className="card-body">
                    <div className="any-card">
                    <div className="c-con m-4">
                    <h4 className="heading mb-0">Welcome Back
                    <strong> {username}!!</strong><img
                    src="#" alt=""/></h4>
                        {apikey ==null ?
                            <Link className={'btn btn-danger '} style={{margin: "5px"}}><b>Starter</b>
                                <i
                                    className="text-white  fas fa-user"></i>
                            </Link>: true}
                        {apikey !=null ?
                            <Link className={'btn btn-danger '} style={{margin: "5px"}}><b>Reseller</b>
                                <i
                                    className="text-white  fas fa-user"></i>
                            </Link>: true}
                        {apikey ==null ?
                            <Link to="/upgrade" className="btn btn-success" style={{fontSize: "13px"}}>Upgrade<i
                                className="text-white  fas fa-user"></i></Link>:true}
                        {apikey !=null ?
                            <button className="btn btn-success" style={{fontSize: "13px"}}>Upgraded! <i
                                className="text-white  fas fa-user"></i></button>:true}
                    </div>

                    <img src={dev} className="harry-img" alt="#"/>

                    </div>
                    </div>
                    </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary" >
                    <div className="card-header border-0">
                    <h4 className="heading mb-0 text-white">Balance & Deposit 😎</h4>
                    </div>
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <div className="sales-bx m-2">
                    <i className="fa fa-money yellow_color" style={{fontSize: "20px"}}></i>
                    <h4>₦{balance.toLocaleString()}</h4>
                    <span>Balance</span>
                    </div>
                    <div className="sales-bx">
                    <i className="fa fa-money blue1_color" style={{fontSize: "20px"}}></i>
                    <h4>₦{totaldeposit.toLocaleString()}</h4>
                    <span>Deposit</span>
                    </div>
                    </div>
                    </div>
                        <Link to="/fund" className="btn btn-success">Fund Wallet</Link>
                    </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary">
                    <div className="card-header border-0">
                    <h4 className="heading mb-0 text-white">Purchase & Safelock 😎</h4>
                    </div>
                    <div className="card-body">
                    <div className="d-flex justify-content-between ">
                    <div className="sales-bx m-2">
                    <i className="fa fa-money yellow_color" style={{fontSize: "20px"}}></i>
                    <h4>₦{totalbill.toLocaleString()}</h4>
                    <span>Bills</span>
                    </div>
                    <div className="sales-bx">
                    <i className="fa fa-lock yellow_color" style={{fontSize: "20px"}}></i>
                    <h4>₦{allock.toLocaleString()}</h4>
                    <span>Safelock</span>
                    </div>
                    </div>
                    </div>
                        {/*<Link to="/verifyid" className="btn btn-success">Verify Fund</Link>*/}

                    </div>
                    </div>

                        <div className="row">
                            <marquee><h4>Please kindly use the new first account details for funding to avoid network delay..Thanks
                             & if your account details is not display in the first box, kindly click on regenerate button so as to fetch details back
                            </h4></marquee>
                        <div className="col-xl-6">
                            <div className="card overflow-hidden">
                                <div className="card-body bg-secondary">
                                    <div className="">
                                        <div className="c-con">
                                            <h6 className="heading mb-0 text-white">New Virtual <strong>Account
                                                1</strong></h6>

                                            <div className="">
                                                {bank == null ?
                                                    <center>
                                                    <button type="button" onClick={handleSubmitacct}  className="btn btn-primary text-center">Regenerate</button>
                                                    </center> :
                                                    <ul style={{listStyleType:"square"}}>
                                                    <li className='text-white'><h5 className='text-white'>
                                                    <b>{account_name}</b></h5></li>
                                                    <li className='text-white'><h5 className='text-white'><b>Account
                                                    No:{account_number}</b></h5></li>
                                                    <li className='text-white'><h5 className='text-white'>
                                                    <b>Bank: {bank} </b></h5></li>
                                                    </ul>
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="card overflow-hidden">
                                <div className="card-body bg-secondary">
                                    <div className="">
                                        <div className="c-con">
                                            <h6 className="heading mb-0 text-white">Virtual <strong>Account
                                                2</strong></h6>

                                            <div className="">
                                                {/*<ul style={{listStyleType:"square"}}>*/}
                                                {/*    <li className='text-white'><h5 className='text-white'>*/}
                                                {/*        <b>{account_name}</b></h5></li>*/}
                                                {/*    <li className='text-white'><h5 className='text-white'><b>Account*/}
                                                {/*        No:{account_number}</b></h5></li>*/}
                                                {/*    <li className='text-white'><h5 className='text-white'>*/}
                                                {/*        <b>Bank: {bank} </b></h5></li>*/}
                                                {/*</ul>*/}
                                                <br/>
                                                <br/>
                                                <center>
                                                <button type="button" className="btn btn-primary text-center">Coming sooon</button>
                                                </center>
                                                <br/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    </>
  );
}
