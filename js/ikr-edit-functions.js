function edit_from_list_F(datas) {
  const edit_from_list = document.querySelectorAll(".edit_list");
  const edit_from_listEditBTn = document.querySelectorAll(".submitEditBtn");
  const rdata_edit_from_lists = document.querySelectorAll(
    ".rdata_edit_from_lists"
  );
  
  const ikr_map_detail = document.querySelectorAll(".EditFormToggle");

  var editorSettings = {
    tinymce: {
      wpautop: true,
      toolbar1:
        "formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link unlink wp_more spellchecker",
    },

    quicktags: true,
  };
  // Get all elements with the class name 'editor-container_edit'
  var editorContainers = document.querySelectorAll(".editor-container_edit");

  // Loop through each element and initialize the editor
  editorContainers.forEach(function (container) {
    wp.editor.initialize(container.id, editorSettings);
  });

  // var editos = tinyMCE.get("editor-container_edit");
  // console.log(editos)
  // if (editos) {
  //     datas.map(item =>{

  //           editos.setContent(item.map_des);
  //     })
  // }

  //   var editorContainers = document.querySelectorAll(".editor-container_edit");
  // Loop through each element and set its content

  // function setEditorContent(editorId, content) {
  //   var editor = tinyMCE.get(editorId);
  //   if (editor) {
  //     editor.setContent(content);
  //   } else {
  //     setTimeout(function () {
  //       setEditorContent(editorId, content);
  //     }, 100); // Retry after a short delay
  //   }
  // }

  // editorContainers_list.forEach(function (container, index) {

  // });

  const ikrForm = document.getElementById("rdata_from");



  let prevId = 0;

  function initializeEditorsAndSetContent(item, ind) {
    console.log(item.tooltip_options)
    let html = document.createElement("div");
    console.log(item);
    html.innerHTML = `

<form action="" id="removeFrom" class="rdata_edit_from rdata_edit_from_remove">
  
<div id="data-entries">

    <div class="data-entry">

    <!-- add post title  -->
    <input type="hidden" id="ikr_edit_post_Title" name="ikrpostTitleEdit">
    
    <input type="hidden" id="new_map_id_sub" value="${item.new_map_id}" name="new_map_id_edit">
<div class="input_color">
    <label for="id">Map ID</label>
   
        </div>
        <input type="text" name="id" class="scratch-data-id colorInput" value=${
          item.map_id
        }  /> 


    <div class="input_color">
    <label for="title">Title</label>
        <input type="text" value="${
          item.title
        }" name="title" placeholder="Insert your title" class="colorInput"  />
    </div>

    <div class="input_color addT" id="ikr_tynamic">
  
        <!-- <input type="text" name="des" id="ikrdes_edit" placeholder="Insert your description" /> -->
      

    </div>
    <div class="input_color">
    <label for="hovecolor">Hover Color</label>
        <input type="color" class="inputs" id="typeHovcolor_list" value="${
          item.hov_color
        }" />

        <input class="colorInput"  type="text" name="hovecolor" id="hovecolor_list" value="${
          item.hov_color
        }" />
    </div>



<div class="input_color">
    <label for="fill_color">Fill Color</label>
        <input type="color" class="inputs" id="filltype_list" value="${
          item.fill_color
        }" />

        <input type="text" name="fillcolor" id="fill_color_list" class="colorInput"  value="${
          item.fill_color
        }" />

    </div>
    <div class="input_color">

    <label for="clickColor"> click color</label>
        <input type="color" class="inputs" id="typeClickColor_edit_list" value="${
          item.click_color
        }" />

        <input id="ClickColor_edit_list" type="text" value="${
          item.click_color
        }" name="clickcolor" class="colorInput"   />
    </div>
        
    <div class="input_color">

    <input type="text" id="image_url_edit${ind}" name="image_url_edit" class="inputs_img colorInput input_img_link_list" value="${
      item.map_img
    }" readonly>

        <button class=" button button-primary inputImgBtn_List  "  type="button" id="upload_image_button_edit${ind}">Select Image</button>

    </div>
    <div class="input_color">
    <label for="clickColor"> Map Link</label>
    <input type="text" id="map_url_edit" name="map_link_edit" value="${
      item.map_link
    }" placeholder="Add Map Link " class="inputs_img colorInput"  >
        <!-- <button class=" button button-primary inputImgBtn"  type="button" id="upload_image_button_edit">Select Image</button> -->

    </div>
        
    <div class="input_Checkbox">



       <input type="checkbox" checked id="ikrCheckbox" class="ikrCheckbox" name="ikrcheckbox" />
       <button type="button" id=" krActiveToggle" class=" button button-primary   ikrActiveToggle">Inactive</button>

    </div>
        
    <input type="hidden" name="dropdownTooltip_edit" value="${item.tooltip_options}">
        


    <input class="button button-primary" id="submitEditBtnList" type="submit" value="edit" />
    </div>
</div>

</form> 
`;

    ikr_map_detail.forEach((mapItem, detilIndex) => {
      if (detilIndex === ind) {
        mapItem.appendChild(html);
      }
    });

  

    // initialize ikr_tynamic editor

    var editorSettings = {
      tinymce: {
        wpautop: true,
        toolbar1:
          "formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link unlink wp_more spellchecker",
      },
      quicktags: true,
    };

    wp.editor.initialize(`ikr_tynamic`, editorSettings);

    // set the content of the editor on click
    const editor = tinyMCE.get(`ikr_tynamic`);

    if (editor) {
      editor.setContent(item.map_des);
    }
  }

  function removeEditorsAndContent(ind) {
   
    
    const editor = tinyMCE.get(`ikr_tynamic`);
    console.log(editor)
    if (editor) {
      editor.destroy(); // Destroy the TinyMCE editor instance
    }

    const newTextArea = document.getElementById("ikr_tynamic");
    if (newTextArea) {
      const ikr_tynamic = document.getElementById("ikr_tynamic");
      ikr_tynamic.remove();
    }
  }

  // Add event listeners to buttons for adding and removing editors

  let isEditorInitialized = false;
  let removeeditor = false;
  let end_edit_from_list = document.querySelectorAll(".end_edit_from_list");









  edit_from_list.forEach((editItems, ind) => {
    editItems.addEventListener("click", (editEvent) => {
  
      let editId = editEvent.target.dataset.id;

          console.log(editItems)





      datas.map((editItem) => {
        if(editItem.new_map_id == ulrMapId){
          if (editItem.map_id === editId) {
            console.log(`image_url_edit${ind}`)
            // console.log(`upload_image_button_edit${ind}`)
          
            // remove the ikr_tynamic editor 
            end_edit_from_list.forEach((endEdit, endIndex) => {
              if (endIndex == ind) {
                
                console.log(endEdit);
                if (!isEditorInitialized) {
                  isEditorInitialized = true;
                  endEdit.style.display = "block";
                  editItems.style.display = "none";
  
                  
  
                  // removeeditor = true;
                  initializeEditorsAndSetContent(editItem, ind);
                  imageUpload(`upload_image_button_edit${ind}`, `image_url_edit${ind}`);
  
  
                  // send the data in db on submit the edit from list 
                  let rdata_edit_from_remove = document.getElementById('removeFrom');
                  console.log(rdata_edit_from_remove)

                  if(rdata_edit_from_remove){
                    rdata_edit_from_remove.style.display ='block';
                    rdata_edit_from_remove.addEventListener('submit',subEv=>{
                      subEv.preventDefault();
                     makeAjaxRequestGlobal(rdata_edit_from_remove,your_ajax_object.editaction)
                     setTimeout(() => {
    
                      // console.log("hh");
                      // reload when the from submit 
                      fetchAjaxRequest("rdata_fetch_data", function (response) {
                        // displayDatabaseData(response);
                        sendDataToDB(response);
                      });
                          // itemDetailEmpty();
                    }, 100);
                    removeEditorsAndContent();
                    })
                  }
                  // on click remove the text editeor 
                  endEdit.addEventListener("click", () => {
                    isEditorInitialized = false;
                   
                    // select the submit btn  
                    let submitEditBtnFlist = document.getElementById('submitEditBtnList')
                    // check the rdata_edit_from_remove is true or false if true then remove the editor from list 
                    if(rdata_edit_from_remove ){
                    
                      submitEditBtnFlist.click();
                      rdata_edit_from_remove.remove();
                      
                      
                      endEdit.style.display = "none";
                    editItems.style.display = "block";
                    console.log(submitEditBtnFlist)
                   
                    
                    }
                    // distroy the tynamic editor 
               
                removeEditorsAndContent();
  
                  });
                  
                }
                
  
              }
            });
  
            // console.log(editItem.tooltip_options )
            // console.log(dropdownTooltip)
            //   dropdownTooltip.value = editItem.tooltip_options;
  
            map_id_edit.value = editItem.map_id;
            itemDetail(editItem);
          }
        }
       
      });
      ikrForm.style.display = "none";

      // close_edit.forEach(style =>{

      // close_edit.classList.add('edit_btn_click_close');
      // })
      //   ikrTitle_edit.focus();

      ikrHeidSubmitForm.style.display = "none";

      // get teh input button on click the edit from list btn 
      
      
      changeTheColorInput();


      toggleCheckbox('ikrCheckbox','ikrActiveToggle')

      // rdata_edit_from.classList.add('rdata_editfrom_list');
    });
  });
}

