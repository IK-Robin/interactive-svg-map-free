<?php
?>

<h1>Add to DB</h1>
<div id="svgid"></div>
<select name="id" id="map_id_select">
    </select>


    
    <!-- <select id="map_country_img_select"> 
        <option value="us">us</option> </select>    -->
    
    <!-- show tooltip option  -->
<form id="tooltipForm">
    <input id="tooltipFormMapId" type="hidden" name="tooltipFormMapId">

</form>
<!-- input from  -->
<form action="" id="rdata_from" class="rdata_from">
      <div id="data-entries">
      <div class="close_edit closeEdit_submit">
        <span>&#10005;</span>
    </div>
        <div class="data-entry">
        <input type="hidden" name="countryName" id="hddenCountryName">
        <!-- add post title  -->
        <input type="hidden" id="ikr_sub_post_Title"  name="ikrpostTitle">
        <input type="hidden" id="new_map_id_sub"  name="newmapid">
         <div class="input_color">
            <label for="id">Map ID</label>
            <input type="text" name="id" class="scratch-data-id colorInput" id="map_id" /> 
            
         </div>
         
         
         <div class="input_color">
            <label for="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Insert your title"
              id="ikrTitle"
              class="colorInput" 
            />
         </div>
         
         <!-- <textarea name="des" id="ikrdes" placeholder="Insert your description" cols="10" rows="5"></textarea> -->
         <div class="input_color">
              <label class="descriptions" for="des">Description</label>
          <div id="editor-container" name="editor-container"></div>
          </div>
          <!-- <input type="text" name="des" id="ikrdes" placeholder="Insert your description" /> -->
        <div class="input_color">

            <label for="hovecolor">Hover Color</label>
            <input type="color" class="inputs" id="typeHovcolor" value="#0000FF" />
  
            <input type="text" name="hovecolor" id="hovecolor" class="colorInput" value="#0000FF" />
        </div>

        <div class="input_color">
            <label for="fill_color">Fill Color</label>
            <input type="color" id="filltype" class="inputs"  value="#ff779d" />
  
            <input type="text" name="fillcolor" id="fill_color" class="colorInput" value="#0000FF" />
        </div>

     

         <div class="input_color">
            <label for="clickColor"> click color</label>
            <input type="color" class="inputs"   id="typeClickColor" value="#79db2F" />
  
            <input class="colorInput" 
              type="text"
              value="#0000FF"
              name="clickcolor"
              id="clickColor"
            />
         </div>

          <!-- <input type="text" placeholder="https://google.com" name="ikr_link" id="ikr_link" /> -->

        <div class="input_color">
              <input type="text" class="inputs_img colorInput input_img_link_form" id="image_url" name="image_url" readonly />
          <button class="button button-primary inputImgBtn  inputImgBtn_form" type="button" id="upload_image_button">Select Image</button>

        </div>
        <div class="input_color">
        <label for="clickColor"> Map Link</label>
<input type="text" id="image_url_sub" name="map_link_sub" class="inputs_img colorInput"  placeholder="Add Map Link "  >
   
</div>

<!-- hide active inactive for feuture -->
<!-- button read more btn  -->
<div class="input_color">

<input type="input" class="readmorebtn"   id="readmorebtn_sub" name="readmoerbtns">
    <button type="button"  class="button-primary ikrActiveToggle" id="ikrActiveToggle_edit">button text </button>

</div>
        <input type="hidden" name="dropdownTooltip" id="dropdownTooltip_sub" value="onlytooltip">
        <input class=" button button-primary submitEdit" type="submit" value="Submit" />
        </div>
      </div>

    </form>


