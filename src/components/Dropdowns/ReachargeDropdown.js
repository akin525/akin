import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {createPopper} from "@popperjs/core";

function ReachargeDropdown() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
// dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        console.log("hey");
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "bottom-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <li>
            <a
                className="dropdown-toggle"
                ref={btnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <i className="fa fa-bullhorn"></i> <span>Recharge</span>
            </a>
                <ul
                    ref={popoverDropdownRef}
                            className={(dropdownPopoverShow ? "block " : "hidden ") +"collapse list-unstyled"}>
                    <li>
                        <Link to="/data"><i className="fa fa-laptop"></i> <span>Buy Data</span></Link>
                    </li>
                    <li>
                        <Link  to="/airtime"><i className="fa fa-phone"></i> <span>Buy Airtime</span></Link>
                    </li>
                    <li>
                        <Link to="/tv"><i className="fa fa-tv"></i> <span>Pay Tv</span></Link>
                    </li>
                    <li>
                        <Link to="/elect"><i className="fa fa-power-off"></i>
                            <span>Pay Electricity</span>
                        </Link>
                    </li>
                </ul>
        </li>
    );
}

export default ReachargeDropdown;
