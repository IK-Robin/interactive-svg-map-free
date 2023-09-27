<div class="wrap">

	<h1 class="wp-heading-inline">
		map title</h1>
	<input type="text" id="ikr_post_titles" placeholder="add Title"  class="ptitle ptitlewidth">



	<form id="tooltipForm">
    <input id="tooltipFormMapId" type="hidden" name="tooltipFormMapId">
	<select name="dropdownTooltip" id="dropdownTooltip">
      
      <option value="default">Select a Tooltip </option>
      <option value="onlytooltip">onlytooltip</option>
      <option value="onclickShoTooltip">on click  Tooltip</option>
  </select>
</form>
	

</div>


<div class="rgeo_world_map_img">
	<button class=" button-primary " type="button" id="zoom_in">
		+
	</button>

	<button class=" button-primary " type="button" id="zoom_out">
		-
	</button>
	<button class=" button-primary " type="button" id="reset">
		reset
	</button>
	<div class="" id="selected_country">
		click the map to select elements
	</div>
	<?php
	include_once(__DIR__ . '/tooltip.php');
	?>
	<div class="zindex" id="map_zoom">
		<object class="svg_img_obj" data=" <?php echo plugins_url("../assets/worldmap.svg", __FILE__) ?>"></object>

	</div>
</div>



