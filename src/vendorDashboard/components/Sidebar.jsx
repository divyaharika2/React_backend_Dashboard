import React from "react";

const Sidebar = ({
  isOpen,
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showUserHandler,
  showFirmTitle
}) => {
  return (
    <div className={`sideBarSection ${isOpen ? "open" : ""}`}>
      <ul>
        {showFirmTitle && (
          <li onClick={showFirmHandler}>Add Firm</li>
        )}
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={showUserHandler}>User Details</li>
      </ul>
    </div>
  );
};

export default Sidebar;
