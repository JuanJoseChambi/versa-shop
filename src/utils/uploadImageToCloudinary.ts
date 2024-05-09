import { error } from "./alert";
const {VITE_CLOUD_NAME, VITE_PRESET_KEY} = import.meta.env;

const URL = `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`;

export async function uploadImageToCloudinary (file:File):Promise<string | void | boolean> {

    if (!file) return error("Por favor seleccione una imagen");
  
     try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", VITE_PRESET_KEY);
        const response = await fetch(URL, {
            method:"POST",
            body:formData
        });
        if (!response.ok) {
            throw new Error(`Error uploading image: ${response.status}`);
        }
    
        const responseData = await response.json();
        return responseData.secure_url;
     } catch (error) {
        return false
     }
    }