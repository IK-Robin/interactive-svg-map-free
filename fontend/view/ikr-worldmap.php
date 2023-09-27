<?php
    print_r( $ShrtCMapId );
    // Output $mapId as a JavaScript variable
    echo '<script>var ShrtCMapId = ' . json_encode($ShrtCMapId) . ';</script>';
?>
    
<div class="rgeo_world_map_img"  >
<button type="button" id="zoom_in">
		Zoom-In
	</button>
	
	<button type="button" id="zoom_out" >
		Zoom-Out
	</button>
	<button type="button" id="reset" >
		reset
	</button>
<?php 
  include( 'tooltip.php');
?>
<div class="zindex" id="map_zoom">
<object class="svg_img_obj"  data="" ></object>

</div>
</div>



<?php




?>