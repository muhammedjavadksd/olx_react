import React, { Component, useContext } from 'react'
import WhiteBox from '../Component/WhiteBox/WhiteBox'
import Logo from '../assets/Images/logo.png'
import Button from '../Component/util/Button'
import { Link } from 'react-router-dom'
import fbConnection from '../firebase/config'
import LoaderContext, { ContextLoading } from '../Context/LoaderContext'

export default class Create extends Component {



    static loaderContext = ContextLoading;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: "",
            location: "",
            description: "",
            image: "",
            imagePrev: "https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg",
            alert: false,
            alert_msg: "",
            alert_class: "danger"
        };




        this.nameChange = function (name) {
            this.state.name = name;
        }

        this.priceChange = function (price) {
            this.state.price = price;
        }

        this.locationChange = function (location) {
            this.state.location = location;
        }

        this.descriptionChange = function (description) {
            this.state.description = description;
        }

        this.imageChange = function (image) {
            let imageUrl = URL.createObjectURL(image)
            this.state.image = image;

            this.setState({ imagePrev: imageUrl })
        }
    }



    createPost = (e) => {
        e.preventDefault();
        console.log(this.context);
        this.context.toggleLoading(true);


        const { name, price, location, description, image } = this.state;

        try {
            let storageReg = fbConnection.storage().ref();

            let imageRef = storageReg.child(image.name);
            imageRef.put(image).then((data) => {
                data.ref.getDownloadURL().then((data) => {
                    console.log('Image uploaded. URL:', data);
                    fbConnection.firestore().collection("product").add({
                        name: name,
                        price: price,
                        location: location,
                        description: description,
                        image: data
                    }).then((insert) => {
                        this.setState({ alert: true, alert_msg: "Product Inserted Success", alert_class: "success" })
                        this.context.toggleLoading(false);
                    }).catch((err) => {
                        this.setState({ alert: true, alert_msg: "Something Error", alert_class: "danger" })
                        this.context.toggleLoading(false);
                    })
                })
            }).catch((err) => {
                this.setState({ alert: true, alert_msg: "Something Error", alert_class: "danger" })
                this.context.toggleLoading(false);
            })
        } catch (e) {
            this.setState({ alert: true, alert_msg: "Something Error", alert_class: "danger" })
            this.context.toggleLoading(false);
        }


    }


    render() {
        return (
            <div>
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
                                            this.state.alert ? <div className={'own_alert ' + this.state.alert_class}>{this.state.alert_msg}</div> : ""
                                        }
                                        <h6 style={{ marginBottom: "10px" }}>Upload new Product</h6>
                                        <form action="" onSubmit={this.createPost} method="post" encType='multipart/form-data'>
                                            <div className="formGroup">
                                                <input type="text" onChange={(e) => {
                                                    this.nameChange(e.target.value)
                                                }} placeholder='Enter Product Name' />
                                            </div>
                                            <div className="formGroup">
                                                <input type="number" onChange={(e) => {
                                                    this.priceChange(e.target.value)
                                                }} placeholder='Enter Product Price' />
                                            </div>
                                            <div className="formGroup">
                                                <input onChange={(e) => {
                                                    this.locationChange(e.target.value)
                                                }} type="text" placeholder='Enter Location' />
                                            </div>
                                            <div className="formGroup">
                                                <textarea onChange={(e) => {
                                                    this.descriptionChange(e.target.value)
                                                }} name="" placeholder='Enter product description' id="" cols="30" rows="10"></textarea>
                                            </div>
                                            <div className="formGroup">
                                                <div>
                                                    <img width={"100px"} style={{ marginBottom: "20px" }} height={"100px"} src={this.state.imagePrev} alt="" />
                                                </div>
                                                <label htmlFor="">Select Product Image</label>
                                                <input onChange={(e) => {
                                                    this.imageChange(e.target.files[0])
                                                }} type="file" />
                                            </div>
                                            <Button type="submit" title="Submit"></Button>
                                        </form>
                                    </div>
                                </WhiteBox>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
