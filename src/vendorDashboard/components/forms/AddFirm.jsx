import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";
import { ThreeCircles } from "react-loader-spinner";

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleRegionChange = (e) => {
    const value = e.target.value;
    setRegion((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      if (file) formData.append("image", file);

      category.forEach((c) => formData.append("category", c));
      region.forEach((r) => formData.append("region", r));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ STORE EVERYTHING
        localStorage.setItem("firmId", data.firmId);
        localStorage.setItem("firmName", data.vendorFirmName);

        if (data.firmImage) {
          localStorage.setItem("firmImage", data.firmImage);
        }

        alert("Firm added successfully");

        // ✅ RESET FORM
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);

        // ❌ DO NOT reload page
      } else {
        alert(data.message || "Failed to add firm");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add firm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading ? (
        <div className="loaderSection">
          <ThreeCircles height={100} width={100} color="#4fa94d" />
        </div>
      ) : (
        <form className="tableForm" onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>

          <label>Firm Name</label>
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
            placeholder="Enter Restaurant Name"
            required
          />

          <label>Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter Area"
            required
          />

          <div className="checkInp">
            <label>Category</label>
            <div className="inputsContainer">
              <label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
                Veg
              </label>
              <label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
                Non-Veg
              </label>
            </div>
          </div>

          <label>Offer</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="Enter offers"
          />

          <div className="checkInp">
            <label>Region</label>
            <div className="inputsContainer">
              {["south-indian", "north-indian", "chinese", "italian"].map(
                (r) => (
                  <label key={r}>
                    <input
                      type="checkbox"
                      value={r}
                      checked={region.includes(r)}
                      onChange={handleRegionChange}
                    />
                    {r}
                  </label>
                )
              )}
            </div>
          </div>

          <label>Firm Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
