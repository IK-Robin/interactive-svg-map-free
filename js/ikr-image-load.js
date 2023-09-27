function ll(item){
    //console.log(item)
    const input_img_link =document.querySelectorAll('.input_img_link');
    //console.log(input_img_link)

}





    function imageUpload(buttonId, inputId) {
        let ikrMediaUploader = wp.media({
            title: 'Select Image',
            button: {
                text: 'Select Image'
            },
            multiple: false // Set to true if you want to allow multiple image selection
        });
        let selectedClass = document.querySelector(`#${buttonId}`);
        let inputs_img_url = document.querySelector(`#${inputId}`);
        // Initialize the media uploader variable
    

            // Create the media uploader only if it hasn't been initialized
        
            // When the media uploader is closed, set it to null to allow re-initialization
          
    
            // When an image is selected, handle the result
            ikrMediaUploader.on('select', function () {
                var attachment = ikrMediaUploader.state().get('selection').first().toJSON();
                var imageUrl = attachment.url;
    
                // Set the selected image URL to the input field
                inputs_img_url.value = imageUrl;
    
                // Close the media uploader
                ikrMediaUploader.close();
                
            });
        
    
        selectedClass.addEventListener('click', function (e) {
            e.preventDefault();
    
            // Open the media uploader
            ikrMediaUploader.open();
        });
    }
    
    
    




  