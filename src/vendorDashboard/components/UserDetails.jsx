import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";

const UserDetails = () => {
  const [username, setUsername] = useState("—");
  const [email, setEmail] = useState("—");
  const [firmName, setFirmName] = useState("Not added yet");
  const [firmImage, setFirmImage] = useState(null);
  const [productCount, setProductCount] = useState(0);

  const firmId = localStorage.getItem("firmId");
  const token = localStorage.getItem("loginToken");

  /* ===============================
     LOAD USER + FIRM DATA
  =============================== */
  useEffect(() => {
    setUsername(localStorage.getItem("username") || "—");
    setEmail(localStorage.getItem("email") || "—");
    setFirmName(localStorage.getItem("firmName") || "Not added yet");
    setFirmImage(localStorage.getItem("firmImage"));
  }, []);

  /* ===============================
     FETCH PRODUCT COUNT
  =============================== */
  useEffect(() => {
    const fetchProductCount = async () => {
      if (!firmId) {
        setProductCount(0);
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

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];

        setProductCount(products.length);
      } catch (error) {
        console.error("Failed to fetch product count", error);
        setProductCount(0);
      }
    };

    fetchProductCount();
  }, [firmId, token]);

  const imageUrl =
    firmImage && firmImage !== "null"
      ? `${API_URL}/uploads/${firmImage}`
      : null;

  return (
    <section className="userSection">
      <div className="userCard">
        <h3>User Details</h3>

        {/* Restaurant Image */}
        <div className="restaurantImage">
          {imageUrl ? (
            <img src={imageUrl} alt="Restaurant" />
          ) : (
            <p className="noImage">No restaurant image</p>
          )}
        </div>

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

        {/* ✅ PRODUCT COUNT */}
        <div className="userRow">
          <span>Total Products</span>
          <p>{productCount}</p>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
