import React, { useContext, useState } from 'react';
import WhiteBox from '../Component/WhiteBox/WhiteBox';
import Logo from '../assets/Images/logo.png';
import Button from '../Component/util/Button';
import { Link } from 'react-router-dom';
import fbConnection from '../firebase/config';
import { ContextLoading } from '../Context/LoaderContext';

function Create() {
    const { toggleLoading } = useContext(ContextLoading);

    const [state, setState] = useState({
        name: '',
        price: '',
        location: '',
        description: '',
        image: '',
        imagePrev: 'https://media-cdn.tripadvisor.com/media/photo-s/0c/bb/a3/97/predator-ride-in-the.jpg',
        alert: false,
        alert_msg: '',
        alert_class: 'danger'
    });

    const nameChange = (name) => {
        setState((prevState) => ({ ...prevState, name }));
    };

    const priceChange = (price) => {
        setState((prevState) => ({ ...prevState, price }));
    };

    const locationChange = (location) => {
        setState((prevState) => ({ ...prevState, location }));
    };

    const descriptionChange = (description) => {
        setState((prevState) => ({ ...prevState, description }));
    };

    const imageChange = (image) => {
        const imageUrl = URL.createObjectURL(image);
        setState((prevState) => ({
            ...prevState,
            image,
            imagePrev: imageUrl
        }));
    };




    const createPost = (e) => {
        e.preventDefault();
        toggleLoading(true);

        const { name, price, location, description, image } = state;

        fbConnection.auth().onAuthStateChanged((user) => {

            if (user) {


                try {
                    const storageReg = fbConnection.storage().ref();
                    const imageRef = storageReg.child("products/" + image.name);

                    fbConnection.firestore().collection("user").where("user_id", "==", user.uid).get().then((userSnap) => {
                        let uploadUserData = userSnap.docs[0].data();
                        imageRef
                            .put(image)
                            .then((data) => {
                                data.ref.getDownloadURL().then((data) => {
                                    console.log('Image uploaded. URL:', data);
                                    fbConnection
                                        .firestore()
                                        .collection('product')
                                        .add({
                                            name,
                                            price,
                                            location,
                                            description,
                                            image: data,
                                            owner: {
                                                username: uploadUserData.username,
                                                profile: uploadUserData.profile
                                            }
                                        })
                                        .then(() => {
                                            setState((prevState) => ({
                                                ...prevState,
                                                alert: true,
                                                alert_msg: 'Product Inserted Success',
                                                alert_class: 'success'
                                            }));
                                            toggleLoading(false);
                                        })
                                        .catch((err) => {
                                            setState((prevState) => ({
                                                ...prevState,
                                                alert: true,
                                                alert_msg: 'Something Error',
                                                alert_class: 'danger'
                                            }));
                                            toggleLoading(false);
                                        });
                                });
                            })
                            .catch((err) => {
                                setState((prevState) => ({
                                    ...prevState,
                                    alert: true,
                                    alert_msg: 'Something Error',
                                    alert_class: 'danger'
                                }));
                                toggleLoading(false);
                            });
                    })


                } catch (e) {
                    setState((prevState) => ({
                        ...prevState,
                        alert: true,
                        alert_msg: 'Something Error',
                        alert_class: 'danger'
                    }));
                    toggleLoading(false);
                }
            } else {
                setState((prevState) => ({
                    ...prevState,
                    alert: true,
                    alert_msg: 'Please loggin first',
                    alert_class: 'danger'
                }));
                toggleLoading(false);
            }
        })


    };

    return (
        <div>
            <section className='loginPage'>
                <div className='container'>
                    <div className='loginScreen'>
                        <div className='loginWidthManage'>
                            <WhiteBox class='loginBox'>
                                <div style={{ width: '100%' }}>
                                    <div className='loginContent'>
                                        <div className='logoLogin'>
                                            <img src={Logo} alt='' />
                                        </div>
                                    </div>
                                    {state.alert && (
                                        <div className={'own_alert ' + state.alert_class}>
                                            {state.alert_msg}
                                        </div>
                                    )}
                                    <h6 style={{ marginBottom: '10px' }}>Upload new Product</h6>
                                    <form
                                        action=''
                                        onSubmit={createPost}
                                        method='post'
                                        encType='multipart/form-data'
                                    >
                                        <div className='formGroup'>
                                            <input
                                                type='text'
                                                onChange={(e) => nameChange(e.target.value)}
                                                placeholder='Enter Product Name'
                                            />
                                        </div>
                                        <div className='formGroup'>
                                            <input
                                                type='number'
                                                onChange={(e) => priceChange(e.target.value)}
                                                placeholder='Enter Product Price'
                                            />
                                        </div>
                                        <div className='formGroup'>
                                            <input
                                                onChange={(e) => locationChange(e.target.value)}
                                                type='text'
                                                placeholder='Enter Location'
                                            />
                                        </div>
                                        <div className='formGroup'>
                                            <textarea
                                                onChange={(e) => descriptionChange(e.target.value)}
                                                name=''
                                                placeholder='Enter product description'
                                                id=''
                                                cols='30'
                                                rows='10'
                                            ></textarea>
                                        </div>
                                        <div className='formGroup'>
                                            <div>
                                                <img
                                                    width={'100px'}
                                                    style={{ marginBottom: '20px' }}
                                                    height={'100px'}
                                                    src={state.imagePrev}
                                                    alt=''
                                                />
                                            </div>
                                            <label htmlFor=''>Select Product Image</label>
                                            <input
                                                onChange={(e) => imageChange(e.target.files[0])}
                                                type='file'
                                            />
                                        </div>
                                        <Button type='submit' title='Submit' />
                                    </form>
                                </div>
                            </WhiteBox>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Create;
