import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For success/error messages

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleBestSeller = (event) => {
    setBestSeller(event.target.value === 'true');
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic validation
    if (!productName.trim() || !price.trim()) {
      setMessage("Please fill in all required fields: Product Name and Price.");
      return;
    }

    // Optional: Validate price is numeric
    if (isNaN(price) || Number(price) <= 0) {
      setMessage("Please enter a valid positive number for Price.");
      return;
    }

    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        setMessage("User not authenticated or firm not selected. Please login again.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('bestSeller', bestSeller);
      if (image) formData.append('image', image);

      category.forEach((value) => formData.append('category', value));

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: { token: loginToken }, // Add token header for authentication if needed
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form fields
        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setImage(null);
        setDescription("");
        setMessage("Product added successfully!");
         window.location.reload()
      } else {
        setMessage(data.message || "Failed to add product. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to add product due to network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="productSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles visible height={100} width={100} color="#4fa94d" />
          <p>Please wait, your product is being added...</p>
        </div>
      )}

      {!loading && (
        <form className="tableForm" onSubmit={handleAddProduct}>
          <h3>Add Product</h3>

          {message && (
            <div
              className={
                message.toLowerCase().includes("success")
                  ? "message-success"
                  : "message-error"
              }
              role="alert"
            >
              {message}
            </div>
          )}

          <label>Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            placeholder="Enter product name"
          />

          <label>Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Enter product price"
          />

          <div className="checkInp">
            <label>Category</label>
            <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes('veg')}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes('non-veg')}
                  onChange={handleCategoryChange}
                />
              </div>
            </div>
          </div>

          <div className="checkInp">
            <label>Best Seller</label>
            <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input
                  type="radio"
                  value="true"
                  checked={bestSeller === true}
                  onChange={handleBestSeller}
                />
              </div>
              <div className="checkboxContainer">
                <label>No</label>
                <input
                  type="radio"
                  value="false"
                  checked={bestSeller === false}
                  onChange={handleBestSeller}
                />
              </div>
            </div>
          </div>

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />

          <label>Product Image</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" />

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
