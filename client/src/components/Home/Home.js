import { Link } from "react-router-dom";

const Home = () => {


    return (
        <section className="App">
            <h1>Home</h1>
            <br />
            <p>Welcome To Home Page</p>
            <br />
            <Link to="/TeacherDash">Go to the Teacher page</Link>
            <br />
            <Link to="/StudentDash">Go to the Student page</Link>
        </section>
    )
}

export default Home