<form action="" id="rdata_edit_from" class="rdata_edit_from">
   
    <div id="data-entries">
    <div class="close_edit close_edit_e">
        <span>&#10005;</span>
    </div>
        <div class="data-entry">
    
        <!-- add post title  -->
        <input type="hidden" id="ikr_edit_post_Title"  name="ikrpostTitleEdit">
        <input type="hidden" id="new_map_id_edit"  name="new_map_id_edit">
    <div class="input_color">
        <label for="id">Map ID</label>
       
            </div>
            <input type="text" name="id" class="scratch-data-id colorInput" id="map_id_edit" readonly /> 


        <div class="input_color">
        <label for="title">Title</label>
            <input type="text" name="title" placeholder="Insert your title" id="ikrTitle_edit"  class="colorInput"  />
        </div>

        <div class="input_color">
        <label class="descriptions"  for="des">Description</label>
            <!-- <input type="text" name="des" id="ikrdes_edit" placeholder="Insert your description" /> -->
            <textarea  id="editor-container_edit" name="editor-container_edit"></textarea>

        </div>
        <div class="input_color">
        <label for="hovecolor">Hover Color</label>
            <input type="color" class="inputs" id="typeHovcolor_edit" value="#0000FF" />

            <input class="colorInput"  type="text" name="hovecolor" id="hovecolor_edit" value="#0000FF" />
        </div>
   


    <div class="input_color">
        <label for="fill_color">Fill Color</label>
            <input type="color" class="inputs" id="filltype_edit" value="#0000FF" />

            <input type="text" name="fillcolor" id="fill_color_edit" class="colorInput"  value="#0000FF" />

        </div>
        <div class="input_color">

        <label for="clickColor"> click color</label>
            <input type="color" class="inputs" id="typeClickColor_edit" value="#0000FF" />

            <input type="text" value="#0000FF" name="clickcolor" class="colorInput"  id="clickcolor_edit" />
        </div>
            
        <div class="input_color">

        <input type="text" id="image_url_edit" name="image_url_edit" class="inputs_img colorInput input_img_link_form"  >
            <button class=" button button-primary inputImgBtn inputImgBtn_form"   id="upload_image_button_edit">Select Image</button>

        </div>
        <div class="input_color">
        <label for="clickColor"> Map Link</label>
        <input type="text" id="map_url_edit" name="map_link_edit" placeholder="Add Map Link " class="inputs_img map_url_edit  colorInput"  >
            <!-- <button class=" button button-primary inputImgBtn"  type="button" id="upload_image_button_edit">Select Image</button> -->

        </div>
            
        <!-- add button text  -->
        <div class="input_color">

        <input type="input" class="readmorebtn"   id="readmorebtn_edit" name="readmoerbtn">
            <button type="button"  class="button-primary ikrActiveToggle" id="ikrActiveToggle_edit">button text </button>

        </div>
            
        <input type="hidden" name="dropdownTooltip_edit" id="dropdownTooltip_edit" value="onlytooltip">
   
          
            

     


        <input class="button button-primary  submitEdit" type="submit" value="edit" />
        </div>
    </div>

</form>

<form action=""id="edit_title_onload">
    <input name="editAllTitle" id="editAllTitle" type="hidden" >
    <input name="editAllMapId" id="editAllMapId" type="hidden" >
</form>





<?php




// function scratch_save_data_add()
//     {
//         global $wpdb;

//         // Retrieve the form data
//         $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
//         $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
//         $des = isset($_POST['des']) ? sanitize_text_field($_POST['des']) : '';
//         $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';

//         // Insert the data into the database
//         $table_name = $wpdb->prefix . 'data_table';
//         $wpdb->insert(
//             $table_name,
//             array(
//                 'id' => $id,
//                 // 'title' => $title,
//                 'des' => $des,
//                 'hov_color' => $hov_color
//             )
//         );

//         // Return the response
//         wp_send_json_success('Data saved successfully.');
//     }
//     add_action('wp_ajax_scratch_save_data_add', 'scratch_save_data_add');
//     add_action('wp_ajax_nopriv_scratch_save_data_add', 'scratch_save_data_add');



// Enqueue scripts





// Save data to the database

?>