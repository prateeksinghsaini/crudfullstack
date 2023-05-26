import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
const initialState = {
    name: "",
    email: "",
    contact: ""
}

function AddEdit() {
    const [state, setState] = useState(initialState)
    const { name, email, contact } = state
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((res) => setState({ ...res.data[0] }))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!id) {
            axios.post('http://localhost:5000/api/post', {
                name,
                email,
                contact
            }).then(() => {
                setState({ name: "", email: "", contact: "" })
            }).catch((err) => toast.error(err.response.data))

            setTimeout(() => {
                toast.success("Contact Added Successfully")
                navigate('/')
            }, 500);
        } else {
            axios.put(`http://localhost:5000/api/update/${id}`, {
                name,
                email,
                contact
            }).then(() => {
                setState({ name: "", email: "", contact: "" })
            }).catch((err) => toast.error(err.response.data))

            setTimeout(() => {
                toast.success("Contact updated Successfully")
                navigate('/')
            }, 500);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    return (
        <div>
            <Box
                sx={{
                    width: 700,
                    maxWidth: '100%',
                }}
            ></Box>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", alignItems: "center" }}>
                <Link to="/">
                    <IconButton aria-label="Go Back" size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <h1>Contact Details</h1>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                    style={{ marginBottom: "20px" }}
                    type='text'
                    name='name'
                    value={name || ""}
                    required
                    id="outlined-required"
                    label="Name"
                    onChange={handleInputChange}
                />
                <TextField
                    style={{ marginBottom: "20px" }}
                    type='email'
                    name='email'
                    value={email || ""}
                    required
                    id="outlined-required"
                    label="Email"
                    onChange={handleInputChange}
                />
                <TextField
                    style={{ marginBottom: "20px" }}
                    type='number'
                    name='contact'
                    value={contact || ""}
                    required
                    id="outlined-required"
                    label="Contact"
                    onChange={handleInputChange}
                />
                <Button type='submit' value={id ? "Update" : "Save"} variant="contained" color="primary"
                    sx={{
                        width: 150,
                        maxWidth: '100%',
                    }}
                >Submit</Button>
            </form>
        </div>
    )
}


export default AddEdit