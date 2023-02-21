import React from 'react'
import { useContext } from 'react'
import { UserContext } from './context/userContext'
import Jobs from './Jobs'

function Home() {
    const { setUserInfo, userInfo } = useContext(UserContext)
    const username = userInfo?.email
    return (
        <div className='hero'>
            <div className="card text-bg-dark border-0">
                <img src="/assets/bg.jpg" className="card-img" alt="bg" height="550px" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">Create jobs for Free</h5>
                        <p className="card-text lead fs-2 text-white ">You can add your Job openings here</p>
                    </div>
                </div>
            </div>
            {username && (
                <Jobs />
            )}

        </div>
    )
}

export default Home
