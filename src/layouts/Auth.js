import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import 'login.css';
import 'auth/assets/css/bootstrap.min.css';
import 'auth/use.fontawesome.com/releases/v6.1.1/css/all.css';
import 'auth/assets/css/style.css';
import 'auth/assets/css/responsive.css';
import 'auth/assets/css/animation.css';
// components
import   'Square.css';

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Pass from "views/auth/pass.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";



export default function Auth() {
  return (
    <>
      {/*<Navbar transparent />*/}
      <main>
        {/*<section className="relative w-full h-full py-40 min-h-screen">*/}
        {/*  <div*/}
        {/*    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"*/}
        {/*    style={{*/}
        {/*      backgroundImage:*/}
        {/*        "url(" + require("assets/img/register_bg_2.png").default + ")",*/}
        {/*    }}*/}
        {/*  ></div>*/}
          <Switch>
            <Route path="/auth/pass" exact component={Pass} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
            <Redirect from="/" to="/auth/login" />
            <Redirect from="/auth/pass" to="/auth/pass" />
          </Switch>
          {/*<FooterSmall absolute />*/}
        {/*</section>*/}
      </main>
    </>
  );
}
