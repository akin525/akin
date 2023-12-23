

import React, {useState} from "react";
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

export default function Dashboard() {
    const baseURL = "https://bills.sammighty.com.ng/api/auth/dashboard";
    const baseURLFUND = "https://api-d.squadco.com/transaction/initiate";
    const baseURL2 = "https://bills.sammighty.com.ng/api/auth/fund";
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
    // const [refid,setrefid] = useState("");
    const [loading, setLoading] = useState(false);
    let token=localStorage.getItem('dataKey');
   const tokenfun="sk_debcbc76a126689ea4780e37f217e5f75bcaf40e";
  const refid="Fund"+Math.floor((Math.random() * 1000000000) + 1);



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

                if (response.data.status ==="0"){
                    window.location='auth/login';
                }
                console.log(response.data.data);
                setName(response.data.data.username);
                setaccount_number(response.data.data.account_number);
                setaccount_number1(response.data.data.account_number1);
                setaccount_name(response.data.data.account_name);
                setaccount_name1(response.data.data.account_name1);
                setuserid(response.data.data.id);
                setemail(response.data.data.email);
                if (response.data.data.bank1==null) {
                    setbank('VFD Microfinance Bank');

                }else {
                    setbank(response.data.data.bank1);
                }

                setMessage(response.data.data.message);

                setLoading(false);
            });



    }, []);

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "amount"){
            setamount(value);
        }
    }

    const handleSubmit  = async () =>  {


        // html: "<h6>Account Number:"+account_number+"</h6><br><h6>Account Name:</h6>"+account_name+"</h6>",
                if (amount <= 3500) {
                    Swal.fire({
                        title: "Fund With",
                        text:"Account Number:"+account_number+" || Account Name:"+account_name+" || Bank Name:"+bank,
                        icon: "success",
                        confirmButtonText: "OK",
                    })


                }else {
                    Swal.fire({
                        title: "Fund With",
                        text:"Account Number:"+account_number+" || Account Name:"+account_name+" || Bank Name:"+bank,
                        icon: "success",
                        confirmButtonText: "OK",
                    })

                }
    }

    const handleSubmit1  = async () =>  {
        try {
        // html: "<h6>Account Number:"+account_number+"</h6><br><h6>Account Name:</h6>"+account_name+"</h6>",

                    setLoading(true);


                        axios
                            .post(baseURLFUND, {

                                amount:amount * 100,
                                email:email,
                                currency:"NGN",
                                initiate_type: "inline",
                                transaction_ref:refid,
                                callback_url:"https://savebills.com.ng/verify",
                            },{
                                headers:{
                                    'Authorization': 'Bearer sk_61de77ec58f5d4494f922d7be279917c3dea3149',
                                    'Content-Type': 'application/json'
                                },

                            }).then(response => {
                            if (response.data.status == 200) {
                                setError(response.data.message);

                                    window.location.href= response.data.data.checkout_url;
                                // Swal.fire({
                                //     title: "error",
                                //     text:response.data.data.checkout_url,
                                //     icon: "success",
                                //     confirmButtonText: "OK",
                                // })

                            }else{
                                setLoading(false);

                                Swal.fire({
                                    title: "error",
                                    text:response.data.data,
                                    icon: "error",
                                    confirmButtonText: "OK",
                                })
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
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>Fund Wallet</h2>
                        </div>
                    </div>
                </div>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
                <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h2 className="text-white text-xl font-semibold">Fund Wallet With Transfer</h2>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex-auto subscribe">
                    {/* Chart */}

                        <div className="relative h-350-px">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Funding Method
                                    </h6>
                                    <div className="flex flex-wrap">
                                        <div className="w-full ">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={amount} onChange={(e) => handleInputChange(e)} id="amount"
                                                    required/>

                                            </div>
                                        </div>
                                    </div>
                                    <button type="button" onClick={handleSubmit}
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 m-2">
                                        Fund With transfer
                                    </button>
                                    <button type="button" onClick={handleSubmit1}
                                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                                        Fund With card
                                    </button>
                                    {/*<button type="button" onClick={handleSubmit1}*/}
                                    {/*        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">*/}
                                    {/*    Fund With Card*/}
                                    {/*</button>*/}
                                    <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                </form>
                            </div>

                        </div>
                    {loading === true ? ( <div className="overlay">
                        <div className="loader"></div>
                    </div> ):null}
                </div>
            </div>
            </div>

        </>
    );
}
