<?php
// add scripts on map plugin
function add_rdat_scripts()
{
    wp_enqueue_script('ikr_global_function', plugin_dir_url( __FILE__ ). '../js/jsGlobalFunction.js', [], '1.0.1', true );
    // Get the page parameter from the URL
    $page_param = isset($_GET['page']) ? $_GET['page'] : '';
    if('submit-from-data' ===$page_param){

        wp_enqueue_script('ikr_add_new', plugin_dir_url( __FILE__ ). '../js/ikr-add-new-map.js', [], '1.0.1', true );

        wp_enqueue_script('custom-script', plugin_dir_url( __FILE__ ) . '../js/custom-script.js', array(), null, true);
  
        wp_localize_script(
            'ikr_add_new',
            'your_ajax_object',
            array(
                
                'ikrDelet' => 'rdata_delet_the_map_data',
                
            )
        );
    }
    
   
    
    
    // Check if the current screen is your custom plugin's submenu page
    if ('interactive-geo-data-add' === $page_param) {
        wp_enqueue_script('custom-script', plugin_dir_url( __FILE__ ) . '../js/custom-script.js', array(), null, true);
        wp_enqueue_script('from_submit', plugin_dir_url(__FILE__) . '../js/your-custom.js', array(), true);
        wp_enqueue_script('edit_from_list', plugin_dir_url(__FILE__) . '../js/ikr-edit-functions.js', array(), true);
        wp_enqueue_script('ikr_admin__image_script', plugin_dir_url(__FILE__) . '../js/ikr-image-load.js', array('jquery'), '1.0.0', true);
        wp_enqueue_script('add_new_map_modul', plugin_dir_url(__FILE__) . '../js/ikr-add-new-map-onloag.js', array('jquery'), '1.0.0', true);
        
        wp_enqueue_script('tinymce');

      
        wp_enqueue_script('ikr_edit_js', plugin_dir_url(__FILE__) . '../js/ikr-edit-functions.js', array(), '1.0.0', true);
        wp_enqueue_script('ikr_country_data', plugin_dir_url(__FILE__) . '../js/countryData.js', [], '1.0.1', true);


        // Enqueue the media uploader script 
        if (is_admin()) {
            wp_enqueue_media();
        }
        wp_enqueue_editor();

       
        wp_localize_script(
            'from_submit',
            'your_ajax_object',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'action' => 'rdata_save_data_add',
                'edit_from_list' => 'rdata_edit_from_list',
                'editaction' => 'rdata_edit_the_map_data',
                'ikrDelet' => 'rdata_delet_the_map_data',
                'plugin_url' => plugin_dir_url(__FILE__),
                
            )
        );
       
     
    }
}

add_action('admin_enqueue_scripts', 'add_rdat_scripts');


// add style 
function add_world_map_enqueue_style()
{
    wp_enqueue_style('robingeo_enqueue_styel', plugin_dir_url(__FILE__) . '../style/wp-world-map-style.css', array(), '1.0.0');
    wp_enqueue_style('robin_add_new_maps_and_shortcode', plugin_dir_url(__FILE__) . '../style/ikr-all-maps-shortcode.css', array(), '1.0.0');
}
function add_world_map_enqueue_style_wp_enqueue()
{
    wp_enqueue_style('robingeo_enqueue_styel', plugin_dir_url(__FILE__) . '../style/wp-world-map-style.css', array(), '1.0.0');
    wp_enqueue_script('ikr_frontend_script', plugin_dir_url(__FILE__) . '../fontend/js/ikr-frontend-interactive.js', array(), true);
    wp_enqueue_script('ikr_zoom_frontend_script', plugin_dir_url(__FILE__) . '../js/ikr-zoom.js', [], '1.0.1', true);

    wp_localize_script( 'ikr_frontend_script', 'img_path', [
        'plugin_url' =>  plugin_dir_url(dirname(__FILE__))
    ] );
    wp_localize_script("ikr_frontend_script", 'ikr_front_end', [
        'ajax_url' => admin_url('admin-ajax.php'),
    ]);
}




