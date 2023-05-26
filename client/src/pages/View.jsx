import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function View() {
    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
            .then((res) => setUser({ ...res.data[0] }))
    }, [id]);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", alignItems: "center" }}>
                <Link to="/">
                    <IconButton aria-label="Go Back" size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <h1>{user.name}</h1>
            </div>
            <div
                style={{
                    width: 700,
                    height: "30vh",
                    maxWidth: '100%',
                    display: "flex",
                }}
            >
                <div style={{height: "100%", width: "50%", textAlign: "center"}}>
                    <h2 style={{height: "50%"}}>E-mail: </h2>
                    <h2 style={{height: "50%"}}>Contact: </h2>
                </div>
                <div style={{height: "100%", width: "50%",  textAlign: "center"}}>
                    <h2 style={{height: "50%"}}>{user.email}</h2>
                    <h2 style={{height: "50%"}}>{user.contact}</h2>
                </div>
            </div>
        </div>
    )
}

export default View
