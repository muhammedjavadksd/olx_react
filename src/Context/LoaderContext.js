import React, { createContext, useState } from "react";



export let ContextLoading = createContext({
    isLoading: false,
    toggleLoading: () => { }
});



function LoaderContext(props) {

    let [isLoading, updateLoading] = useState(false)

    function toggleLoading(value) {
        updateLoading(value)
    }

    return (
        <div>
            <ContextLoading.Provider value={{ isLoading, toggleLoading }}>
                {props.children}
            </ContextLoading.Provider>
        </div>
    )
}

export default LoaderContext
