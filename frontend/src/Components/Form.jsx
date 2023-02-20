
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './context/userContext'

import { useNavigate } from 'react-router-dom'
function Form() {
    const [title, setTitle] = useState("")
    const [salary, setSalary] = useState("")
    const [openings, setOpenings] = useState("")
    const { setUserInfo, userInfo } = useContext(UserContext)
    const navigate = useNavigate()
    const createJobPost = async (ev) => {
        ev.preventDefault()
        const response = await fetch('http://localhost:4000/jobpost', {
            method: "POST",
            body: JSON.stringify({ title, salary, openings }),
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        if (response.ok) {
            navigate('/jobs')

        }
    }

    const username = userInfo?.email
    return (
        <>
            {username && (
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <div className="container mt-5 pl-5">
                            <h2 className='text-center'>Post your Job</h2>
                            <form className='text-dark' onSubmit={createJobPost}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" name='title' value={title} onChange={ev => setTitle(ev.target.value)} className='form-control mt-2' placeholder="Enter job title " required />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Salary</label>
                                    <input type="number" name='salary' value={salary} onChange={ev => setSalary(ev.target.value)} className='form-control mt-2' placeholder='Enter job salary' required />
                                </div>
                                <div className="form-group mt-2">
                                    <label>Openings</label>
                                    <input type="number" name='openings' value={openings} onChange={ev => setOpenings(ev.target.value)} className='form-control mt-2' placeholder='Enter job openings' required />
                                </div>
                                <div
                                    className="">
                                    <button
                                        className="btn btn-primary  mt-3">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {!username && (
                navigate('/')
            )}
        </>
    )
}

export default Form