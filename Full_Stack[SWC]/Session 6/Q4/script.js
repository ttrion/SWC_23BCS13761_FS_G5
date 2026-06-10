const { useState } = React;

function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const handleLike = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }

        setLiked(!liked);
    };

    const addComment = () => {
        if (comment.trim() === "") return;

        setComments([...comments, comment]);
        setComment("");
    };

    return (
        <div className="post">
            <div className="post-header">
                {post.username}
            </div>

            <img src={post.image} alt="post" />

            <div className="post-content">

                <div className="actions">
                    <button onClick={handleLike}>
                        {liked ? "Unlike" : "Like"}
                    </button>

                    <button>
                        Comment
                    </button>

                    <button
                        onClick={() =>
                            setSaved(!saved)
                        }
                    >
                        {saved ? "Saved" : "Save"}
                    </button>
                </div>

                <p>{likes} Likes</p>

                <p>{post.caption}</p>

                <div className="comment-section">
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                    />

                    <button onClick={addComment}>
                        Post
                    </button>

                    {comments.map((item, index) => (
                        <div
                            className="comment"
                            key={index}
                        >
                            {item}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

function App() {
    const posts = [
        {
            id: 1,
            username: "john_doe",
            image:
                "https://picsum.photos/id/1015/600/400",
            caption: "Beautiful mountain view!",
            likes: 120
        },
        {
            id: 2,
            username: "emma_watson",
            image:
                "https://picsum.photos/id/1025/600/400",
            caption: "Enjoying the weekend.",
            likes: 85
        },
        {
            id: 3,
            username: "alex_smith",
            image:
                "https://picsum.photos/id/1035/600/400",
            caption: "Travel diaries.",
            likes: 150
        }
    ];

    return (
        <div className="container">
            <h2>Instagram Feed</h2>

            {posts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);