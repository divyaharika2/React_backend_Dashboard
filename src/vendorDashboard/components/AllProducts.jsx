import React, {useState, useEffect} from 'react'
import {API_URL} from '../data/apiPath';

const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const productsHandler = async() =>{
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData.products)
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert('failed to fetch products')
        }
    }

    useEffect(()=>{
        productsHandler()
        console.log('this is useEffect')
    }, [])


    const deleteProductById = async(productId) =>{
        const isConfirmed = confirm("Are you sure you want to delete?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method: 'DELETE'
            });
            if(response.ok){
                setProducts(products.filter(product => product._id !== productId))
                alert("product deleted successfully")

            }
           
        } catch (error) {
            console.error("failed to delete product")
            alert("failed to delete product")
        }
    }

  return (
    <div className='allProductsSection'>
      {!products ?(
        <p>No Products Added</p>
      ) : (
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
                {products.map((item)=>{
                    return(
                        <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.image && (<img src={`${API_URL}/uploads/${item.image}`}
                                alt={item.productName}
                                style={{width:'100px', height:'100px'}}/>)}
                                </td>
                                <td>
                                    <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                                </td>
                            </tr>
                        </>
                    )
                })}
            </tbody>
        </table>
      )}
    </div>
  )
}

export default AllProducts
