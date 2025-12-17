import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const UserDetails = () => {
  const username = localStorage.getItem("username") || "—";
  const email = localStorage.getItem("email") || "—";
  const firmName = localStorage.getItem("firmName") || "Not added yet";
  const firmId = localStorage.getItem("firmId");

  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductCount = async () => {
      if (!firmId) {
        setProductCount(0);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/product/${firmId}/products`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setProductCount(data.length);
        } else if (Array.isArray(data.products)) {
          setProductCount(data.products.length);
        } else {
          setProductCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch product count", error);
        setProductCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProductCount();
  }, [firmId]);

  return (
    <section className="userSection">
      <div className="userCard">
        <h3>User Details</h3>

        <div className="userRow">
          <span>Name</span>
          <p>{username}</p>
        </div>

        <div className="userRow">
          <span>Email</span>
          <p>{email}</p>
        </div>

        <div className="userRow">
          <span>Restaurant</span>
          <p>{firmName}</p>
        </div>

        <div className="userRow">
          <span>Total Products</span>
          <p>
            {loading ? "Loading..." : productCount}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
