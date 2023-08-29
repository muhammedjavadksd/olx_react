import React, { useContext, useState } from 'react'
import WhiteBox from '../Component/WhiteBox/WhiteBox'
import Logo from '../assets/Images/logo.png'
import Button from '../Component/util/Button'
import { Link, useNavigate } from 'react-router-dom'
import fbConnection from '../firebase/config'
import   { ContextLoading } from '../Context/LoaderContext'

function Login() {


    let loaderContext =useContext(ContextLoading)

    let [username, usernameField] = useState("");
    let [password, passwordField] = useState("");
    let [error, errorUpdate] = useState({ error: false, msg: "nothing" })
    let navigate = useNavigate();


    fbConnection.auth().onAuthStateChanged((user) => {

    })

    function logginForm(e) {
        e.preventDefault();
        loaderContext.toggleLoading(true)
        fbConnection.auth().signInWithEmailAndPassword(username, password).then((data) => {
            let user= data.user
            localStorage.setItem("currentUser", JSON.stringify(user))
            loaderContext.toggleLoading(false)
            navigate("/")
        }).catch((err) => {
            errorUpdate({ error: true, msg: "Something went wrong" })
            loaderContext.toggleLoading(false)
        })
    }

    return (
        <section className='loginPage'>
            <div className="container">
                <div className="loginScreen"  >
                    <div className="loginWidthManage">
                        <WhiteBox class="loginBox">
                            <div style={{ width: "100%" }}>

                                <div className="loginContent">
                                    <div className="logoLogin">
                                        <img src={Logo} alt="" />
                                    </div>
                                </div>
                                {
                                    error.error ? <div className='own_alert danger'>{error.msg}</div> : ""
                                }
                                <h6 style={{ marginBottom: "10px" }}>Loggin with your username and password</h6>
                                <form onSubmit={logginForm} action="" method="post">
                                    <div className="formGroup">
                                        <input type="email" onChange={(e) => {
                                            usernameField(e.target.value)
                                        }} placeholder='Enter email Address' />
                                    </div>
                                    <div className="formGroup">
                                        <input type="password" onChange={(e) => {
                                            passwordField(e.target.value)
                                        }} placeholder='Enter Password' />
                                    </div>
                                    <Link to={'/signup'}>Don't have an account? Create one</Link>
                                    <Button type="submit" title="Submit"></Button>
                                </form>
                            </div>
                        </WhiteBox>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
