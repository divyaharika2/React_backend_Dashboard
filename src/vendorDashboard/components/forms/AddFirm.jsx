import React, {useState} from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
    const [firmName, setFirmName] = useState("");
    const[area, setArea] = useState("");
    const[category, setCategory] = useState([]);
    const[region,setRegion] = useState([]);
    const[offer, setOffer] = useState("");
    const[file, setFile] = useState(null);


    const handleCategoryChange = (event) =>{
        const value = event.target.value;
        if(category.includes(value)){
            setCategory(category.filter((item)=> item !== value));
        }else{
            setCategory([...category, value])
        }
    };

     const handleRegionChange = (event) =>{
        const value = event.target.value;
        if(region.includes(value)){
            setRegion(region.filter((item)=> item !== value));
        }else{
            setRegion([...region, value])
        }
    };

      const handleImageUpload = (event)=>{
        const selectedImage = event.target.files[0];
        setFile(selectedImage);

    };

    const handleFirmSubmit = async(e)=>{
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('loginToken');
            if(!loginToken){
                console.error("user not authenticated");
                alert("User not authenticated");
                return;

            }
            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file)

            category.forEach((value)=>{
                formData.append('category', value);
                 
            })

            region.forEach((value)=>{
                formData.append('region',value);
            })
            const response = await fetch(`${API_URL}/firm/add-firm`,{
               method : 'POST',
               headers: {
               'token': `${loginToken}`
               },
                body: formData
            })

            const data = await response.json();

            if(response.ok){
                console.log(data);
                setFirmName("");
                setArea("");
                setCategory([]);
                setRegion([]);
                setOffer("");
                setFile(null);
                alert("Firm added Successfully");
                console.log("this is firmId", data.firmId);
                const firmId = data.firmId;
                localStorage.setItem('firmId',firmId)

            }else if(data.message === "vendor can have only one firm"){
                alert("Firm Exists 🚨. Only 1 firm can be added")
                console.log("Firm Exists 🚨. Please check your data.")
            }else{
                console.error("Error:", data.message || "Unknown error");
                alert("Something went wrong. Try again later.");
            }
            const mango = data.firmId;
            const vendorRestuarant = data.vendorFirmName

            localStorage.setItem('firmId', mango);
            localStorage.setItem('firmName', vendorRestuarant)
            window.location.reload()
            
        } catch (error) {
            console.error("Failed to add Firm:", error);
            alert("Something went wrong. Please try again later.");
        }
    }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h2>Add Firm</h2>

            <label>Firm Name</label>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>

            <label>Area</label>
            <input type="text" name='area'  value={area} onChange={(e)=>setArea(e.target.value)}/>

            <div className="checkInp">
                <label>Category</label>
                <div className="boxContainer">
                    <div className="checkboxContainer">
                        <label>Veg</label>
                        <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
                    </div>
                    <div className="checkboxContainer">
                        <label>Non-Veg</label>
                        <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
                    </div>
                </div>
            </div>

            <label>Offer</label>
            <input type="text" name='offer'  value={offer} onChange={(e)=>setOffer(e.target.value)}/>

            <div className="checkInp">
                <label>Region</label>
                <div className="boxContainer">
                    <div className="regionboxContainer">
                        <label>South India</label>
                        <input type="checkbox" value="south-india" checked={region.includes('south-india')} onChange={handleRegionChange} />
                    </div>
                    <div className="regionboxContainer">
                        <label>North India</label>
                        <input type="checkbox" value="north-india" checked={region.includes('north-india')}  onChange={handleRegionChange} />
                    </div>
                    <div className="regionboxContainer">
                        <label>Chinese</label>
                        <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} />
                    </div>
                    <div className="regionboxContainer">
                        <label>Bakery</label>
                        <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} />
                    </div>
                </div>
            </div>

            <label>Firm Image</label>
                <input type="file"  onChange={handleImageUpload} />

            <div className="btnSubmit">
                <button type="submit">Submit</button>
            </div>

        </form>
    </div>

)}

export default AddFirm
