import React, { Fragment, useContext, useEffect, useState } from "react";
import './assets/css/style.css';
import Logo from '../../assets/Images/logo.png'
import { Link, Navigate, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import fbConnection from "../../firebase/config";

import LoaderContext from "../../Context/LoaderContext";


function Header() {

    let naviagte = useNavigate();
    let loaderContext = useContext(LoaderContext)

    function logoClick() {
        naviagte("/")
    }




    let [currentUser, updateUser] = useState({ logged: false });


    function logoutAction() {
        fbConnection.auth().signOut().then(() => {
            naviagte("/login")
        }).catch(() => {
            console.log("ERROR");
        })
    }

    useEffect(() => {
        const sub = fbConnection.auth().onAuthStateChanged(async (user) => {

            if (user) {
                user.logged = true;
                updateUser(user)
                console.log(currentUser);
            } else {
                updateUser({ logged: false })
            }
            console.log(user);
        })
    }, [])


    return (
        <Fragment>

            <header>
                <div className="headerOlx">
                    <div className="main_container">
                        <div className="headerTop">
                            <div className="leftHeader">
                                <div className="logo">
                                    <img src={Logo} alt="" onClick={logoClick} srcset="" />
                                </div>
                                <div className="logoRight">
                                    <select name="" id="">
                                        <option value="">Select Location</option>
                                        <option value="">India</option>
                                        <option value="">USA</option>
                                        <option value="">JAPAN</option>
                                    </select>
                                </div>
                            </div>
                            <div className="midHeader">
                                <div className="searchProduct">
                                    <div className="searchForm">
                                        <input type="text" placeholder="Find Cars, Mobile Phones and more..." name="" id="" />
                                        <button>
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="rightHeader">
                                <button>ENGLISH </button>
                                <button>
                                    {
                                        (currentUser.logged) ? <span type="button" onClick={logoutAction}>Logout</span> : <Link to={"/login"}>Login</Link>
                                    }

                                </button>
                                <button className="sellBtn" onClick={() => {
                                    naviagte("/create")
                                }}> + SELL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header;