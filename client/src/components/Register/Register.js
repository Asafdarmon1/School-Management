import React, { useState, useEffect } from "react";
import Axios from 'axios';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';


import './Register.css';
import { Alert } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Register = () => {
    let navigate = useNavigate();

    //User Details
    const [ID, setID] = useState("");
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [Role, setRole] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState(new Date());
    //That's all the types that the user choose when he register
    const userTypes = [
        'Teacher',
        'Student'
    ]

    const textFieldStyle = (
        { margin: "auto auto 10px" }
    );


    const initialValues = { id: "", fullName: "", email: "", username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }


    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
        setTimeout(() => {
            handleClose();
            navigate('/login');
        }, 2000)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setID(formValues.id);
        setFullName(formValues.fullName);
        setEmail(formValues.email);
        setUserName(formValues.username);
        setPassword(formValues.password);
        let errors = validate(formValues);
        setFormErrors(errors);
        setIsSubmit(true);

    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addNewUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors]);


    const validate = (values) => {

        const errors = {};
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const fullNameRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
        const IDRegex = /^[0-9\b]+$/;
        const IDLengthRegex = /^.{9,10}$/;

        if (!values.id) {
            errors.id = "ID is required!";
        } else if (!IDRegex.test(values.id)) {
            errors.id = "This is not a valid ID";
        } else if (!IDLengthRegex.test(values.id)) {
            errors.id = "Please enter 9 digits ID";
        }

        if (!values.fullName) {
            errors.fullName = "Full Name is required!";
        } else if (!fullNameRegex.test(values.fullName)) {
            errors.fullName = "Name can only contain letters";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email!"
        }

        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 4 || values.password.length > 10) {
            errors.password = "Password must be between 4-10 ";
        }

        if (!values.username) {
            errors.username = "Username is required!";
        }

        return errors;

    }


    const addNewUser = () => {

        Axios.post("http://localhost:5000/register", {
            UserID: ID,
            UserFullName: FullName,
            UserEmail: Email,
            UserName: UserName,
            UserPassword: Password,
            UserRole: Role,
            DateOfBirth: DateOfBirth.toLocaleDateString(),
        }).then(response => {
            if (response.data.data === true) {
                handleToggle();
            } else {
                console.log(response.data.message);
                Alert(response.data.message);
            }
        })
    }

    const handleDate = (newDate) => {
        setDateOfBirth(newDate)
    }

    return (
        <div className="registerWindow">

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container>
                <Grid item md={8} lg={8}>
                    <form className='registerForm'>
                        <Grid container spacing={2}>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    onChange={handleChange}
                                    type="text"
                                    style={textFieldStyle}
                                    //className={classes.root}
                                    label="ID"
                                    name="id"
                                    value={formValues.id}
                                    variant="outlined"
                                    required />
                                <p id="Error">{formErrors.id}</p>

                                <TextField
                                    onChange={handleChange}
                                    type="text"
                                    style={textFieldStyle}
                                    //className={classes.root}
                                    label="Full Name"
                                    name="fullName"
                                    value={formValues.fullName}
                                    variant="outlined"
                                    required />
                                <p id="Error">{formErrors.fullName}</p>
                                <TextField
                                    onChange={handleChange}
                                    type="email"
                                    style={textFieldStyle}
                                    //className={classes.root}
                                    label="Email"
                                    name="email"
                                    value={formValues.email}
                                    variant="outlined"
                                    required />
                                <p id="Error">{formErrors.email}</p>

                            </Grid>
                            <Grid item md={6} lg={6} >
                                <TextField
                                    onChange={handleChange}
                                    type="text"
                                    style={textFieldStyle}
                                    //className={classes.root}
                                    label="Username"
                                    name="username"
                                    value={formValues.username}
                                    variant="outlined"
                                    required />
                                <p id="Error">{formErrors.username}</p>

                                <TextField
                                    onChange={handleChange}
                                    type="Password"
                                    style={textFieldStyle}

                                    //className={classes.root}
                                    label="Password"
                                    name="password"
                                    value={formValues.password}
                                    variant="outlined"
                                    required />
                                <p id="Error">{formErrors.password}</p>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={userTypes}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            label="Type"
                                        />}
                                    //className={classes.root}
                                    inputValue={Role}
                                    onInputChange={(event, newInputValue) => {
                                        setRole(newInputValue);
                                    }}
                                    name="Type"
                                    value={formValues.Type}
                                    style={textFieldStyle}
                                />
                                <br />


                            </Grid>
                            <Grid item md={12} lg={12}>
                                <p style={{
                                    "fontWeight": "bold",
                                    "margin": "auto auto 10px"
                                }}>Date Of Birth: </p>
                                <div className="datePicker">

                                    <DatePicker
                                        maxDate={(Role === "Teacher")
                                            ? new Date((new Date().getFullYear() - 24), new Date().getMonth(), 7)
                                            : new Date((new Date().getFullYear() - 6), new Date().getMonth(), 7)}

                                        minDate={(Role === "Teacher")
                                            ? new Date((new Date().getFullYear() - 60), new Date().getMonth(), 7)
                                            : new Date((new Date().getFullYear() - 18), new Date().getMonth(), 7)}
                                        name="DateOfBirth"
                                        value={DateOfBirth}
                                        onChange={handleDate}
                                        style={textFieldStyle}
                                    />
                                </div>
                            </Grid>

                        </Grid>
                        <br />
                        <button
                            className="buttonPage"
                            onClick={handleSubmit}>Register
                        </button>
                        <p >Already have account? <Link to="/login" className="loginNav">Login</Link></p>
                    </form>

                </Grid>
                <Grid item md={4} lg={4}>
                    <h1 className='h1Register'>Create Account</h1>
                </Grid>
            </Grid >
        </div >
    )
}

export default Register;