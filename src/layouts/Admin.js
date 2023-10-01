import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// stye
import style from './Admin.module.css'

// components

import Sidebar from "components/Sidebar/Sidebar.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Airtime from "views/admin/airtime.js";
import Data from "views/admin/data.js";
import fund from "views/admin/fund.js";
import Tv from "views/admin/tv.js";
import Elect from "views/admin/elect.js";
import Deposit from "views/admin/deposit.js";
import Purchase from "views/admin/purchase.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Createlock from "views/admin/createlock.js";
import Addlock from "views/admin/addlock.js";
import Add from "views/admin/add.js";
import Bank from "views/admin/withdraw.js";
import Upgrade from "../views/admin/upgrade";
import Reseller from "../views/admin/reseller";
import Game from "../views/admin/game";
import Verify from "../views/admin/verify";
import Verifyf from "../views/admin/verifyf";
import gh from "../lg.png";

export default function Admin() {

  return (
    <>
    <main className={style.main}>
      <Sidebar />
      <div id="content" className={style.content}>
        <div>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/airtime" exact component={Airtime} />
            <Route path="/fund" exact component={fund} />
            <Route path="/data" exact component={Data} />
            <Route path="/tv" exact component={Tv} />
            <Route path="/elect" exact component={Elect} />
            <Route path="/deposit" exact component={Deposit} />
            <Route path="/purchase" exact component={Purchase} />
            <Route path="/profile" exact component={Settings} />
            <Route path="/createlock" exact component={Createlock} />
            <Route path="/addlock" exact component={Addlock} />
            <Route path="/add" exact component={Add} />
            <Route path="/withdraw" exact component={Bank} />
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/upgrade" exact component={Upgrade} />
            <Route path="/reseller" exact component={Reseller} />
            <Route path="/game" exact component={Game} />
            <Route path="/verify" exact component={Verify} />
            <Route path="/verifyid" exact component={Verifyf} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </main>
      
    </>
  );
}
