document.addEventListener("DOMContentLoaded", function (loadev) {
  const ikrForm = document.getElementById("rdata_from");

  const hovecolor = document.getElementById("hovecolor");
  const clickColor = document.getElementById("clickColor");
  const fill_color = document.getElementById("fill_color");

  const typeHovcolor = document.getElementById("typeHovcolor");
  const filltype = document.getElementById("filltype");
  const typeClickColor = document.getElementById("typeClickColor");

  const ikrTitle = document.getElementById("ikrTitle");
  const ikrdes = document.getElementById("ikrdes");

  const databaseData = document.getElementById("database-data");

  // select the edit from element ;
  const hovecolor_edit = document.getElementById("hovecolor_edit");

  const clickcolor_edit = document.getElementById("clickcolor_edit");

  const fill_color_edit = document.getElementById("fill_color_edit");

  const typeHovcolor_edit = document.getElementById("typeHovcolor_edit");
  const filltype_edit = document.getElementById("filltype_edit");
  const typeClickColor_edit = document.getElementById("typeClickColor_edit");

  const ikrTitle_edit = document.getElementById("ikrTitle_edit");
  const ikrdes_edit = document.getElementById("ikrdes_edit");
  let image_url = document.getElementById("image_url");
  let close_edit_e = document.querySelector(".close_edit_e");

  const close_edit = document.querySelectorAll(".close_edit");
  close_edit.forEach((close) => {
    close.addEventListener("click", () => {
      close_edit_e.classList.remove("edit_btn_click_close");
      rdata_edit_from.style.display = "none";
      ikrForm.style.display = "none";
      //   rdata_edit_from.style.position = "relative";
      //   rdata_edit_from.style.backgroundColor="#fff";
      rdata_edit_from.classList.remove("rdata_editfrom_list");
    });
  });

  wp.editor.initialize("editor-container", {
    tinymce: {
      wpautop: true,
      toolbar1:
        "formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link unlink wp_more spellchecker",
      toolbar2: "", // You can add more buttons to this toolbar if needed
      toolbar3: "", // You can add more buttons to this toolbar if needed
    },
    quicktags: true,
  });

  // Initialize the editor
  var editorSettings = {
    tinymce: {
      wpautop: true,
      toolbar1:
        "formatselect bold italic bullist numlist blockquote alignleft aligncenter alignright link unlink wp_more spellchecker",
    },

    quicktags: true,
  };

  wp.editor.initialize("editor-container_edit", editorSettings);

  // ikrdeletFuncs(datas);

  // Wait for the editor to initialize
  // wp.editor.remove('editor-container_edit'); // Remove existing instance

  // // Set content programmatically
  // editor.on('init', function () {
  //   editor.setContent("Your content goes here.");
  // });

  // get the checkbox  and change the value
  // const ikrActiveToggleBtn = document.getElementById('ikrActiveToggle')
  // toggleCheckbox('ikrCheckbox','ikrActiveToggle')

//  hide active inactive for feature  use 
  // toggleCheckbox("ikrCheckbox_edit", "ikrActiveToggle");
  // toggleCheckbox("ikrCheckbox", "ikrActiveToggle");

  // all function

  // display the data on submit onsubmit the from in the bottom of the map

  shoes();
  itemDetailEmpty();

  function updateColor() {
    var textInput = document.getElementById("hovecolor");
    var colorInput = document.getElementById("typeHovcolor");

    // Get the value from the text input
    var colorValue = textInput.value;
    colorInput.value = colorValue;
    // Check if the input value is a valid hex color code
  }

  const onChangeDetailText = (element, value) => {
    element.addEventListener("keyup", (ev) => {
      value.innerHTML = ev.target.value;
    });
  };

  // set the color on input filde if the clore is change
  // when valid the  from
  colorTypes(typeHovcolor, hovecolor);
  colorTypes(filltype, fill_color);
  colorTypes(typeClickColor, clickColor);

  // when edit the from
  colorTypes(typeHovcolor_edit, hovecolor_edit);
  colorTypes(filltype_edit, fill_color_edit);
  colorTypes(typeClickColor_edit, clickcolor_edit);

  // when valid the  from
  onChangeDetailText(ikrTitle, plotId);
  // onChangeDetailText(ikrdes,detail_des);
  // when edit the from
  // onChangeDetailText(ikrTitle_edit,plotId);
  // onChangeDetailText(ikrdes_edit,detail_des);

  // set the color input type color

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);
  setColorType(clickColor, typeClickColor);
  // when edit the from
  setColorType(hovecolor_edit, typeHovcolor_edit);
  setColorType(fill_color_edit, filltype_edit);
  setColorType(clickcolor_edit, typeClickColor_edit);

  // hovecolor.addEventListener("keyup", (ev) => {
  //   let colorValue = ev.target.value;
  //   checkHexCode(hovecolor,typeHovcolor,colorValue);
  //   // Check if the input value is a valid hex color code

  // });

  // add tooltip options

  // add tooltip options

  const dataEntries = document.getElementById("data-entries");
  const addEntryBtn = document.getElementById("add-entry-btn");

  // Add new data entry dynamically

  // Submit form via AJAX
  ikrForm.addEventListener("submit", function (event) {
    event.preventDefault();

    ikrForm.style.display = "none";
    removeEditorsAndContent();
    makeAjaxRequest(ikrForm, your_ajax_object.action, "editor-container");

    setTimeout(() => {
      // console.log("hh");

      fetchAjaxRequestFrom("rdata_fetch_data", function (response) {
        // displayDatabaseData(response);
        // console.log(response)
        sendDataToDB(response);
        urlTitle = urlParams.get("title");
        ikr_post_titles.value = urlTitle;
        ikr_sub_post_Title.value = urlTitle;
      });
      // get the ulrMapId on submit to show the map data  in list
      ulrMapId = urlParams.get("id");

      // itemDetailEmpty();
    }, 100);

    // get the svg and set the data attribut

    const ikrgooMap = document.querySelector(".svg_img_obj");
    const map_id = document.getElementById("map_id");
    const map_id_edit = document.getElementById("map_id_edit");
    // console.log(ikrgooMap);
    // get the svg
    const ikrsvgDocc = ikrgooMap.contentDocument;
    const ikrsvg = ikrsvgDocc.querySelector("svg");
    let ikrItems = ikrsvg.querySelectorAll("rect, path, circle, polygon");

    // With this correction, the querySelectorAll method should now properly select all the desired elements, and the condition inside the forEach loop should work as expected.

    // end from submit
  });

  // select all the edit elements
  const rdata_edit_from = document.getElementById("rdata_edit_from");
  rdata_edit_from.addEventListener("submit", (edit) => {
    edit.preventDefault();
    close_edit_e.classList.remove("edit_btn_click_close");
    rdata_edit_from.classList.remove("rdata_editfrom_list");
    // const ikr_tynamic = document.getElementById('ikr_tynamic');
    // console.log(ikr_tynamic)
    // ikr_tynamic.remove();

    removeEditorsAndContent();

    image_url.value = "";
    rdata_edit_from.style.display = "none";
    isEdit = false;
    let title = edit.target[1];
    let des = edit.target[2];
    let typeHovcolor_edit = edit.target[3];
    let hovcolor_edit = edit.target[4];

    let filltype_edit = edit.target[5];
    let fill_color_edit = edit.target[6];

    let typeClickColor_edit = edit.target[7];
    let clickColor_edit = edit.target[8];

    detail.style.display = "none";

    makeAjaxRequest(
      rdata_edit_from,
      your_ajax_object.editaction,
      "editor-container_edit"
    );
    // window.location.reload()

    setTimeout(() => {
      // console.log("hh");

      fetchAjaxRequestFrom("rdata_fetch_data", function (response) {
        let emptyMap_id = [];
        // displayDatabaseData(response);
        sendDataToDB(response);
        urlTitle = urlParams.get("title");
        ikr_post_titles.value = urlTitle;

        response.map((item) => {
          if (item.country == urlvalue) {
            if (!emptyMap_id.includes(item.post_titles)) {
              emptyMap_id.push(item.post_titles);
              // console.log(emptyMap_id)
              // console.log('first')
            }
          }
        });
      });
    }, 100);
  });

  function fetchAjaxRequestFrom(actions, callback) {
    xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);
    xhr.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // console.log(response);
        if (response.success) {
          callback(response.data); // Call the function to display data
        } else {
          // console.error(response);
        }
      }
    };

    xhr.send(`action=${actions}`); // Send the AJAX request to fetch data
  }

  function makeAjaxRequest(fromdata, action, editorId) {
    var editorContent = wp.editor.getContent(editorId);

    var formData = new FormData(fromdata);
    // formData.append(editorId, editorContent);
    formData.append("action", action);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", ajaxurl, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // console.log(xhr.responseText)
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // console.log(response.data);
          console.log(response);
          // Handle success message or any other action
        } else {
          // console.log(response.data);
          // Handle error message or any other action
        }
      }
    };
    xhr.send(formData);
  }
});