add_action('wp_enqueue_scripts', 'add_world_map_enqueue_style_wp_enqueue');
add_action('admin_enqueue_scripts', 'add_world_map_enqueue_style');




function rdata_add_admin_menu_page()
{


    ?>
    <?php 
        include_once RBOIN_DIR_PATH . './views/ikr-title-modal.php';
    ?>
    <div class="robingeo-container">

        <div class="map_container">
            <div class="map-img">

                <?php
                include_once RBOIN_DIR_PATH . './views/world-map.php';
                // ?>
            </div>

        </div>


        <div class="input-form">
            <?php

            include_once RBOIN_DIR_PATH . './views/from-data.php';
            ?>
        </div>
    </div>
    <div class="map-data-show">
        <?php
        include_once RBOIN_DIR_PATH . './views/show-map-data.php';
        ?>
    </div>
    <?php












}


function rdata_add_new_maps () {
   
    $page_param = isset($_GET['page']) ? $_GET['page'] : '';
    $page_params = isset($_GET['value']) ? $_GET['value'] : '';
 print_r( $page_params)
    ?> 

<?php
    include_once RBOIN_DIR_PATH .'./views/ikr-add-new-map.php';
?>
      <!-- <button id="addValueButton">Add Value and Redirect</button>
  -->
    <?php
 }


// add new data in data base 
function rdata_save_data_add()
{
    global $wpdb;




    error_log('Form data received: ' . print_r($_POST, true));
    // Retrieve the form data
    $postTitleSub = isset($_POST['ikrpostTitle']) ? sanitize_text_field($_POST['ikrpostTitle']) : '';
    $id = isset($_POST['id']) ? sanitize_text_field($_POST['id']) : '';
    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $des = isset($_POST['editor-container']) ? wp_kses_post($_POST['editor-container']) : '';
    $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';
    $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field($_POST['fillcolor']) : '';
    $click_color = isset($_POST['clickcolor']) ? sanitize_text_field($_POST['clickcolor']) : '';
    $add_image = isset($_POST['image_url']) ? sanitize_text_field($_POST['image_url']) : '';
    $map_link_sub = isset($_POST['map_link_sub']) ? sanitize_text_field($_POST['map_link_sub']) : '';
    $tooltip_options = isset($_POST['dropdownTooltip']) ? sanitize_text_field($_POST['dropdownTooltip']) : '';
    $countryName = isset($_POST['countryName']) ? sanitize_text_field($_POST['countryName']) : '';
    $isChecked = $_POST['ikrcheckbox'] === 'on' ? 1 : 0;
    $new_map_idSub =isset($_POST['newmapid']) ? sanitize_text_field($_POST['newmapid']) : '';
    $readMoreSub =isset($_POST['readmoerbtns']) ? sanitize_text_field($_POST['readmoerbtns']) : '';
    // Insert the data into the database
    // Replace with the actual value of map_id you want to check
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    $query = $wpdb->prepare("SELECT * FROM $table_name WHERE map_id = %d", $id);




    $wpdb->insert(
        $table_name,
        array(
            'post_titles' => $postTitleSub,
            'map_id' => $id,
            'title' => $title,
            'map_des' => $des,
            'hov_color' => $hov_color,
            'fill_color' => $fill_colors,
            'click_color' => $click_color,
            'is_active' => $isChecked,
            'map_img' => $add_image,
            'map_link' => $map_link_sub,
            'tooltip_options' => $tooltip_options,
            'country' =>$countryName,
            'new_map_id' => $new_map_idSub,
            'read_more_btn' => $readMoreSub
        )
    );

    // Query to check if data exists based on map_id
    $result = $wpdb->get_row($query);

    if ($result) {
        // Data with the given map_id exists, so the insertion was successful
        // You can perform any further actions here if needed

        wp_send_json_success('Data saved successfully.');
    } else {
        // Data with the given map_id does not exist, so the insertion failed

        wp_send_json_error('Failed to save form data.');

    }
    // // Return the response
    // if ($wpdb->insert_id) {
    //     wp_send_json_success('Data saved successfully.');
    // } else {
    //     $error_message = 'Failed to save form data. Error: ' . $wpdb->last_error;
    //     error_log($error_message); // Log the error for further investigation
    //     wp_send_json_error($error_message);
    //     // wp_send_json_error('Failed to save form data.');
    // }
}

