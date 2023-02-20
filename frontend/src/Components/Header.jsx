import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from "react-router-dom"
import { UserContext } from './context/userContext'


function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext)
    useEffect(() => {
        fetch("http://localhost:4000/profile", {
            credentials: "include"
        }).then(resp => {
            resp.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    const logout = () => {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST"
        })
        setUserInfo(null)

    }



    const username = userInfo?.email

    return (
        <>
            <nav className="navbar bg-light  py-3 shadow-sm navbar-expand-lg sticky-top">
                <div className="container">
                    <NavLink className="navbar-brand text-primary  fs-2 logo" to="/">Jobs.com</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link">Contact</NavLink>
                            </li>
                        </ul>
                        <div className="buttons">
                            {username && (
                                <>
                                    <Link to="/jobs" className='btn btn-primary' > <i class="fa-solid fa-eye"></i>Your jobs</Link>
                                    <Link to="/create" className='btn btn-outline-primary ms-2 me-2'><i class="fa-solid fa-circle-plus me-1"></i>Create Job</Link>
                                    <Link onClick={logout} className='btn btn-outline-primary me-2'><i class="fa-solid fa-right-from-bracket me-1"></i>Logout</Link>

                                </>
                            )}
                            {!username && (
                                <>

                                    <Link to="/login" className='btn btn-outline-primary me-4'><i class="fa-solid fa-right-to-bracket me-1"></i>Login</Link>
                                    <Link to="/register " className='btn btn-outline-primary'>  <i class="fa-solid fa-user-plus"></i> Register</Link>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header