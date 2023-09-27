jQuery(document).ready(function($) {
    // Create the media uploader
    var ikrMediaUploader = wp.media({
        title: 'Select Image',
        button: {
            text: 'Select Image'
        },
        multiple: false // Set to true if you want to allow multiple image selection
    });

    // Trigger the media uploader when the button is clicked
    function imageUpload(buttonId, inputId) {
        $(`#${buttonId}`).on('click', function(e) {
            e.preventDefault();

            // When an image is selected, handle the result
            ikrMediaUploader.on('select', function() {
                let attachment = ikrMediaUploader.state().get('selection').first().toJSON();
                let imageUrl = attachment.url;

                // Set the selected image URL to the input field
                $(`#${inputId}`).val(imageUrl);
            });

            // Open the media uploader
            ikrMediaUploader.open();
        });
    }

    imageUpload('upload_image_button', 'image_url');
    imageUpload('upload_image_button_edit', 'image_url_edit');
});
