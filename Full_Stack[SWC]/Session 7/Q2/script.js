const { useState } = React;

function App() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        } else if (
            !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)
        ) {
            newErrors.password =
                "Password must be at least 8 characters and contain a number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            alert("Form Submitted Successfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>User Registration</h2>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <small className="error">
                    {errors.name}
                </small>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <small className="error">
                    {errors.email}
                </small>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <small className="error">
                    {errors.password}
                </small>
            </div>

            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <small className="error">
                    {errors.address}
                </small>
            </div>

            <button type="submit">
                Submit
            </button>
        </form>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);