import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import PersonAddSharpIcon from '@mui/icons-material/PersonAddSharp';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function Home() {
    const [data, setData] = useState([])

    const [open, setOpen] = React.useState(false);
    const [contactId, setContactId] = useState("")
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get")
        setData(response.data)
    }

    useEffect(() => {
        loadData()
    }, []);

    const deleteContact = (id) => {
        setContactId(id)
        handleOpen()
    }

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:5000/api/remove/${contactId}`)
        toast.success("Contact Deleted Successfully")
        handleClose()
        setContactId("")
        setTimeout(() => {
            loadData()
        }, 500);
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px", alignItems: "center" }}>
                <Link to={`/addContact`}>
                    <IconButton aria-label="add" size="large">
                        <PersonAddSharpIcon fontSize="inherit" />
                    </IconButton>
                </Link>
                <h1>All Contacts</h1>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Delete Contact?
                        </Typography>

                        <Button type='button' onClick={handleDelete} variant="contained" color="primary"
                            sx={{
                                width: 150,
                                margin: "10px",
                                maxWidth: '100%',
                            }}
                        >Delete</Button>
                        <Button type='button' onClick={handleClose} variant="contained" color="primary"
                            sx={{
                                width: 150,
                                margin: "10px",
                                maxWidth: '100%',
                            }}
                        >No, don't</Button>
                    </Box>
                </Fade>
            </Modal>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Index</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <StyledTableRow key={item.id}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {item.id}.
                                </StyledTableCell>
                                <StyledTableCell align="center">{item.name}</StyledTableCell>
                                <StyledTableCell align="center">{item.email}</StyledTableCell>
                                <StyledTableCell align="center">{item.contact}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Link to={`/view/${item.id}`}>
                                        <IconButton aria-label="view" size="large">
                                            <VisibilitySharpIcon fontSize="inherit" />
                                        </IconButton>
                                    </Link>
                                    <Link to={`/update/${item.id}`}>
                                        <IconButton aria-label="update" size="large">
                                            <BorderColorSharpIcon fontSize="inherit" />
                                        </IconButton>
                                    </Link>
                                    <Link to="">
                                        <IconButton type='button' onClick={() => deleteContact(item.id)} aria-label="delete" size="large">
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home