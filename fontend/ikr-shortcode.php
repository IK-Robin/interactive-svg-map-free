<?php

// include_once RBOIN_DIR_PATH . './functions/functions.php';
function ikr_interactive_maps($att){
    ob_start();
    $ShrtCMapId = $att['id'];

// Accessing the 'id' attribute of $att
    include('view/ikr-worldmap.php');
    $outputs = ob_get_clean();
    return $outputs;
}
add_shortcode( 'ikr_interactive_map', 'ikr_interactive_maps' );

?>
