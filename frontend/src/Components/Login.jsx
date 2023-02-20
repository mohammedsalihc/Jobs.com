import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from './context/userContext'



function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUserInfo } = useContext(UserContext)
    const navigate = useNavigate()


    const userLogin = async (ev) => {
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include"

        })

        if (response.ok) {
            response.json().then(userinfo => {
                setUserInfo(userinfo)
                navigate('/')
            })
        } else {
            alert("invalid email or password")
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="container mt-5 pl-5">
                        <h2 className='text-center'>Login</h2>
                        <form onSubmit={userLogin}>
                            <div className="form-group">
                                <label>Eamil address</label>
                                <input type="email" name='email' value={email} onChange={ev => setEmail(ev.target.value)} className='form-control mt-2' placeholder='Enter email' required />
                            </div>
                            <div className="form-group mt-4">
                                <label>Password</label>
                                <input type="password" name='password' value={password} onChange={ev => setPassword(ev.target.value)} className='form-control mt-2' placeholder='Enter password' required />
                                <Link to="/register" className='nav-link text-primary'>create new account?</Link>
                            </div>
                            <div >
                                <button className='btn  btn-primary mt-3'>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login