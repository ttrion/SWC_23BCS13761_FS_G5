const { useState, useEffect } = React;

async function fetchWithRetry(url, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.log(`Attempt ${attempt} failed`);

            if (attempt === retries) {
                throw error;
            }

            // wait before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                const result = await fetchWithRetry(
                    "https://jsonplaceholder.typicode.com/users/1",
                    3
                );

                setData(result);
            } catch (err) {
                setError(
                    "Failed to fetch data after 3 retry attempts."
                );
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div className="container">
            <h1>API Retry Example</h1>

            {loading && (
                <div className="loading">
                    Loading...
                </div>
            )}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {data && (
                <div className="card">
                    <h2>{data.name}</h2>
                    <p>Email: {data.email}</p>
                    <p>Phone: {data.phone}</p>
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);