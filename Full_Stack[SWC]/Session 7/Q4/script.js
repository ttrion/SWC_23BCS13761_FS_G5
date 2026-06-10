const { useState } = React;

function App() {
    const songs = [
        {
            id: 1,
            title: "Blinding Lights",
            artist: "The Weeknd",
            image: "https://picsum.photos/id/237/300/300"
        },
        {
            id: 2,
            title: "Levitating",
            artist: "Dua Lipa",
            image: "https://picsum.photos/id/238/300/300"
        },
        {
            id: 3,
            title: "Shape of You",
            artist: "Ed Sheeran",
            image: "https://picsum.photos/id/239/300/300"
        },
        {
            id: 4,
            title: "Stay",
            artist: "Justin Bieber",
            image: "https://picsum.photos/id/240/300/300"
        }
    ];

    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const togglePlayPause = () => {
        if (currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <div className="app">
                <div className="sidebar">
                    <h2>Spotify</h2>

                    <ul>
                        <li>Home</li>
                        <li>Search</li>
                        <li>Your Library</li>
                        <li>Playlists</li>
                    </ul>
                </div>

                <div className="content">
                    <h2>Popular Songs</h2>

                    <div className="playlist">
                        {songs.map(song => (
                            <div
                                className="song-card"
                                key={song.id}
                            >
                                <img
                                    src={song.image}
                                    alt={song.title}
                                />

                                <h4>{song.title}</h4>

                                <p>{song.artist}</p>

                                <button
                                    onClick={() =>
                                        playSong(song)
                                    }
                                >
                                    Play
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="player">
                <div className="now-playing">
                    {currentSong
                        ? `${currentSong.title} - ${currentSong.artist}`
                        : "No song selected"}
                </div>

                <button onClick={togglePlayPause}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>
        </>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);