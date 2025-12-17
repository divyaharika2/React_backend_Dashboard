import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const firmId = localStorage.getItem("firmId");

    const productsHandler = async () => {
        if (!firmId) {
            setError("No firm found. Please add a firm first.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/product/${firmId}/products`
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            // SAFETY: handle different backend responses
            if (Array.isArray(data)) {
                setProducts(data);
            } else if (Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
            }

        } catch (err) {
            console.error("Failed to fetch products", err);
            setError("Unable to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        productsHandler();
    }, [firmId]); // 👈 IMPORTANT dependency

    const deleteProductById = async (productId) => {
        try {
            const confirmDelete = window.confirm(
                "Are you sure you want to delete?"
            );
            if (!confirmDelete) return;

            const response = await fetch(
                `${API_URL}/product/${productId}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setProducts((prev) =>
                prev.filter((product) => product._id !== productId)
            );
            alert("Product deleted successfully");

        } catch (error) {
            console.error("Failed to delete product", error);
            alert("Failed to delete product");
        }
    };

    /* ===============================
       RENDER STATES
    =============================== */
    if (loading) {
        return <p style={{ padding: "20px" }}>Loading products...</p>;
    }

    if (error) {
        return (
            <p style={{ padding: "20px", color: "red" }}>
                {error}
            </p>
        );
    }

    return (
        <div className="allProductSection">
            {products.length === 0 ? (
                <div className="emptyState">
                    <p>Please create your firm to start adding products.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>₹{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img
                                                src={`${API_URL}/uploads/${item.image}`}
                                                alt={item.productName}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => deleteProductById(item._id)}
                                            className="deleteBtn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
