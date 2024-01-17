

import React, {useEffect, useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import ig from 'images.png';
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardStats from "../../components/Cards/CardStats";

export default function Verifyf() {
    const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
    const baseURLFUND = "https://sandbox-api-d.squadco.com/transaction/initiate";
    const baseURL2 = "https://server.savebills.com.ng/api/auth/verifyfund";
    const [account_number, setaccount_number] = useState("0");
    const [account_number1, setaccount_number1] = useState("0");
    const [account_name, setaccount_name] = useState("0");
    const [bank, setbank] = useState("");
    const [account_name1, setaccount_name1] = useState("0");
    const [userid, setuserid] = useState("");
    const [amount, setamount] = useState("");
    const [email, setemail] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [refid,setrefid] = useState("");
    const [loading, setLoading] = useState(false);
    let token=localStorage.getItem('dataKey');
    const tokenfun="sandbox_sk_1e60156e0e029ec62daa87e91f5a3b0f1a0923246bec";
    // useEffect(() => {
    //     const searchParams = new URLSearchParams(window.location.search);
    //     const refidValue = searchParams.get('reference');
    //     setrefid(refidValue);
    // }, []);


    React.useEffect(() => {
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

                console.log(response.data);
                setName(response.data.username);
                setuserid(response.data.id);
                setemail(response.data.email);

                setLoading(false);
            });




    }, []);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "refid"){
            setrefid(value);
        }
    }


    const handleSubmit  = async () =>  {
        try {
            // html: "<h6>Account Number:"+account_number+"</h6><br><h6>Account Name:</h6>"+account_name+"</h6>",

            setLoading(true);


            axios
                .post(baseURL2, {
                    userId:userid,
                    refid:refid,

                })
                .then(response => {
                    setLoading(false);
                    setError("");
                    setMessage(response);

                    if (response.data.status ==="0"){

                        console.log(response);
                        Swal.fire({
                            title: "error",
                            text:response.data.message,
                            icon: "error",
                            confirmButtonText: "OK",
                        })
                    }else {
                        Swal.fire({
                            title: "Success",
                            text:response.data.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        })

                        // window.location.href='/dashboard';
                    }

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
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>Verify Fund</h2>
                        </div>
                    </div>
                </div>
                <div className="subscribe">
                    <div className="alert alert-info alert-dismissible alert-alt fade show text-white">
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="btn-close">
                        </button>
                        <strong className="text-white">Alert!</strong> <hr/><h6 className={'text-white'}>Note that after funding successful always click on this verify
                        fund for ur account to be funded automatically else your account won't be funded. Thanks.</h6>
                    </div>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Refer name"

                        value={refid} onChange={(e) => handleInputChange(e)} id="refid"
                    />

                    <button  type={'button'}  className="submit-btn" onClick={handleSubmit}>Verify Fund</button>

                </div>


                {/*<button type={'button'} className={'btn btn-success'} onClick={handleSubmit}>Verify Fund</button>*/}
                {loading === true ? ( <div className="overlay">
                    <div className="loader"></div>
                </div> ):null}
            </div>

        </>
    );
}
