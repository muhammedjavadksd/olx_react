import React, { useContext, useState } from 'react'
import WhiteBox from '../Component/WhiteBox/WhiteBox'
import Logo from '../assets/Images/logo.png'
import Button from '../Component/util/Button'
import { Link, useNavigate } from 'react-router-dom'
import fbConnection from '../firebase/config'
import { ContextLoading } from '../Context/LoaderContext'

function Signup() {


    let loaderContext = useContext(ContextLoading)

    let [username, usernameField] = useState("");
    let [email, emailField] = useState("");
    let [phone, phoneField] = useState("");
    let [password, passwordField] = useState("");
    let [cpassword, cpasswordField] = useState("");
    let [profile, profileField] = useState("");
    let [error, errorUpdate] = useState({ error: false, msg: "nothing" })
    let navigate = useNavigate();

    let replaceFirebase = (msg) => {
        return msg.replace("Firebase", "")
    }

    function signUpSubmit(e) {
        e.preventDefault();
        loaderContext.toggleLoading(true)

        if (password == cpassword) {
            let storageSpace = fbConnection.storage().ref();
            let fileChild = storageSpace.child("user_profile/" + profile.name);

            fileChild.put(profile).then((profile) => {
                profile.ref.getDownloadURL().then((profileUrl) => {
                    fbConnection.auth().createUserWithEmailAndPassword(email, password).then((userCred => {
                        userCred.user.updateProfile({ displayName: username }).then((data) => {
                            fbConnection.firestore().collection("user").add({
                                user_id: userCred.user.uid,
                                username: username,
                                email: email,
                                phone: phone,
                                password: password,
                                cpassword: cpassword,
                                profile: profileUrl
                            }).then((data) => {
                                loaderContext.toggleLoading(false)
                                navigate("/login")
                            }).catch((err) => {
                                loaderContext.toggleLoading(false)
                                errorUpdate({ error: true, msg: replaceFirebase(err.message) })
                            })
                        }).catch((err) => {
                            loaderContext.toggleLoading(false)
                            errorUpdate({ error: true, msg: replaceFirebase(err.message) })
                        })
                    })).catch((err) => {
                        loaderContext.toggleLoading(false)
                        errorUpdate({ error: true, msg: replaceFirebase(err.message) })
                    })
                })
            })
        } else {
            loaderContext.toggleLoading(false)
            errorUpdate({ error: true, msg: "Password & confirm password are not match" })
        }

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
                                <h6 style={{ marginBottom: "10px" }}>Create Account with below details</h6>
                                <form action="" onSubmit={signUpSubmit} method="post">
                                    <div className="formGroup">
                                        <input type="text" onChange={(e) => {
                                            usernameField(e.target.value)
                                        }} placeholder='Enter your name' />
                                    </div>
                                    <div className="formGroup">
                                        <input type="number" onChange={(e) => {
                                            phoneField(e.target.value)
                                        }} placeholder='Enter your phone number' />
                                    </div>
                                    <div className="formGroup">
                                        <input type="text" onChange={(e) => {
                                            emailField(e.target.value)
                                        }} placeholder='Enter email address' />
                                    </div>
                                    <div className="formGroup">
                                        <input type="file" onChange={(e) => {
                                            profileField(
                                                e.target.files[0]
                                            )
                                        }} />
                                    </div>
                                    <div className="formGroup">
                                        <input onChange={(e) => {
                                            passwordField(e.target.value)
                                        }} type="password" placeholder='Enter your password' />
                                    </div>
                                    <div className="formGroup">
                                        <input type="password" onChange={(e) => {
                                            cpasswordField(e.target.value)
                                        }} placeholder='Enter your confirm password' />
                                    </div>
                                    <Link to={'/login'}>Already have an account? Login here</Link>
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

export default Signup
