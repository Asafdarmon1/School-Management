import { useState, useRef, useEffect } from "react";
import './Login.css'
import Button from '@material-ui/core/Button'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Axios from 'axios';
import TextField from '@mui/material/TextField';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Checkbox from '@mui/material/Checkbox';
import { FormGroup, FormControlLabel } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useAuth from "../Hooks/useAuth";

const Login = () => {

    const userRef = useRef(); //used for focus our input

    const { setAuth } = useAuth();
    const navigate = useNavigate(); //to navigate between pages
    const location = useLocation(); //use the last location of the user
    const from = location?.state?.from || '/'; //remember where the user came from in order to return after success login
    console.log()
    const [userName, setUserName] = useState("");
    ///////////////////////////////////////
    /**
     *    only happend when the component loads,
     *    set the focus on the user name field      
    */
     useEffect(() => {
        userRef.current.focus();
    }, [])
    /**
     * Delete the error message when the user
     * changes the user state or the password state
     */

    //////////////////////////////////////
    const [values, setValues] = useState({
        password: "",
        showPassword: false
    });



    const checkCredentials = async (event) => {
        event.preventDefault();
        const response = await Axios.post('http://localhost:5000/login',
            JSON.stringify({ UserName: userName, UserPassword: values.password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        if (response.data.data === false) {
            alert(response.data.message);
        } else {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', response.data.userRole);
            const token = response?.data.token;
            const pass = values.password;
            const role = response.data.userRole;
            console.log(role);
            setAuth({ userName, pass, role , token });
            setUserName('');
            setValues({password: ''});
            //props.login(response.data.userName, response.data.token);
            navigate(from, { replace: true });
        }
    }



    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };



    return <div className="Login-Form">
        <h2>Login</h2>
        <div>
            <div >
                <TextField sx={{ m: 1, width: "25ch" }}
                    id="userName"
                    label="User Name"
                    variant="outlined"
                    ref={userRef} //set focus
                    autoComplete="off"
                    type="text"
                    value={userName} //controlled input, when we want to clear the input uppon submition
                    required
                    InputProps={{
                        endAdornment: <AccountCircle />
                    }}
                    onChange={(e) => { setUserName(e.target.value) }}
                />
            </div>
            <div>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel>Password *</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        required
                        onChange={(e) => {
                            setValues({ password: e.target.value });
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <div className="checkbox">
                <FormGroup>
                    <FormControlLabel
                        value="end"
                        control={<Checkbox />}
                        label="Remember Me"
                        labelPlacement="end"
                    />
                </FormGroup>
            </div>
            <div className="login-button">
                <Button
                    onClick={checkCredentials}
                    variant="outlined"
                    size="small"
                    color="primary">
                    login
                </Button>
            </div>
            <div className="container-forgot-password">
                <Link to='/register'>Forgot password?</Link>
            </div>
            <div className="container-register">
                <p>Need an account? <Link to='/register'>register</Link></p>
            </div>
        </div>

    </div>
}


export default Login;