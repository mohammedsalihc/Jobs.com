
import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import { UserContext } from './context/userContext'


function Jobs() {

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false)
    const { setUserInfo, userInfo } = useContext(UserContext)
    const username = userInfo?.email
    const navigate = useNavigate()
    const getJobs = async () => {
        setLoading(true)
        await fetch('http://localhost:4000/jobs', {
            credentials: "include"
        }).then(resp => {
            resp.json().then(JobInfo => {
                setJobs(JobInfo)
                console.log(JobInfo)
                setLoading(false)
            })
        })
    }
    useEffect(() => {
        getJobs()
    }, [])



    const deleteJobs = async (id) => {
        const response = await fetch(`http://localhost:4000/deletejob/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        getJobs()

        if (response.status === 200) {
            navigate('/jobs')
        }
    }





    const Nodata = () => {
        return (
            <>

                <p className="lead fs-5 text-secondary text-center ">No data found</p>

            </>
        )
    }




    const ShowJobs = () => {
        return (
            <>

                {jobs.map(job => (
                    <>
                        {username && (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title fs-4">{job.title}</h5>
                                        <h6 className="card-subtitle lead fs-6">{job.date}</h6>
                                        <p className="card-text">Salary: {job.salary}</p>
                                        <p className="card-text">Openings: {job.openings}</p>
                                        <button onClick={() => deleteJobs(job._id)} className="btn btn-danger "> Delete<i class="fa-solid fa-trash ms-2 "></i></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!username && (
                            navigate('/')
                        )}

                    </>
                ))}
            </>
        )
    }

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Your Jobs</h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                    {jobs.length === 0 ? <Nodata /> : <ShowJobs />}
                </div>
            </div>
        </div>
    )
}

export default Jobs
