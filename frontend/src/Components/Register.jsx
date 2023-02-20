
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const userRegister = async (ev) => {
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/register', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" }
        })
        if (response.status === 200) {
            alert("registration success")
            navigate('/login')

        } else if (response.status === 422) {
            alert("user already exist")
        } else {
            alert('registration failed')
        }
    }
    return (
        <>
            <div>
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="container mt-5 pl-5">
                            <h2 className='text-center'>New Registration</h2>
                            <form onSubmit={userRegister}>
                                <div className="form-group">
                                    <label>Your name</label>
                                    <input type="name" name='name' value={name} onChange={ev => setName(ev.target.value)} className='form-control mt-2' placeholder="Enter name " required />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Eamil address</label>
                                    <input type="email" name='email' value={email} onChange={ev => setEmail(ev.target.value)} className='form-control mt-2' placeholder='Enter email' required />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Password</label>
                                    <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} name='password' className='form-control mt-2' placeholder='Type a password' required />
                                </div>

                                <div >
                                    <button type="submit" className='btn btn-primary mt-3   '>Register</button>
                                    <Link to="/login" className='nav-link text-primary float-end'>already have an account?</Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register