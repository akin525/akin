/*eslint-disable*/

import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import 'asset/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'asset/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css';
import 'asset/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css';
import 'css/bootstrap.min.css';
import 'style1.css';
import 'css/responsive.css';
import 'css/color_2.css';
import 'css/bootstrap-select.css';
import 'css/perfect-scrollbar.css';
import 'css/custom.css';
import 'hp/bootstrap.min.css';
import 'hp/main.css';
import gh from 'lg.png'
import playstore from 'images/dd.png';
import ReachargeDropdown from "../Dropdowns/ReachargeDropdown";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const baseURL = "https://server.savebills.com.ng/api/auth/dashboard";
  const baseURL1 = "https://server.savebills.com.ng/api/auth/signout";


  const [totaldeposit, setTotaldeposit] = useState("0");
  const [totalbill, setTotalbill] = useState("0");
  const [username, setusername] = useState("");
  const [balance, setBalance] = useState("0");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [post, setPost] = React.useState(null);
  const [all, setall] = React.useState([]);
  const [apikey, setapikey] = React.useState();
  let token = localStorage.getItem('dataKey');
  const we = {
    position: "fixed",
    width: "60px",
    height: "60px",
    bottom: "40px",
    right: "40px",
    backgroundColor: "#25d366",
    color: "#FFF",
    borderRadius: "50px",
    textAlign: "center",
    fontSize: "30px",
    boxShadow: "2px 2px 3px #999",
    zIndex: "100",
  }
  const [sidebarActive, setSidebarActive] = useState(false);
  const isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed


  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleMenuClick = () => {
    if (isMobile) {
      console.log('Mobile menu clicked'); // Add this line for debugging
      // If it's in mobile view, close the sidebar
      setSidebarActive(false);
    }
  };
  const fl = {
    marginTop: "16px",
  }

  function myCallback(data) {
    console.log("I am in callback")
    console.log(JSON.stringify(data));
  }

  function contactCallback(data) {
    console.log("I am in callback")
    console.log(JSON.stringify(data));
    // document.getElementById('anyme'.value=data.data;
  }
  function pick() {
    window.web2app.advert.showinterstitial(myCallback)
  }
  React.useEffect(() => {
    try {
      window.web2app.confirmlogin.islogin(myCallback);
    } catch (e) {
      console.log("Can not excecute for now");
    }
    axios
      .get(baseURL, {
        // username:useCookies('username'),
        headers: {
          Authorization: `Bearer ${token}`
        },

      })
      .then(response => {
        setError("");
        setMessage(response);

        if (response.data.status === "0") {
          window.location = 'login';
        }
        setusername(response.data.username);
        setName(response.data.username);
        setBalance(response.data.wallet);
        setName(response.data.name);
        setTotalbill(response.data.totalbill);
        setTotaldeposit(response.data.totaldeposit);
        setall(response.data.bills);
        setapikey(response.data.apikey);
        console.log(apikey);
        setMessage(response.data.message);


        setPost(response.data);
      });

  }, []);

  const handleSubmit = async () => {

    try {
      axios
        .post(baseURL1)
        .then(response => {
          // setError("");
          // setMessage(response);

          if (response.data.status === "0") {
            // setError(response.data.message);


          } else {
            // setMessage(response.data.message);
            localStorage.removeItem('dataKey');
            // const [cookies, setCookie] = useCookies(response.data.username);
            swal({
              title: "Success",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
            }).then(function () {
              // Redirect the user
              window.location.href = "/";
            });
          }
          // setPost(response.data);
        });
    } catch (e) {
      console.log(e);
      console.log("e.data");
      console.log(e.data);
      // setError("An error occured. Check your input and try again");
    }
  }

  return (
    <>
      <div className="dashboard dashboard_1">

        <div className="full_container">
          <div className="inner_container">

            <nav id="sidebar" className={sidebarActive ? 'active' : ''}>
              <div className="sidebar_blog_1">

                <div className="sidebar-header">
                  <div className="logo_section">
                    <a href="{{route('dashboard')}}"><img className="logo_icon img-responsive" src={gh} alt="#" /></a>
                  </div>
                </div>
                <div className="sidebar_user_info">
                  <div className="icon_setting"></div>
                  <div className="user_profle_side">
                    <div className="user_img"><img className="img-responsive" src={gh} alt="#" /></div>
                    <div className="user_info">
                      {/*{isMobile === true ? (*/}
                      {/*    <button type="button" onClick={handleMenuClick}*/}
                      {/*            className="btn btn-primary  ">*/}
                      {/*      <i className="fas fa-times"></i></button>*/}
                      {/*) : null}*/}
                      <h6>{username}</h6>

                      <p><span className="online_animation"></span> Online</p>
                    </div>
                  </div>

                </div>

              </div>
              <div className="sidebar_blog_2">
                <h4>
                  <a href="https://play.google.com/store/apps/details?id=com.a5starcompany.savebills" className="font-weight-bold text-center">
                    <img width="150" src={playstore} alt="#" />

                  </a>
                </h4>
                <ul className="list-unstyled components">
                  <li className="active" >
                    <Link onClick={handleMenuClick} to="/dashboard" ><i className="fa fa-dashboard white_color" ></i> <span>Dashboard</span></Link>
                  </li>

                  <li className="active">
                    <Link to="/fund" onClick={handleMenuClick} ><i className="fa fa-money white_color"></i> <span>Fund Wallet</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/verifyid" onClick={handleMenuClick} ><i className="fa fa-money white_color"></i> <span>Verify Fund</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/settings" onClick={handleMenuClick}  ><i className="fa fa-user white_color"></i> <span>Profile</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/upgrade" onClick={handleMenuClick} ><i className="fa fa-bookmark-o white_color"></i> <span>Upgrade</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/data" onClick={handleMenuClick}><i className="fa fa-mobile white_color"></i> <span>Buy Data</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/airtime" onClick={handleMenuClick} ><i className="fa fa-telegram white_color"></i> <span>Buy Airtime</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/tv" onClick={handleMenuClick}><i className="fa fa-television white_color"></i> <span>Cable Subscription</span></Link>
                  </li>
                  <li className="active">
                    <Link to="/elect" onClick={handleMenuClick} ><i className="fa fa-lightbulb-o white_color"></i> <span>Electricity</span></Link>
                  </li>
                  <li>
                    <Link to="/purchase" onClick={handleMenuClick}><i className="fa fa-sticky-note "></i> <span>Bills Invoice</span></Link>
                  </li>
                  <li>
                    <Link to="/deposit" onClick={handleMenuClick}><i className="fa fa-money"></i> <span>Deposit</span></Link>
                  </li>
                  <li>
                    <Link to="/createlock" onClick={handleMenuClick}><i className="fa fa-lock "></i> <span>Save Money</span></Link>
                  </li>
                  <li>
                    <Link to="/addlock" onClick={handleMenuClick}><i className="fa fa-lock "></i> <span>Add Savings</span></Link>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="topbar">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="full">
                  <button type="button" className="sidebar_toggle"
                    onClick={toggleSidebar}>
                    <i className="fa fa-bars"></i></button>



                  <div className="logo_section m-1">
                    <a href="{{ route('dashboard') }}"><img class="img-responsive" src={gh} alt="#" /></a>
                  </div>
                  <br />
                </div>

              </nav>
            </div>
            <a href="https://wa.me/2349076015317" style={we} target="_blank">
              <i className="text-white fas fa-phone" style={fl}></i>
            </a>

          </div>
        </div>
      </div>




    </>
  );
}
