const { useState } = React;

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
        /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    let emailError = "";
    let passwordError = "";

    if (email && !emailPattern.test(email)) {
        emailError = "Enter a valid email";
    }

    if (password && !passwordPattern.test(password)) {
        passwordError =
            "Password must be 8+ chars, include a number and special character";
    }

    const isValid =
        emailPattern.test(email) &&
        passwordPattern.test(password);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isValid) {
            alert("Form Submitted Successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login Form</h2>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <small className="error">
                    {emailError}
                </small>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <small className="error">
                    {passwordError}
                </small>
            </div>

            <button type="submit" disabled={!isValid}>
                Login
            </button>
        </form>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);