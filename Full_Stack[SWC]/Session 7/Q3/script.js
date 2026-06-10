const { createStore, applyMiddleware } = Redux;
const { Provider, useDispatch, useSelector } = ReactRedux;
const thunk = ReduxThunk.default;

const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";

const fetchRequest = () => ({
    type: FETCH_REQUEST
});

const fetchSuccess = (data) => ({
    type: FETCH_SUCCESS,
    payload: data
});

const fetchError = (error) => ({
    type: FETCH_ERROR,
    payload: error
});

const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetchRequest());

        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );

            const data = await response.json();

            dispatch(fetchSuccess(data.slice(0, 10)));
        } catch (error) {
            dispatch(fetchError("Failed to fetch data"));
        }
    };
};

const initialState = {
    loading: false,
    data: [],
    error: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            };

        case FETCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ""
            };

        case FETCH_ERROR:
            return {
                loading: false,
                data: [],
                error: action.payload
            };

        default:
            return state;
    }
};

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

function App() {
    const dispatch = useDispatch();

    const { loading, data, error } =
        useSelector(state => state);

    return (
        <div className="container">
            <h2>Movie Content Loader</h2>

            <button
                onClick={() => dispatch(fetchPosts())}
            >
                Fetch Data
            </button>

            {loading && (
                <p className="loading">
                    Loading...
                </p>
            )}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {!loading && !error && data.length > 0 && (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                            {item.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <Provider store={store}>
        <App />
    </Provider>
);