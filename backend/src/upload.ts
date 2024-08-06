import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config();

export default function upload() { (async function() {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.cloudnary_cloud_name, 
        api_key: process.env.cloudnary_api_key, 
        api_secret: process.env.cloudnary_api_secret 
    });
    
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
               }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
     
})();

}