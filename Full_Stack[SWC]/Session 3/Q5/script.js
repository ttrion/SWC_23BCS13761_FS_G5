const { useState, useEffect } = React;

function App() {

    const products = [
        {
            id: 1,
            name: "iPhone 15",
            price: 80000,
            image: "https://picsum.photos/200?1"
        },
        {
            id: 2,
            name: "Samsung TV",
            price: 45000,
            image: "https://picsum.photos/200?2"
        },
        {
            id: 3,
            name: "Laptop",
            price: 65000,
            image: "https://picsum.photos/200?3"
        },
        {
            id: 4,
            name: "Headphones",
            price: 5000,
            image: "https://picsum.photos/200?4"
        }
    ];

    const [maxPrice, setMaxPrice] =
        useState(100000);

    const [cart, setCart] = useState(() => {

        return JSON.parse(
            localStorage.getItem("amazonCart")
        ) || [];
    });

    useEffect(() => {

        localStorage.setItem(
            "amazonCart",
            JSON.stringify(cart)
        );

    }, [cart]);

    const addToCart = product => {

        const existing = cart.find(
            item => item.id === product.id
        );

        if (existing) {

            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity + 1
                          }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1
                }
            ]);
        }
    };

    const increaseQty = id => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                          ...item,
                          quantity:
                              item.quantity + 1
                      }
                    : item
            )
        );
    };

    const decreaseQty = id => {

        setCart(
            cart
                .map(item =>
                    item.id === id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity - 1
                          }
                        : item
                )
                .filter(
                    item => item.quantity > 0
                )
        );
    };

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    const filteredProducts =
        products.filter(
            product =>
                product.price <= maxPrice
        );

    return (
        <div className="container">

            <div className="products-section">

                <h1>
                    Amazon Store
                </h1>

                <div className="filter">

                    <label>
                        Max Price:
                        ₹{maxPrice}
                    </label>

                    <input
                        type="range"
                        min="0"
                        max="100000"
                        step="1000"
                        value={maxPrice}
                        onChange={e =>
                            setMaxPrice(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />

                </div>

                <div className="products">

                    {filteredProducts.map(
                        product => (

                            <div
                                key={product.id}
                                className="card"
                            >

                                <img
                                    src={
                                        product.image
                                    }
                                    alt=""
                                />

                                <h3>
                                    {
                                        product.name
                                    }
                                </h3>

                                <p>
                                    ₹
                                    {
                                        product.price
                                    }
                                </p>

                                <button
                                    onClick={() =>
                                        addToCart(
                                            product
                                        )
                                    }
                                >
                                    Add To Cart
                                </button>

                            </div>
                        )
                    )}

                </div>

            </div>

            <div className="cart-sidebar">

                <h2>Cart</h2>

                {cart.length === 0 && (
                    <p>
                        Cart Empty
                    </p>
                )}

                {cart.map(item => (

                    <div
                        key={item.id}
                        className="cart-item"
                    >

                        <div>

                            <h4>
                                {
                                    item.name
                                }
                            </h4>

                            <p>
                                ₹
                                {
                                    item.price
                                }
                            </p>

                        </div>

                        <div>

                            <button
                                onClick={() =>
                                    decreaseQty(
                                        item.id
                                    )
                                }
                            >
                                -
                            </button>

                            <span>
                                {
                                    item.quantity
                                }
                            </span>

                            <button
                                onClick={() =>
                                    increaseQty(
                                        item.id
                                    )
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>
                ))}

                <div className="total">

                    <h3>
                        Total:
                        ₹{totalPrice}
                    </h3>

                </div>

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