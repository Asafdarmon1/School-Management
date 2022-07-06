import { React , useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthProvider";

function Student() {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        navigate('/login');
    }


    return (
        <div>
            <h1>
                Wellcome to Student Page
            </h1>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    )

}

export default Student