function ikrdeletFuncs(datas) {
  const ikrdelet = document.querySelectorAll(".ikrdelet");
  // console.log(ikrdelet)
  const deletForm = document.getElementById("deletForm");
  ikrdelet.forEach((deletItem) => {
    // console.log(ikrdelet.length)
    deletItem.addEventListener("submit", (editEvent) => {
      editEvent.preventDefault();

      let editId = editEvent.target.dataset.did;

      let editIdClass = editEvent.target.id;

      if (editIdClass === editId) {
        makeAjaxRequestGlobal(deletItem, your_ajax_object.ikrDelet);
        window.location.reload();
      }
    });
  });
}

  // get the input btn and set the input type color 
function changeTheColorInput(){
  // get the input btn and set the input type color 
const typeHovcolor_list = document.getElementById('typeHovcolor_list');

const hovecolor_list = document.getElementById('hovecolor_list');

console.log(hovecolor_list)// fill color 

const filltype_list = document.getElementById('filltype_list');
const fill_color_list = document.getElementById('fill_color_list');

const typeClickColor_edit_list = document.getElementById('typeClickColor_edit_list');

const ClickColor_edit_list = document.getElementById('ClickColor_edit_list');




setColorType(hovecolor_list, typeHovcolor_list);
setColorType( fill_color_list,filltype_list);
setColorType(ClickColor_edit_list, );


// change the color input  type color on change 
colorTypes(typeHovcolor_list,hovecolor_list);
colorTypes(filltype_list,fill_color_list);
colorTypes(typeClickColor_edit_list,typeClickColor_edit_list);


}