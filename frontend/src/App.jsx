
import { useEffect, useState } from "react";

const API = "/api";

function App() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        customer_name: "",
        address: "",
        area: "Adyar",
        package_weight: "1"
    });

    async function loadOrders() {
        try {
            const response = await fetch(`${API}/orders`);
            if (!response.ok) throw new Error("API error");
            setOrders(await response.json());
        } catch {
            setMessage("Unable to connect to the delivery server.");
        }
    }

    useEffect(() => {
        loadOrders();
    }, []);

    async function addOrder(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || "Unable to create order");
                return;
            }

            setMessage("Delivery order created successfully!");

            setForm({
                customer_name: "",
                address: "",
                area: "Adyar",
                package_weight: "1"
            });

            loadOrders();

        } catch {
            setMessage("Server connection failed.");
        }
    }

    return (
        <main className="container">

            <header>
                <p className="label">LOGISTICS MANAGEMENT SYSTEM</p>
                <h1>Last-Mile Delivery</h1>
                <p>Manage delivery orders and operations.</p>
            </header>

            {message && <p className="message">{message}</p>}

            <section className="card">
                <h2>Create Delivery Order</h2>

                <form onSubmit={addOrder}>

                    <label>Customer Name</label>
                    <input
                        required
                        value={form.customer_name}
                        onChange={e => setForm({
                            ...form,
                            customer_name: e.target.value
                        })}
                    />

                    <label>Delivery Address</label>
                    <input
                        required
                        value={form.address}
                        onChange={e => setForm({
                            ...form,
                            address: e.target.value
                        })}
                    />

                    <label>Delivery Area</label>
                    <select
                        value={form.area}
                        onChange={e => setForm({
                            ...form,
                            area: e.target.value
                        })}
                    >
                        <option>Central</option>
                        <option>T_Nagar</option>
                        <option>Adyar</option>
                        <option>Velachery</option>
                        <option>Anna_Nagar</option>
                        <option>Tambaram</option>
                    </select>

                    <label>Package Weight (kg)</label>
                    <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        required
                        value={form.package_weight}
                        onChange={e => setForm({
                            ...form,
                            package_weight: e.target.value
                        })}
                    />

                    <button type="submit">Add Delivery</button>
                </form>
            </section>

            <section className="card">
                <div className="section-heading">
                    <h2>Delivery Orders</h2>
                    <button onClick={loadOrders}>Refresh</button>
                </div>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Area</th>
                                <th>Weight</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.area}</td>
                                    <td>{order.package_weight} kg</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}

                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="5">
                                        No delivery orders available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

        </main>
    );
}

export default App;
