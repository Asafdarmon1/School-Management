import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section className="App">
            <h1>Links</h1>
            <br />
            <h2>Private</h2>
            <Link to="/home">Home</Link>
            <br />
            <Link to="/TeacherDash">Teacher Page</Link>
            <br />
            <Link to="/StudentDash">Student Page</Link>
        </section>
    )
}

export default LinkPage