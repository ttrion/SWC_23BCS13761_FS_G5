const { useState } = React;

const suggestionsData = [
    "Apple",
    "Amazon",
    "Adobe",
    "Angular",
    "Bootstrap",
    "CSS",
    "ChatGPT",
    "Docker",
    "Express",
    "Git",
    "Google",
    "Java",
    "JavaScript",
    "MongoDB",
    "NodeJS",
    "React",
    "Redux",
    "TypeScript",
    "Vue"
];

function App() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const filtered = suggestionsData.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filtered);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!suggestions.length) return;

        if (e.key === "ArrowDown") {
            setSelectedIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        }

        if (e.key === "ArrowUp") {
            setSelectedIndex(prev =>
                prev > 0 ? prev - 1 : prev
            );
        }

        if (e.key === "Enter" && selectedIndex >= 0) {
            setQuery(suggestions[selectedIndex]);
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="container">
            <h1>Autocomplete Search</h1>

            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="search-input"
            />

            {suggestions.length > 0 && (
                <div className="suggestions">
                    {suggestions.map((item, index) => (
                        <div
                            key={item}
                            className={
                                index === selectedIndex
                                    ? "suggestion active"
                                    : "suggestion"
                            }
                            onClick={() =>
                                handleSuggestionClick(item)
                            }
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);