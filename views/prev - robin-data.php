<?php



 /**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.

 * @wordpress-plugin
 * Plugin Name:       interactive-geo-maps      
 * Plugin URI:        https://wordpress.org/plugins/search/interactive-geo-maps-wp/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Robin
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.robin.org/licenses/gpl-2.0.txt
 * Text Domain:       ikrgeo
 * Domain Path:       /languages
 */

 
define("RBOIN_DIR_PATH", plugin_dir_path(__FILE__));

include_once RBOIN_DIR_PATH . './functions/functions.php';

include_once RBOIN_DIR_PATH . './fontend/ikr-shortcode.php';
function rdata_add_menu_page()
{
   $value = isset($_GET['value']) ? sanitize_text_field($_GET['value']) : '';
   add_menu_page('submit from data', 'submit from data', 'manage_options', 'submit-from-data', 'rdata_add_new_maps', '', 101);
   add_submenu_page('submit-from-data', 'All Maps', 'All Maps', 'manage_options', 'submit-from-data', '', 'rdata_add_new_maps');
 

   // add show data submenu 
   add_submenu_page('submit-from-data', 'Add New', 'Add New', 'manage_options', 'interactive-geo-data-add', 'rdata_add_admin_menu_page', 101);
   add_submenu_page('submit-from-data', 'shortcode', 'shortcode', 'manage_options', 'submit-from-data-show', 'rdata_add_show_data', 101);




   // Add show data submenu
// add_submenu_page(
//    'submit-from-data', 
//    'Add New', 
//    'Add Newd', 
//    'manage_options', 
//    'interactive-geo-data-add', 
//    'rdata_add_admin_menu_page', 
//    101
// );

// Enqueue custom JavaScript

   
} 


add_action('admin_menu', 'rdata_add_menu_page');




// admin main page 
 

function ikr_endueue_scriptIn_parent () {
   $page_param = isset($_GET['page']) ? $_GET['page'] : '';

   // Check if the current screen is your custom plugin's submenu page
   if ('interactive-geo-data-add' === $page_param) {
   wp_enqueue_script('ikr_interactive', plugin_dir_url(__FILE__) . './js/ikrgeo-interactivity.js', array(), '1.0.0', true);
 
   wp_localize_script('ikr_interactive' , 'get_url', array(
      'plugin_url' => plugin_dir_url(__FILE__),
      'all_title_edit'=> 'ikr_rdata_edit_all_title'
  ) );}
}
add_action('admin_enqueue_scripts','ikr_endueue_scriptIn_parent' );

function rdata_add_show_data()
{

   ?>
   <h1> show from data</h1>
   <h1> use this shortcode [ikr_interactive_map]</h1>
   <?php

   include_once RBOIN_DIR_PATH . './views/show-form-data.php';
   ?>



   

   <?php

}


include_once RBOIN_DIR_PATH . './utlits/db.php';

register_activation_hook( __FILE__, 'rdata_plugin_create_tables' );


?>

