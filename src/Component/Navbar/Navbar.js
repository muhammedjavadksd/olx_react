import React from 'react'
import './assets/css/style.css'

function Navbar() {
    return (
        <nav>
            <div className="main_container">
                <ul className='listNav'>
                    <li>
                        <a href=''>Cars</a>
                    </li>
                    <li>
                        <a href=''>MotorCycle</a>
                    </li>
                    <li>
                        <a href=''>Mobile Phone</a>
                    </li>
                    <li>
                        <a href=''>For Sales</a>
                    </li>
                    <li>
                        <a href=''>Scooters</a>
                    </li>
                    <li>
                        <a href=''>Commercial & Other Vehicle</a>
                    </li>
                    <li>
                        <a href=''>For rent</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
