import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ImageUploader.css';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [AllImage, setAllImage] = useState([]);

    const submitImg = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

        try {
            const result = await axios.post(
                "http://localhost:8000/uploadImg",
                formData,
                {
                    headers: {"Content-Type": "multipart/form-data"},
                }
            );
            console.log("Image uploaded successfully:", result.data);
            getImage(); // Refresh images after upload
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const getImage = async () => {
        try {
            const result = await axios.get("http://localhost:8000/getImage");
            console.log("Fetched images:", result.data.data);
            setAllImage(result.data.data || []); // Ensure default empty array if null
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    useEffect(() => {
        getImage();
    }, []);

    return (
        <div>
            <form onSubmit={submitImg}>
                <input type="file" accept="image/*" onChange={onImageChange}></input>
                <button type="submit">Upload</button>
            </form>

            <div className="image-container">
                {AllImage.length === 0
                    ? "No images to display"
                    : AllImage.map((data) => (
                        <img
                            key={data._id}
                            src={`http://localhost:8000/files/${data.image}`}
                            alt={`photo ${data._id}`}
                            className="uploaded-image"
                            style={{ width: "100px", height: "100px" }} // Adjust dimensions as needed
                        />
                    ))}
            </div>
        </div>
    )
}

export default ImageUploader;
