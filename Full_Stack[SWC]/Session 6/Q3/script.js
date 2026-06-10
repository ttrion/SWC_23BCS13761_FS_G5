const { useState, useEffect } = React;

function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = () => {
        setCurrentIndex(
            (prev) => (prev + 1) % images.length
        );
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prev) =>
                (prev - 1 + images.length) %
                images.length
        );
    };

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(timer);
    }, [isPaused]);

    return (
        <div
            className="carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <img
                src={images[currentIndex]}
                alt="Product"
            />

            <div className="controls">
                <button onClick={prevSlide}>
                    Previous
                </button>

                <button onClick={nextSlide}>
                    Next
                </button>
            </div>
        </div>
    );
}

function App() {
    const images = [
        "https://picsum.photos/id/1015/600/300",
        "https://picsum.photos/id/1025/600/300",
        "https://picsum.photos/id/1035/600/300",
        "https://picsum.photos/id/1045/600/300"
    ];

    return (
        <Carousel images={images} />
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);