<?php 
function rdata_plugin_create_tables() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    
    if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "
            CREATE TABLE $table_name (
                `id` int(11) AUTO_INCREMENT,
                `post_titles` varchar(800) NOT NULL,
                `country` varchar(500) NOT NULL,
                `map_id` varchar(300) NOT NULL,
                `title` varchar(1000) DEFAULT NULL,
                `map_des` varchar(1000) DEFAULT NULL,
                `hov_color` varchar(7) DEFAULT NULL,
                `fill_color` varchar(7) DEFAULT NULL,
                `click_color` varchar(7) DEFAULT NULL,
                `map_link` varchar(1500) DEFAULT NULL,
                `map_img` varchar(1500) DEFAULT NULL,
                `is_active` tinyint(1) DEFAULT 1,
                `tooltip_options` varchar(150) DEFAULT NULL,
                `new_map_id` varchar(200) DEFAULT NULL,
                `read_more_btn` varchar(500) DEFAULT NULL,
                PRIMARY KEY (`id`)
            ) $charset_collate;
        ";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

?>
