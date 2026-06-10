const { useState } = React;

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [editId, setEditId] = useState(null);

    const addTask = () => {
        if (task.trim() === "") return;

        if (editId !== null) {
            setTasks(
                tasks.map(t =>
                    t.id === editId
                        ? { ...t, text: task }
                        : t
                )
            );
            setEditId(null);
        } else {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    text: task,
                    completed: false
                }
            ]);
        }

        setTask("");
    };

    const deleteTask = id => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const editTask = item => {
        setTask(item.text);
        setEditId(item.id);
    };

    const toggleTask = id => {
        setTasks(
            tasks.map(t =>
                t.id === id
                    ? { ...t, completed: !t.completed }
                    : t
            )
        );
    };

    return (
        <div className="container">
            <h2>Task Manager</h2>

            <div className="input-group">
                <input
                    type="text"
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    placeholder="Enter task"
                />

                <button onClick={addTask}>
                    {editId ? "Update" : "Add"}
                </button>
            </div>

            {tasks.map(item => (
                <div className="task" key={item.id}>
                    <span
                        className={
                            item.completed
                                ? "completed"
                                : ""
                        }
                    >
                        {item.text}
                    </span>

                    <div className="actions">
                        <button
                            onClick={() =>
                                toggleTask(item.id)
                            }
                        >
                            {item.completed
                                ? "Undo"
                                : "Done"}
                        </button>

                        <button
                            onClick={() =>
                                editTask(item)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                deleteTask(item.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);