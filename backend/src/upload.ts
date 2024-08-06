import { v2 as cloudinary } from 'cloudinary';

export default function upload() { (async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'saas-data-labelling-web3', 
        api_key: '684497491646695', 
        api_secret: 'Vo-KWXprMdqe_O6X1gmSH_1Giqc' 
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