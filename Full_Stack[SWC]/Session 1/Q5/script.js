const { useState, useEffect } = React;

function App() {

    const [darkMode, setDarkMode] =
        useState(
            JSON.parse(
                localStorage.getItem(
                    "linkedinTheme"
                )
            ) || false
        );

    const [posts, setPosts] =
        useState([]);

    useEffect(() => {

        localStorage.setItem(
            "linkedinTheme",
            JSON.stringify(darkMode)
        );

    }, [darkMode]);

    useEffect(() => {

        loadPosts();

    }, []);

    useEffect(() => {

        const handleScroll = () => {

            if (
                window.innerHeight +
                    window.scrollY >=
                document.body.offsetHeight -
                    100
            ) {

                loadPosts();
            }
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );

    }, [posts]);

    function loadPosts() {

        const newPosts = [];

        for (
            let i = 0;
            i < 5;
            i++
        ) {

            newPosts.push({
                id:
                    Date.now() +
                    Math.random(),

                author:
                    "Professional " +
                    Math.floor(
                        Math.random() * 100
                    ),

                content:
                    "Excited to share my latest project and career journey on LinkedIn 🚀"
            });
        }

        setPosts(prev => [
            ...prev,
            ...newPosts
        ]);
    }

    const suggestions = [
        {
            name: "Emma Watson",
            role:
                "Frontend Developer"
        },
        {
            name: "John Smith",
            role:
                "UI/UX Designer"
        },
        {
            name: "Sophia Lee",
            role:
                "Product Manager"
        },
        {
            name: "David Miller",
            role:
                "Software Engineer"
        }
    ];

    return (
        <div
            className={
                darkMode
                    ? "app dark"
                    : "app light"
            }
        >

            <header>

                <h1>LinkedIn</h1>

                <button
                    onClick={() =>
                        setDarkMode(
                            !darkMode
                        )
                    }
                >
                    {darkMode
                        ? "☀ Light"
                        : "🌙 Dark"}
                </button>

            </header>

            <div className="layout">

                <aside className="profile">

                    <img
                        src="https://i.pravatar.cc/150"
                        alt=""
                    />

                    <h2>
                        Alex Johnson
                    </h2>

                    <p>
                        Full Stack
                        Developer
                    </p>

                    <p>
                        Mumbai, India
                    </p>

                </aside>

                <main className="feed">

                    <div className="section-title">
                        Activity Feed
                    </div>

                    {posts.map(post => (

                        <div
                            key={post.id}
                            className="post"
                        >

                            <h3>
                                {
                                    post.author
                                }
                            </h3>

                            <p>
                                {
                                    post.content
                                }
                            </p>

                        </div>
                    ))}

                </main>

                <aside className="sidebar">

                    <div className="section-title">
                        People You May Know
                    </div>

                    {suggestions.map(
                        (
                            person,
                            index
                        ) => (

                            <div
                                key={index}
                                className="person"
                            >

                                <img
                                    src={`https://i.pravatar.cc/100?img=${index + 10}`}
                                    alt=""
                                />

                                <div>

                                    <h4>
                                        {
                                            person.name
                                        }
                                    </h4>

                                    <p>
                                        {
                                            person.role
                                        }
                                    </p>

                                    <button>
                                        Connect
                                    </button>

                                </div>

                            </div>
                        )
                    )}

                </aside>

            </div>

        </div>
    );
}

ReactDOM
    .createRoot(
        document.getElementById(
            "root"
        )
    )
    .render(<App />);