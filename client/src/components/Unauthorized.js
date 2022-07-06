import { React , useContext } from "react";
import { useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthProvider";

const Unauthorized = () => {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const goBack = () => {
        navigate('/home'); //go back to login page
    }

    return (
        <section className="App">
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized