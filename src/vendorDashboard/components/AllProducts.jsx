import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const firmId = localStorage.getItem("firmId");
  const token = localStorage.getItem("loginToken");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!firmId) {
        setError("No firm found. Please add a firm first.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/product/${firmId}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
          ? data.products
          : [];

        setProducts(list);
      } catch (err) {
        console.error(err);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [firmId, token]);

  const deleteProductById = async (productId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const response = await fetch(
        `${API_URL}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Delete failed");

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      alert("Product deleted successfully");
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading products...</p>;

  if (error)
    return (
      <div className="emptyState">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="allProductSection">
      {products.length === 0 ? (
        <div className="emptyState">
          <p>No products added yet</p>
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
              {products.map((item) => {
                // ✅ IMAGE PATH FIX
                const imageUrl = item.image?.startsWith("/uploads")
                  ? `${API_URL}${item.image}`
                  : `${API_URL}/uploads/${item.image}`;

                return (
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>₹{item.price}</td>
                    <div className="Allimagesection">
                    <td>
                      {item.image ? (
                        <img
                          src={imageUrl}
                          alt={item.productName}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    </div>

                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => deleteProductById(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
