

import React, {useState} from "react";
import axios from "axios";
import swal from "sweetalert";
import CardSettings from "../../components/Cards/CardSettings";
import CardProfile from "../../components/Cards/CardProfile";
import gh from "../../lg.png";
import Swal from 'sweetalert2';
import {ToastContainer} from "react-toastify";
import mtn from "../../mn.jpg";
import glo from "../../go.jpg";
import airtel from "../../ar.png";
import mob from "../../9b.jpg";
import { validatePhoneNumberAsync } from "nigeria-phone-number-validator";


export default function Data() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");

    const [network, setnetwork] = useState("");
    const [productid, setproductid] = useState("");
    const [userid, setuserid] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [refid,setrefid] = useState("");
    const [datass, setdatass]=useState([])
    const [number,setnumber] = useState("");
    const baseURL2 = "https://bills.sammighty.com.ng/api/auth/data";
    const baseURL1 = "https://bills.sammighty.com.ng/api/auth/dashboard";
    const [con, setcon] = useState("");

    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownVisible1, setDropdownVisible1] = useState(false);
    const [resultnumber, setresultnumber] = useState("");

    const options = [
        { value: 'mtn-data', label: 'MTN ' , imageSrc: mtn },
        { value: 'glo-data', label: 'GLO', imageSrc: glo },
        { value: 'airtel-data', label: 'AIRTEL', imageSrc: airtel },
        { value: 'etisalat-data', label: '9MOBILE', imageSrc: mob },
    ];

    const handleOptionSelect = (option) => {
        setSelectedOption(datass.value);
        setnetwork(option.value);
        setDropdownVisible(false);
        handledata(option.value);

    };
    const handleOptionSelect1 = (option) => {
        setSelectedOption1(option.value);
        setDropdownVisible1(false);
    };
    const [loading, setloading]=useState(false);
    function myCallback(data) {
        setcon(JSON.stringify(data.success));
    }

    function contactCallback(data) {
        console.log("I am in callback")
        console.log(JSON.stringify(data));
        document.getElementById('number').value=data.data;
        setnumber(data.data);
    }
    function pick(){
        window.web2app.selectContact(contactCallback);

    }

    function myNewFunction(sel) {
        // alert(sel.options[sel.selectedIndex].id);
        document.getElementById("po").value = (sel.options[sel.selectedIndex].id);
        document.getElementById("pk").value = (sel.options[sel.selectedIndex].text);
    }

    const baseURL = "https://bills.sammighty.com.ng/api/auth/buydata";
    let token=localStorage.getItem('dataKey');
    const [options1, setOptions1] = useState([]);

    React.useEffect(() => {
        try {
            window.web2app.advert.showbanner(myCallback);


        }catch (e) {
            console.log("Can not excecute for now");
        }
        try {//
            window.web2app.deviceInfo(myCallback);
        }catch (e) {
            console.log("Can not excecute for now");
        }
        setCollapseShow("hidden")
        setrefid("data"+Math.floor((Math.random() * 1000000000) + 1));

        axios
            .get(baseURL1, {
                // username:useCookies('username'),
                headers:{
                    Authorization: `Bearer ${token}`
                },

            })
            .then(response => {
                setError("");
                setMessage(response);
                setuserid(response.data.data.id);
                if (response.data.status ==="0"){
                    window.location='login';
                }
                // console.log(response.data);

            });

    }, [token]);
    function loader(){
        window.web2app.advert.showinterstitial(myCallback);

    }



        const handleSelectOption = () => {
            const selectedOption = datass.find((datab) => datab.id === productid);
            const selectedLabel = selectedOption ? `${selectedOption.plan} -- ${selectedOption.tamount}` : 'Select Dataplan';

            // Use selectedLabel as needed
            console.log(selectedLabel);
        };
    const handledata  = async (selected) =>  {
        setloading(true);


        try {
            axios
                .post(baseURL2, {
                    network:selected,
                } )
                .then(response => {
                    setError("");
                    setloading(false);
                    setdatass(response.data.data.plan);
                    setSelectedOption(datass.value);

                    if (selected == "mtn-data") {
                        const optionsFromServer = response.data.map((item) => ({
                            value: item.id,
                            label: item.plan,
                            imageSrc: mtn, // Replace 'mtn' with the correct image source
                        }));

                        setOptions1(optionsFromServer);
                    }else if (selected == "glo-data"){
                        const optionsFromServer = response.data.map((item) => ({
                            value: item.id,
                            label: item.plan,
                            imageSrc: glo, // Replace 'mtn' with the correct image source
                        }));

                        setOptions1(optionsFromServer);
                    }else if (selected == "airtel-data"){
                        const optionsFromServer = response.data.map((item) => ({
                            value: item.id,
                            label: item.plan,
                            imageSrc: airtel, // Replace 'mtn' with the correct image source
                        }));

                        setOptions1(optionsFromServer);
                    }else if (selected == "etisalat-data"){
                        const optionsFromServer = response.data.map((item) => ({
                            value: item.id,
                            label: item.plan,
                            imageSrc: mob, // Replace 'mtn' with the correct image source
                        }));

                        setOptions1(optionsFromServer);
                    }
                    // setdatass(response.data);

                    if (response.data.status === "0") {
                        setError(response.data.message);



                    }else{
                        setMessage(response.data.message);
                        // const [cookies, setCookie] = useCookies(response.data.username);


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

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "network"){
            setnetwork(value);
        }

        if(id === "number"){
            setnumber(value);
            if (value.length>=11) {

                validatePhoneNumberAsync(value).then((result) => {
                    console.log(result);
                    setresultnumber(result.telco);
                    // { telco: "MTN", isValid: true }
                });
            }
        }
        if(id === "productid"){
            setproductid(value);
            myNewFunction(this);
            setproductid(e.target.value);

        }





    }


    const handleSubmit  = async () =>  {

        try {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to buy ${document.getElementById("productid").options[document.getElementById("productid").selectedIndex].text} on ${document.getElementById("number").value}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    setloading(true);

                    axios
                        .post(baseURL, {

                            userId: userid,
                            id: productid,
                            number: number,
                            refid: refid,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },

                        }).then(response => {
                        setError("");
                        setMessage(response);
                        console.log("response");
                        console.log(response);
                        setloading(false);

                        if (response.data.status === "0") {
                            setError(response.data.message);
                            Swal.fire({
                                title: "Fail",
                                text: response.data.message,
                                icon: "error",
                                confirmButtonText: "OK",
                            })


                        } else {
                            setMessage(response.data.message);
                            Swal.fire({
                                title: "Success",
                                text: response.data.data.message,
                                icon: "success",
                                confirmButtonText: "OK",
                            })
                            loader()

                        }
                    });
                }
            });
        }catch (e) {
            console.log(e);
            console.log("e.data");
            console.log(e.data);
            setError("An error occurred. Check your input and try again");
        }
    }


    return (
        <>
            <div className="container-fluid">
                <div className="row column_title">
                    <div className="col-md-12">
                        <div className="page_title">
                            <h2>Buy MobileData</h2>
                        </div>
                    </div>
                </div>
                <ToastContainer/>

                <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Buy Data</h6>
                                <button
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                >
                                    Data Bundle
                                </button>
                            </div>
                        </div>

                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 subscribe">
                                <form>
                                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                        Network Information
                                    </h6>
                                    <div className="flex flex-wrap">
                                        {/*<div className="w-full ">*/}
                                        {/*    <div className="relative w-full mb-3">*/}
                                        {/*        <label*/}
                                        {/*            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
                                        {/*            htmlFor="grid-password"*/}
                                        {/*        >*/}
                                        {/*            Select Network*/}
                                        {/*//         </label>*/}
                                        {/*//         <select name="network"*/}
                                        {/*//                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
                                        {/*//                 value={network} onChange={(e) => handleInputChange(e)}*/}
                                        {/*                id="network"*/}
                                        {/*                required="">*/}

                                        {/*            <option>Select Network</option>*/}
                                        {/*//             <option value={"mtn-data"}>MTN</option>*/}
                                        {/*//             <option value={"glo-data"}>GLO</option>*/}
                                        {/*//             <option value={"etisalat-data"}>9MOBILE</option>*/}
                                        {/*//             <option value={"airtel-data"}>AIRTEL</option>*/}
                                        {/*        </select>*/}
                                        {/*    </div>*/}


                                        {/*</div>*/}
                                <div className="w-full">
                                    <div className="">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Select Network
                                        </label>
                                        <div
                                            className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${dropdownVisible ? 'open' : ''}`}
                                            onClick={() => setDropdownVisible(!dropdownVisible)}
                                        >
                                            <span>{selectedOption ? options.find((opt) => opt.value === selectedOption).label : 'Select your network'}</span>
                                            <i className={`fa fa-chevron-${dropdownVisible ? 'up' : 'down'}`} />
                                        </div>
                                        {dropdownVisible && (
                                            <div className="options">
                                                {options.map((option) => (
                                                    <div
                                                        key={option.value}
                                                        onClick={() => handleOptionSelect(option)}
                                                        className={`option-card ${selectedOption === option.value ? 'selected' : ''}`}
                                                    >
                                                        <img
                                                            src={option.imageSrc}
                                                            alt={option.label}
                                                            className="option-image"
                                                        />
                                                        <span className={'text-success'}>{option.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <input
                                            type="hidden"
                                            id="network"
                                            value={selectedOption}
                                        />
                                    </div>
                                </div>


                                        <div className="w-full ">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Select Dataplan
                                                </label>
                                                <select name="productid"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        value={productid} onChange={(e) => handleInputChange(e)}
                                                        id="productid" required>
                                                    <option>Select Dataplan</option>
                                                    {datass.map((datab) => (
                                                        <option value={datab.id}
                                                                id={datab.tamount}>{datab.plan}--{datab.tamount}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="w-full ">
                                            <div className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    htmlFor="grid-password"
                                                >
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    value={number} onChange={(e) => handleInputChange(e)} id="number"
                                                    required/>
                                                {con =="true" ?
                                                    <i className="fas fa-user" style={{
                                                        position: "absolute",
                                                        top: "60%",
                                                        right: "4%"
                                                    }} onClick={pick}></i>:true}

                                            </div>
                                        </div>
                                        {resultnumber != "" ?
                                            <div className="alert alert-success text-white">
                                                Network Provider: {resultnumber}
                                            </div>:true}
                                    </div>
                                    <button type="button" onClick={handleSubmit}
                                            className="submit-btn">
                                        Buy Now<span className="load loading"></span>
                                    </button>
                                    <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                </form>


                            </div>

                    </div>

                </div>
                <div className="w-full lg:w-4/12 px-4">

                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative">
                                        <img
                                            alt="..."
                                            src={gh}
                                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div className="text-center mt-12">
                                <p>You can use the codes below to check your Data Balance! </p>

                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info"> MTN [SME] *461*4# or
                                            *556#
                                        </li>
                                        <li className="list-group-item list-group-item-success">MTN [CG] *131*4# or
                                            *460*260#
                                        </li>
                                        <li className="list-group-item list-group-item-action">9mobile [Gifting] *228#
                                        </li>
                                        <li className="list-group-item list-group-item-secondary">Airtel *140#</li>
                                        <li className="list-group-item list-group-item-primary">Glo *127*0#</li>
                                    </ul>
                                <br></br>
                                <br></br>


                            </div>

                        </div>
                    </div>

                </div>
            </div>
                {loading === true ? ( <div className="overlay">
                    <div className="loader"></div>
                </div> ):null}
            </div>
        </>
    );
}
