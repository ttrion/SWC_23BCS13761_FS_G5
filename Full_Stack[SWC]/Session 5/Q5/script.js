const { useState, useEffect } = React;

function App() {

    const menuItems = [
        {
            id: 1,
            name: "Veg Burger",
            price: 120
        },
        {
            id: 2,
            name: "Pizza",
            price: 250
        },
        {
            id: 3,
            name: "Pasta",
            price: 180
        }
    ];

    const addons = [
        {
            name: "Extra Cheese",
            price: 40
        },
        {
            name: "Coke",
            price: 30
        },
        {
            name: "French Fries",
            price: 60
        }
    ];

    const [cart, setCart] = useState(() => {

        return JSON.parse(
            localStorage.getItem("cart")
        ) || [];
    });

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    const addToCart = (
        item,
        selectedAddon
    ) => {

        const addonPrice =
            selectedAddon
                ? selectedAddon.price
                : 0;

        const existing = cart.find(
            product =>
                product.id === item.id &&
                product.addon?.name ===
                selectedAddon?.name
        );

        if (existing) {

            setCart(
                cart.map(product =>
                    product === existing
                        ? {
                              ...product,
                              quantity:
                                  product.quantity +
                                  1
                          }
                        : product
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...item,
                    addon:
                        selectedAddon || null,
                    quantity: 1,
                    finalPrice:
                        item.price +
                        addonPrice
                }
            ]);
        }
    };

    const increaseQty = index => {

        const updated = [...cart];

        updated[index].quantity++;

        setCart(updated);
    };

    const decreaseQty = index => {

        const updated = [...cart];

        if (
            updated[index].quantity === 1
        ) {
            updated.splice(index, 1);
        } else {
            updated[index].quantity--;
        }

        setCart(updated);
    };

    const getTotal = () => {

        return cart.reduce(
            (sum, item) =>
                sum +
                item.finalPrice *
                item.quantity,
            0
        );
    };

    return (
        <div className="container">

            <h1>
                Swiggy/Zomato Ordering Flow
            </h1>

            <div className="restaurant">

                <h2>
                    Restaurant Menu
                </h2>

                {menuItems.map(item => (

                    <MenuCard
                        key={item.id}
                        item={item}
                        addons={addons}
                        addToCart={
                            addToCart
                        }
                    />

                ))}

            </div>

            <div className="cart">

                <h2>Cart</h2>

                {cart.length === 0 && (
                    <p>
                        Cart is Empty
                    </p>
                )}

                {cart.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}
                            className="cart-item"
                        >

                            <div>

                                <h4>
                                    {
                                        item.name
                                    }
                                </h4>

                                {item.addon && (
                                    <small>
                                        Add-on:
                                        {" "}
                                        {
                                            item
                                                .addon
                                                .name
                                        }
                                    </small>
                                )}

                            </div>

                            <div>

                                <button
                                    onClick={() =>
                                        decreaseQty(
                                            index
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
                                            index
                                        )
                                    }
                                >
                                    +
                                </button>

                            </div>

                        </div>
                    )
                )}

                <div className="summary">

                    <h3>
                        Order Summary
                    </h3>

                    <p>
                        Total:
                        ₹{getTotal()}
                    </p>

                </div>

            </div>

        </div>
    );
}

function MenuCard({
    item,
    addons,
    addToCart
}) {

    const [
        selectedAddon,
        setSelectedAddon
    ] = useState(null);

    return (
        <div className="menu-card">

            <h3>{item.name}</h3>

            <p>
                ₹{item.price}
            </p>

            <select
                onChange={e => {

                    const addon =
                        addons.find(
                            a =>
                                a.name ===
                                e.target.value
                        );

                    setSelectedAddon(
                        addon
                    );
                }}
            >

                <option value="">
                    Select Add-on
                </option>

                {addons.map(
                    addon => (

                        <option
                            key={
                                addon.name
                            }
                            value={
                                addon.name
                            }
                        >
                            {
                                addon.name
                            }
                            (+₹
                            {
                                addon.price
                            }
                            )
                        </option>
                    )
                )}

            </select>

            <button
                onClick={() =>
                    addToCart(
                        item,
                        selectedAddon
                    )
                }
            >
                Add To Cart
            </button>

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