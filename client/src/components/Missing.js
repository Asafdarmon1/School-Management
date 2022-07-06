import React from 'react'
import { useNavigate } from 'react-router-dom';
const Missing = () => {

    const navigate = useNavigate();

    const goBack = () => navigate(-1); //go back to the previous page

    return (
        <section>
            <h1>Missing</h1>
            <br />
            <p>Missing page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Missing