add_action('wp_ajax_rdata_save_data_add', 'rdata_save_data_add');
add_action('wp_ajax_nopriv_rdata_save_data_add', 'rdata_save_data_add');


function rdata_edit_the_map_data()
{
    global $wpdb;
  
    global  $mainDes ;
    // Retrieve the form data
    $postTitle = isset($_POST['ikrpostTitleEdit']) ? sanitize_text_field($_POST['ikrpostTitleEdit']) : '';
    $id = isset($_POST['id']) ? sanitize_text_field($_POST['id']) : '';

    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $des = isset($_POST['editor-container_edit'] ) ? wp_kses_post($_POST['editor-container_edit']) : '';

    $desfrom_list = isset( $_POST['ikr_tynamic'] ) ? wp_kses_post( $_POST['ikr_tynamic']) : '';
    if($des) {
        $mainDes =$des;
    }else{
        $mainDes =$desfrom_list;
    }

    // $des = isset($_POST['editor-container']) ? wp_kses_post($_POST['editor-container']) : '';


    $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';
    $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field($_POST['fillcolor']) : '';
    $click_color = isset($_POST['clickcolor']) ? sanitize_text_field($_POST['clickcolor']) : '';
    $add_image = isset($_POST['image_url_edit']) ? sanitize_text_field($_POST['image_url_edit']) : '';
    $map_link_edit = isset($_POST['map_link_edit']) ? sanitize_text_field($_POST['map_link_edit']) : '';
    $isChecked = $_POST['ikrcheckboxedit'] === 'on' ? 1 : 0;
    $tooltip_options = isset($_POST['dropdownTooltip_edit']) ? sanitize_text_field($_POST['dropdownTooltip_edit']) : '';
    // Insert the data into the database
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    $new_map_id =isset($_POST['new_map_id_edit']) ? sanitize_text_field($_POST['new_map_id_edit']) : '';
    $readMoreEdit =isset($_POST['readmoerbtn']) ? sanitize_text_field($_POST['readmoerbtn']) : '';
    //  add data from data base 

    $wpdb->update(
        $table_name,
        array(
            'post_titles' => $postTitle,
            'title' => $title,
            'map_des' =>  $mainDes,
            'hov_color' => $hov_color,
            'fill_color' => $fill_colors,
            'click_color' => $click_color,
            'is_active' => $isChecked,
            'map_img' => $add_image,
            'map_link' => $map_link_edit,
            'tooltip_options' => $tooltip_options,
             'read_more_btn' => $readMoreEdit
            
        ),
        array('map_id'=> $id, 'new_map_id' => $new_map_id) // Add this line to specify the row to update based on 'map_id'
    );


    // Return the response
    if ($wpdb->insert_id) {
        wp_send_json_success('Data saved successfully.' .$id . ' ' . $new_map_id );
    } else {
        wp_send_json_error('Failed to save form data. on edit ' .$id . ' ' . $new_map_id );
    }


    // Check if the number of rows is less than 7
    // $num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    //  if ($num_rows < 9) {

    // } else {
    //     wp_send_json_error('All fields are full. Cannot add more data. To Add More data go to Prow');
    // }

    // Return the response
    //  wp_send_json_success('Data saved successfully.');
}
add_action('wp_ajax_rdata_edit_the_map_data', 'rdata_edit_the_map_data');
add_action('wp_ajax_nopriv_rdata_edit_the_map_data', 'rdata_edit_the_map_data');

