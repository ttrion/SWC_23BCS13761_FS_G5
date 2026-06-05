const { useState, useEffect } = React;

function UserCard({ user }) {
    return (
        <div className="card">
            <h2>{user.name}</h2>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Phone:</strong> {user.phone}
            </p>
            <p>
                <strong>Company:</strong> {user.company.name}
            </p>
        </div>
    );
}

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                const data = await response.json();

                setTimeout(() => {
                    setUsers(data);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    return (
        <div className="container">
            <h1>User Dashboard</h1>

            {loading ? (
                <div className="loader">Loading users...</div>
            ) : (
                <div className="card-grid">
                    {users.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);