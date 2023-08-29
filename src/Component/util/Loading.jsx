import React, { Fragment, useContext } from 'react'
import LoaderImg from '../../assets/Images/loading_screen.gif'
import LoaderContext, { ContextLoading } from '../../Context/LoaderContext'

function Loading() {


    let loaderContext = useContext(ContextLoading);
   

    return (
        <Fragment>
            <div className={"loader " + (!loaderContext.isLoading ? "hide" : "")}>
                <div className="loader">
                    <div className="loaderWrapper">
                        <img src={LoaderImg} alt="" />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Loading