function ikr_rdata_edit_all_title()
{
    global $wpdb;
  
    global  $mainDes ;
    // Retrieve the form data
    


    $editAllPostTitle =isset($_POST['editAllTitle']) ? sanitize_text_field($_POST['editAllTitle']) : '';
    $new_map_id =isset($_POST['editAllMapId']) ? sanitize_text_field($_POST['editAllMapId']) : '';
    //  add data from data base 
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    $wpdb->update(
        $table_name,
        array(
            
            'post_titles' => $editAllPostTitle,
        ),
        array('new_map_id' => $new_map_id) // Add this line to specify the row to update based on 'map_id'
    );


    // Return the response
    if ($wpdb->insert_id) {
        wp_send_json_success('Data saved successfully.');
    } else {
        wp_send_json_error('Failed to save form data. on edit');
    }


    // Check if the number of rows is less than 7
    // $num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    //  if ($num_rows < 9) {

    // } else {
    //     wp_send_json_error('All fields are full. Cannot add more data. To Add More data go to Prow');
    // }

    // Return the response
    //  wp_send_json_success('Data saved successfully.');
}
add_action('wp_ajax_ikr_rdata_edit_all_title', 'ikr_rdata_edit_all_title');
add_action('wp_ajax_nopriv_ikr_rdata_edit_all_title', 'ikr_rdata_edit_all_title');
function ikr_rdata_edit_all_tooltips()
{
    global $wpdb;
  
    // Retrieve the form data
    


    $tooltipFormMapId =isset($_POST['tooltipFormMapId']) ? sanitize_text_field($_POST['tooltipFormMapId']) : '';
    $dropdownTooltip =isset($_POST['dropdownTooltip']) ? sanitize_text_field($_POST['dropdownTooltip']) : '';
    //  add data from data base 
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    $wpdb->update(
        $table_name,
        array(
            
            'tooltip_options' => $dropdownTooltip,
        ),
        array('new_map_id' => $tooltipFormMapId) // Add this line to specify the row to update based on 'map_id'
    );


    // Return the response
    if ($wpdb->insert_id) {
        wp_send_json_success('Data saved successfully.');
    } else {
        wp_send_json_error('Failed to save form data. on edit');
    }


    // Check if the number of rows is less than 7
    // $num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    //  if ($num_rows < 9) {

    // } else {
    //     wp_send_json_error('All fields are full. Cannot add more data. To Add More data go to Prow');
    // }

    // Return the response
    //  wp_send_json_success('Data saved successfully.');
}
add_action('wp_ajax_ikr_rdata_edit_all_tooltips', 'ikr_rdata_edit_all_tooltips');
add_action('wp_ajax_nopriv_ikr_rdata_edit_all_tooltips', 'ikr_rdata_edit_all_tooltips');







function rdata_delet_the_map_data()
{
    global $wpdb;
     global $deleteId;
     global $deleteqieru;

    // Retrieve the form data
    $id = isset($_POST['delet_list_item']) ? sanitize_text_field($_POST['delet_list_item']) : '';
    $allMapIdDelete = isset($_POST['allMapIdDelete']) ? sanitize_text_field($_POST['allMapIdDelete']) : '';
    // check the map id if isset map id then delete all matching id 

    if( $id){
        $deleteId =$id;  
      $deleteqieru ='map_id';
        
    }else if( $allMapIdDelete){
        $deleteId =$allMapIdDelete;
        $deleteqieru ='new_map_id';
    }
    // Insert the data into the database
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    // Delete the row based on map_id
    $result = $wpdb->delete(
        $table_name,
        array(
            $deleteqieru   => $deleteId,
        )
    );

    // Check the result of the deletion
    if ($result !== false) {
        wp_send_json_success('Data deleted successfully. ' . $deleteId);
    } else {
        wp_send_json_error('Failed to delete data.');
    }
}

add_action('wp_ajax_rdata_delet_the_map_data', 'rdata_delet_the_map_data');
add_action('wp_ajax_nopriv_rdata_delet_the_map_data', 'rdata_delet_the_map_data');


//  get data from data base 
// AJAX callback to fetch data from the database
function rdata_fetch_data_from_database()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    // Retrieve data from the database
    $data = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Return the response
    wp_send_json_success($data);
}
add_action('wp_ajax_rdata_fetch_data', 'rdata_fetch_data_from_database');
add_action('wp_ajax_nopriv_rdata_fetch_data', 'rdata_fetch_data_from_database');