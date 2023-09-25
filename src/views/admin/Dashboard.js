

import React, {useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

import ig from 'ba1.png';
import spin1 from 'spin.png';
import goo from 'google.png';
import sp from 'sp.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";
import gh from "../../lg.png";
import dev from 'deve.png';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const refer1="http://savebills.com.ng/auth/register?refer=";


    const [totaldeposit, setTotaldeposit] = useState("0");
    const [totalbill, setTotalbill] = useState("0");
    const [allock, setallock] = useState("0");
    const [email, setEmail] = useState("");
    const [balance, setBalance] = useState("0");
    const [bonus, setbonus] = useState("0");
    const [account_number, setaccount_number] = useState("0");
    const [account_name, setaccount_name] = useState("0");
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
                setusername(response.data.username);
                setName(response.data.username);
                setEmail(response.data.email);
                setBalance(response.data.wallet);
                setTotalbill(response.data.totalbill);
                setTotaldeposit(response.data.totaldeposit);
                setall(response.data.bills);
                setallock(response.data.allock);
                setaccount_number(response.data.account_number);
                setaccount_name(response.data.account_name);
                setbonus(response.data.referbonus);
                setnoti(response.data.noti);
                setapikey(response.data.apikey);

                setMessage(response.data.message);


                setPost(response.data);
                setLoading(false);
            });

    }, []);
    const profile= ()=>{
        try {
            {
                if(token && token.login)
                {
                    this.setState({login:true, token:token})
                }else {
                    window.location='login.js';
                }
            }

        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occured. Check your input and try again");
        }

    }
    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        /* Alert the copied text */
        alert(copyText.value);
    }
    const a= {
        margin: 5,

    };
    const ul={
        listStyleType:'square',
    };
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

                    <div className="alert alert-info alert-dismissible alert-alt fade show text-white">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                        </button>
                        <strong className="text-white">Alert!</strong> {noti}.
                    </div>
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
                    <div className="card bg-primary">
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
                    </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                    <div className="card bg-secondary">
                    <div className="card-header border-0">
                    <h4 className="heading mb-0 text-white">Purchase & Safelock 😎</h4>
                    </div>
                    <div className="card-body">
                    <div className="d-flex justify-content-between">
                    <div className="sales-bx ">
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
                    </div>
                    </div>


                    <div className="col-xl-12">
                    <div className="card bg-secondary analytics-card">
                    <div className="card-body mt-4 pb-1">
                    <div className="row align-items-center">
                    <div className="col-xl-2">
                    <h3 className="mb-3 text-white">Solution</h3>
                    <p className="mb-0  pb-4 text-white">Validate all <br/>pending transaction</p>
                    </div>
                    <div className="col-xl-10">
                    <div className="row">
                        <div className="col-xl-2 col-sm-4 col-6">
                            <div className="card ov-card">
                                <div className="card-body">
                                    <Link to="/airtime" >
                                        <div className="ana-box">
                                            <div className="ic-n-bx">
                                                <div className="icon-box bg-primary ">
                                                    <i className="fa fa-brands fa-mobile-phone text-white"></i>
                                                </div>
                                            </div>
                                            <div className="anta-data">
                                                <h5>Airtime</h5>
                                                <span>Purchase</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    <div className="col-xl-2 col-sm-4 col-6">
                    <div className="card ov-card">
                    <div className="card-body">
                    <Link to="/data">
                    <div className="ana-box">
                    <div className="ic-n-bx">
                    <div className="icon-box bg-primary ">
                    <i className="fa fa-book text-white"></i>
                    </div>
                    </div>
                    <div className="anta-data">
                    <h5>Data</h5>
                    <span>Buy Data</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-2 col-sm-4 col-6">
                    <div className="card ov-card">
                    <div className="card-body">
                    <Link to="/fund">
                    <div className="ana-box">
                    <div className="ic-n-bx">
                    <div className="icon-box bg-primary">
                    <i className="fa fa-brands fa-money text-white"></i>
                    </div>
                    </div>
                    <div className="anta-data">
                    <h5>Fund</h5>
                    <span>wallet</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-2 col-sm-4 col-6">
                    <div className="card ov-card">
                    <div className="card-body">
                    <Link to="/tv">
                    <div className="ana-box">
                    <div className="ic-n-bx">
                    <div className="icon-box bg-primary">
                    <i className="fa fa-brands fa-amazon text-white"></i>
                    </div>
                    </div>
                    <div className="anta-data">
                    <h5>Cable Tv</h5>
                    <span>Subscription</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-2 col-sm-4 col-6">
                    <div className="card ov-card">
                    <div className="card-body">
                    <Link to="/upgrade" href="{{url('verifybill')}}">
                    <div className="ana-box">
                    <div className="ic-n-bx">
                    <div className="icon-box bg-primary">
                    <i className=" fa fa-brands fa-bookmark text-white"></i>
                    </div>
                    </div>
                    <div className="anta-data">
                    <h5>Reseller</h5>
                    <span>Upgrade</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                    </div>
                    </div>
                    <div className="col-xl-2 col-sm-4 col-6">
                    <div className="card ov-card">
                    <div className="card-body">
                    <Link to="/elect" >
                    <div className="ana-box">
                    <div className="ic-n-bx">
                    <div className="icon-box bg-primary ">
                    <i className="fa fa-brands fa-money text-white"></i>
                    </div>
                    </div>
                    <div className="anta-data">
                    <h5>Electricity</h5>
                    <span>Purchase</span>
                    </div>
                    </div>
                    </Link>
                    </div>
                    </div>
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