function fetchAjaxRequest(actions, callback) {
  xhr = new XMLHttpRequest();
  xhr.open("POST", ajaxurl, true);
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // console.log(response);
      if (response.success) {
        callback(response.data); // Call the function to display data
      } else {
        // console.error(response);
      }
    }
  };

  xhr.send(`action=${actions}`); // Send the AJAX request to fetch data
}

function makeAjaxRequestGlobal(fromdata, action, editorId) {
  var editorContent = wp.editor.getContent(editorId);

  var formData = new FormData(fromdata);
  // formData.append(editorId, editorContent);
  formData.append("action", action);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", ajaxurl, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // console.log(response.data);
        console.log(response);
        // Handle success message or any other action
      } else {
        // console.log(response.data);
        // Handle error message or any other action
      }
    }
  };
  xhr.send(formData);
}

function checkHexCode(element, tColor, value) {
  var isValidHex = /^#[0-9A-F]{6}$/i.test(value);

  if (isValidHex) {
    // Prepend the "#" symbol to the input value
    value = value;
    console.log(value);
    // Set the color input value
    tColor.value = value;
    element.style.backgroundColor = "#fff";
  } else {
    console.log("Not a valid hex color code");

    element.style.backgroundColor = "red";
  }
}

const setColorType = (element, setColorTypes) => {
  element.addEventListener("keyup", (ev) => {
    let colorValue = ev.target.value;
    checkHexCode(element, setColorTypes, colorValue);
    // Check if the input value is a valid hex color code
  });
};

// change the color input  type color on change
const colorTypes = (element, value) => {
  element.addEventListener("change", (ev) => {
    value.value = ev.target.value;
  });
};

// toggle teh check box
function toggleCheckbox(id, element, button) {
  const checkbox = document.querySelectorAll(`.${id}`);
  const buttons = document.querySelectorAll(`.${element}`);

  buttons.forEach((btnItem, index) => {
    btnItem.addEventListener("click", () => {
      checkbox.forEach((checkbox) => {
        if (checkbox.checked) {
          // If the checkbox is checked, set it to unchecked
          checkbox.checked = false;

          checkbox.value = "off";
          buttons.innerText = "Active";
        } else {
          // If the checkbox is unchecked, set it to checked
          checkbox.checked = true;

          checkbox.value = "on";
          buttons.innerText = "Inactive";
        }
      });
    });
  });
}
