const ikrgooMap = document.querySelector(".svg_img_obj");

let readmorebtn_sub = document.getElementById('readmorebtn_sub');
let readmorebtn_edit = document.getElementById('readmorebtn_edit');
const ikrtooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");
const map_img = document.getElementById("map_img");
const map_details = document.getElementById("map_details");
const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const btnTxt = document.getElementById('btnTxt');
let btnLink = btnTxt.querySelector('a');
const detail_img = document.getElementById('detail_img');
// const btnLink = btnTxt.firstChild();
// console.log(btnLink)

const closebtn = document.getElementById("close");
const ikrHeidSubmitForm = document.getElementById("rdata_from");
let formSubmitBtn =
  ikrHeidSubmitForm.lastElementChild.childNodes[3].childNodes[35];
const rdata_edit_from = document.getElementById("rdata_edit_from");
const checkbox = document.getElementById("ikrCheckbox");
const dropdownOptions = document.getElementById("dropdownTooltip");
// remove map_country_img_select from the input form  
// const map_country_img_select = document.getElementById(
//   "map_country_img_select"
// );
const ikr_post_titles = document.getElementById("ikr_post_titles");

const hddenCountryName = document.getElementById("hddenCountryName");
let dropdownTooltip = document.getElementById("dropdownTooltip_sub");
let dropdownTooltip_edit = document.getElementById("dropdownTooltip_edit");

let map_id_select = document.getElementById("map_id_select");

let ikr_sub_post_Title = document.getElementById("ikr_sub_post_Title");
let ikr_edit_post_Title = document.getElementById("ikr_edit_post_Title");
let selected_country = document.getElementById("selected_country");
let tab = [];
// check is edit true or false
let isEdit = true;
let htmlCountryName = "";
let xhttp = new XMLHttpRequest();

// store the map zoom variable outside the onLoadshowdata

let mouseX;
let mouseY;
let mouseTX;
let mouseTY;
let addTransformLavelX = 35;
let addTransformLavelY = 10;
let isZoom = true;
let startX = 0;
let startY = 0;
let panning = false;

const ts = {
  scale: 1,
  rotate: 0,
  translate: {
    x: 0,
    y: 0,
  },
};
// tooltips variable 
 // Make tooltip options
 let tooWithDetail = true;
 let onlytooltip = false;
 let onclickShoTooltip = false;





// set the data attribute on load and change the image
ikrgooMap.setAttribute("data", `${get_url.plugin_url}/assets/${urlvalue}.svg`);

// set the hidden country name using urlparam

hddenCountryName.value = urlvalue;
const tooltipForm  = document.getElementById('tooltipForm');
const tooltipFormMapId = document.getElementById('tooltipFormMapId');

dropdownOptions.addEventListener("change", (dev) => {
  let selectedDropDownValue = dev.target.value;
  tooltipFormMapId.value =ulrMapId;
  
  // Assuming you have a function called `makeAjaxRequest` that takes two arguments.
  if (selectedDropDownValue == "tooWithDetail") {

    closebtn.style.display = "none";
    onlytooltip = false;
    tooWithDetail = true;
    onclickShoTooltip = false;
    ikrtooltip.style.display = "none";
  } else if (selectedDropDownValue == "onlytooltip") {
    onlytooltip = true;
    tooWithDetail = false;
    onclickShoTooltip = true;
    ikrtooltip.style.display = "block";
    detail.style.display = "block";
   

  } else if (selectedDropDownValue == "onclickShoTooltip") {
    onclickShoTooltip = true;
    onlytooltip = false;
    tooWithDetail = false;
    ikrtooltip.style.display = "block";
    detail.style.display = "none";
    if(tooWithDetail === false){

    }
   
    
  }



  dropdownTooltip.value = selectedDropDownValue;
  dropdownTooltip_edit.value = selectedDropDownValue;

  makeAjaxRequestGlobal(tooltipForm,get_url.tooltipForm);
  setTimeout(() => {
    fetchAjaxRequest("rdata_fetch_data", (response) => {
      onLoadshowdata(response);
  
      //  console.log(response)
    });
  }, 200);
});

function sendWindowLocation(url) {
  // let  xhttp = new XMLHttpRequest();

  // Define the callback function for the AJAX request
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = `${url}?value=${"us"}`;
    }
  };
}

function sendValueUrl(fileUrl) {
  let xhttp = new XMLHttpRequest();
  var url = `${fileUrl}?value=${"us"}`;

  // Open the AJAX request with the GET method and URL
  xhttp.open("GET", url, true);

  // Send the AJAX request to Page 2
  xhttp.send();
}
// remove the country image change to on change map_country_img_select 
// country.map((item) => {
//   htmlCountryName += `<option value="${item.countryId}"> ${item.countryId}</option>`;
// });
// map_country_img_select.innerHTML = htmlCountryName;
// map_country_img_select.value = urlvalue;

function getCountryImageUrl(countryId) {
  // Replace 'your-plugin-directory' with the actual directory path of your plugin

  return get_url.plugin_url + "assets/" + countryId + ".svg";
}
// console.log(closebtn)
let postTitleOnKeup = "";
function onLoadshowdata(datas) {
  // check the post title on load

  getcountryId(datas);

  let emptyMap_id = [];
  datas.map((item) => {
    // check the country and
    // console.log(ulrMapId)

    // filter the map on edit if there have any ulrMapId
    if (item.new_map_id == ulrMapId) {
      dropdownOptions.value = item.tooltip_options;
    }
  });

  // get the svg
  const ikrsvgDocc = ikrgooMap.contentDocument;
  const ikrsvg = ikrsvgDocc.querySelector("svg");

  // set the map title on load using url title

  datas.map((mapTitle) => {
    if (mapTitle.country == urlvalue) {
      ikr_post_titles.value = urlTitle;
    }
  });
  ikr_edit_post_Title.value =
    urlTitle == null || "" ? postTitleOnKeup : urlTitle;
  ikr_sub_post_Title.value =
    urlTitle == null || "" ? postTitleOnKeup : urlTitle;
  // console.log(postTitleOnKeup)
  // remove the country image change to on change map_country_img_select 

  // change the map link on change the map country image select their id
  // map_country_img_select.addEventListener("change", (ev) => {
  //   let selectsCountry = ev.target.value;

  //   country.map((item) => {
  //     if (item.countryId == selectsCountry) {
  //       const baseURL = "admin.php?page=interactive-geo-data-add";
  //       const modifiedURL = `${baseURL}&value=${selectsCountry}`;

  //       window.location.href = modifiedURL;
  //       let imageUrl = getCountryImageUrl(selectsCountry);
  //       // console.log(get_url.img)
  //       ikrgooMap.setAttribute("data", imageUrl);

  //       // Trigger the mouseenter event on ikrgooMap
  //       const mouseEnterEvent = new MouseEvent("mouseenter");
  //       ikrgooMap.dispatchEvent(mouseEnterEvent);

  //       // set teh title on change
  //       datas.map((mapTitle) => {
  //         if (
  //           selectsCountry == mapTitle.country &&
  //           urlTitle == mapTitle.post_titles
  //         ) {
  //           ikr_post_titles.value = mapTitle.post_titles;
  //         }
  //       });
  //     }
  //   });
  // });

  // zoom the map on click the button
  function ikrZoom(ikrsvg) {
 
    var currentScale = 1;
    var step = 0.2;

    const zoomIN = document.getElementById("zoom_in");
    const zoomOut = document.getElementById("zoom_out");
    const resets = document.getElementById("reset");

    ikrsvg.style.scrollbarWidth = "none";

    zoomIN.addEventListener("click", (e) => {
      isZoom = true;
      currentScale < 8 ? (currentScale += step) : currentScale;

      applyZoom();
    });

    zoomOut.addEventListener("click", (e) => {
      isZoom = false;
      // currentScale > 1?currentScale -= step: currentScale;
      if (currentScale > 1) {
        currentScale -= step;
      } else {
        currentScale;
        var transformzoomOut = `translate(${0}px, ${0}px) ${
          currentScale > 1 ? `scale(${currentScale})` : `scale(1)`
        }`;
        ikrsvg.style.transform = transformzoomOut;
      }

      applyZoom();
    });
    function applyZoom(e) {
      var currentStyle = ikrsvg.getAttribute("style");
      var currentTranslate = parseTranslate(currentStyle);
      if (currentScale > 1 || currentTranslate.x > 0 || currentTranslate > 0) {
        resets.addEventListener("click", reset);
      }
      detail.style.display = "none";

      var transform = `translate(${currentTranslate.x}px, ${
        currentTranslate.y
      }px) ${currentScale > 1 ? `scale(${currentScale})` : `scale(1)`}`;
      var transformzoomOut = `translate(${0}px, ${0}px) ${
        currentScale > 1 ? `scale(${currentScale})` : `scale(1)`
      }`;
      ikrsvg.style.transform = transform;
      // Update the ts object with the currentScale value
      ts.scale = currentScale;
    }

    function parseTranslate(style) {
      var translateRegex = /translate\(([^,]+),([^)]+)\)/;
      var match = style.match(translateRegex);

      if (match) {
        return {
          x: parseFloat(match[1]),
          y: parseFloat(match[2]),
        };
      } else {
        return { x: 0, y: 0 };
      }
    }

    // rotate.oninput = function(event) {
    //   event.preventDefault();
    //   ts.rotate = event.target.value;
    //   setTransform();
    // };

    // ikrsvg.onwheel = function(event) {
    //   event.preventDefault();
    //   //need more handling  to avoid fast scrolls
    //   console.log(event)
    //   var func = ikrsvg.onwheel;
    //   ikrsvg.onwheel = null;
    //   console.log('hh');

    //   let rec = ikrsvg.getBoundingClientRect();
    //   let x = (event.clientX - rec.x) / ts.scale;
    //   let y = (event.clientY - rec.y) / ts.scale;

    //   let delta = (event.wheelDelta ? event.wheelDelta : -event.deltaY);
    //   ts.scale = (delta > 0) ? (ts.scale + 0.2) : (ts.scale - 0.2);

    //   //let m = (ts.scale - 1) / 2;
    //   let m = (delta > 0) ? 0.1 : -0.1;
    //   ts.translate.x += (-x * m * 2) + (ikrsvg.offsetWidth * m);
    //   ts.translate.y += (-y * m * 2) + (ikrsvg.offsetHeight * m);

    //   setTransform();
    //   ikrsvg.onwheel = func;
    // };

    function getTheMouseDownCordenet(event) {
      event.preventDefault();
      panning = true;

      ikrsvg.style.cursor = "grabbing";
      mouseX = event.clientX;
      mouseY = event.clientY;
      mouseTX = ts.translate.x;
      mouseTY = ts.translate.y;
    }
    ikrsvg.addEventListener("mousedown", getTheMouseDownCordenet);

    ikrsvg.onmouseup = function (event) {
      panning = false;
      ikrsvg.style.cursor = "grab";
    };
    ikrsvg.onmouseout = function (event) {
      panning = false;
      ikrsvg.style.cursor = "auto";
    };

    ikrsvg.onmousemove = function (event) {
      event.preventDefault();
      let rec = ikrsvg.getBoundingClientRect();
      let xx = event.clientX - rec.x;
      let xy = event.clientY - rec.y;

      const x = event.clientX;
      const y = event.clientY;
      pointX = x - startX;
      pointY = y - startY;
      if (!panning) {
        return;
      }
      ts.translate.x = mouseTX + (x - mouseX);
      ts.translate.y = mouseTY + (y - mouseY);
      setTransform();
    };

    function setTransform() {
      const steps = `translate(${ts.translate.x}px,${ts.translate.y}px) scale(${ts.scale}) rotate(${ts.rotate}deg) translate3d(0,0,0)`;
      //console.log(steps);
      ikrsvg.style.transform = steps;
    }

    function reset() {
      ts.scale = 1;
      currentScale = 1;
      ts.translate = {
        x: 0,
        y: 0,
      };

      ikrsvg.style.transform = "none";
    }

    setTransform();
  }
  ikrZoom(ikrsvg);
  // zoom the map on click the button

  let ikrItems = ikrsvg.querySelectorAll(
    "rect,path",
    "circle",
    "polygon",
    "text"
  );

  // set the map id using select and option and edit the code

  let htmlMapId = "";
  // get the id of the pate set the id of the map
  ikrItems.forEach((selectId, ind) => {
    // set the map id on load

    if (ind === 0) {
      map_id.value = selectId.id;
      map_id_edit.value = selectId.id;
    }
    datas.map((checkOnLoadEditOrSub) => {
      if (checkOnLoadEditOrSub.new_map_id == ulrMapId) {
        if ((map_id.value == ind) == 0) {
          rdata_edit_from.style.display = "block";

          ikrHeidSubmitForm.style.display = "none";
        } else {
          rdata_edit_from.style.display = "none";
          ikrHeidSubmitForm.style.display = "block";
        }
      }
    });

    htmlMapId += `<option value="${selectId.id}"> ${selectId.id}</option>`;
  });
  map_id_select.innerHTML = htmlMapId;

  map_id_select.addEventListener("change", (ev) => {
    let selectedId = ev.target.value;

    map_id.value = selectedId;
    map_id_edit.value = selectedId;
    selected_country.innerHTML = `Selected Section ${selectedId}`;
    datas.map((item) => {
      ikrItems.forEach((ikrItem) => {
        if (ikrItem.id == selectedId) {
          ikrItem.style.strokeWidth = "2";
          ikrItem.style.stroke = "red";
        } else {
          if (ikrItem.id == item.map_id) {
            ikrItem.style.fill = item.fill_color;
          }
        }
      });

      if (item.map_id === selectedId) {
        rdata_edit_from.style.display = "block";
        console.log(rdata_edit_from);
        ikrHeidSubmitForm.style.display = "none";
        itemDetail(item);
        // console.log(item.map_id === ev.target.value)
        // ikrTitle_edit.value='dd'
      } else {
        ikrHeidSubmitForm.style.display = "block";
        rdata_edit_from.style.display = "none";
        rdata_from.style.display = "block";
      }
    });
  });

  // set the map id using select and option and edit the code
  // add posts Title and set the input form value
  const edit_title_onload = document.getElementById("edit_title_onload");
  let editAllMapInput = document.getElementById("editAllTitle");
  let editAllTitle = document.getElementById("editAllMapId");
  // set the value editAllTitle
  editAllTitle.value = ulrMapId;
  ikr_post_titles.addEventListener("keyup", (ev) => {
    console.log(formSubmitBtn);
    let postTitle = ev.target.value;
    // check the title if title empity theen do this
    if (postTitle == "" || null) {
      // alert("title can't be empity if submit the form add a title ")
      formSubmitBtn.setAttribute("disabled", "");
    } else {
      formSubmitBtn.removeAttribute("disabled", "");
    }
    if (postTitle == "" || null) {
    }
    editAllMapInput.value = postTitle;
    // set the url title on keyup
    urlParams.set("title", postTitle);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );
    // set the title on keyup all matching id  and set the value condotionaly;
    editAllMapInput.value == "" || null
      ? (editAllMapInput.value = "no title " + ulrMapId)
      : (editAllMapInput.value = postTitle);
    console.log(editAllMapInput.value);
    ikr_sub_post_Title.value = postTitle;
    ikr_edit_post_Title.value = postTitle;
    postTitleOnKeup = postTitle;

    makeAjaxRequestGlobal(edit_title_onload, get_url.all_title_edit);
  });

  // all functions
  // add the list item in the bottom
  function displayDatabaseData(data) {
    let mapItemIndex=1;
    const databaseData = document.getElementById("database-data");
    let html = "";
    data.forEach(function (item, index) {
      if (item.country === urlvalue && item.new_map_id == ulrMapId) {
        html += `<div class ="idk_map_detail  ">
        
        <div class="item_container">
      
        <p> ${mapItemIndex++}</p>
        </div>  
        <div class="item_container">

        <p> ${item.map_id}</p>
        </div>  
        <div class="item_container">
        
        <p> ${item.title}</p>
        </div>
        
        <div class="item_container">
        <p> ${item.map_des}</p>
        </div> 
   <div class="item_container">
   
   <p> ${item.hov_color}</p>
   </div>

   <div class="item_container">
   <p>${item.fill_color}</p>
   </div>
  
     <div class="item_container">
     <p>${item.click_color}</p></div>
<div class=" item_container">

<div class="mapData_img"> 

<img  src="${item.map_img}" alt="">

</div>
</div>
<div class=" item_container">
<button type ="button" data-id=${
          item.map_id
        } class="edit_from_list  edit_list button-primary">
        <span data-id=${item.map_id} 
        class="dashicons dashicons-edit"></span></button>


        <button type ="button" data-id=${
          item.map_id
        } class="edit_from_list  end_edit_from_list ">
        close e</button>
</div>
<div class=" item_container">
<form data-did=${item.map_id} class="ikrdelet" id="${item.map_id}" >
       
<input type="hidden" name="delet_list_item" value=${item.map_id}>
<button class="edit_from_list button-primary" type ="submit" ><span class="dashicons dashicons-trash"></span></button>
</form>
</div>

 </div>
 <div class="EditFormToggle ">
 </div>
           
       `;
      }

      databaseData.innerHTML = html;
    });

    // databaseData.innerHTML = html;
  }

  // select the image edit btn

  // select the hidden input and set it value on tooltip option

 

  // Make tooltip options
  function ikrshowTooltip(hover) {
    let mapId = hover.target.id;
    // console.log(mapId);
    let cx = hover.clientX;
    let cy = hover.clientY;
    datas.map((item) => {
      // set the fill colore

      // check the map title if there any map title then work properly else none
      if (item.country == urlvalue && item.new_map_id == ulrMapId) {
        // console.log(item.post_titles +  " " + urlTitle)
        ikrColorThePath(hover, mapId, item.hov_color, item.map_id);
        if (mapId == item.map_id) {
          if (item.tooltip_options == "tooWithDetail") {
            ikrShowDetailFunc(item, cy, cx);
            closebtn.style.display = "none";
            onlytooltip = false;
            tooWithDetail = true;
            onclickShoTooltip = false;
            ikrtooltip.style.display = "none";
          } else if (item.tooltip_options == "onlytooltip") {
            onlytooltip = true;
            tooWithDetail = false;
            onclickShoTooltip = false;
            ikrtooltip.style.display = "block";
            // stop the detail in same position on click 
            // detail.style.display = "none";
            ikrtooltip.innerHTML = item.title;
        
            ikrtooltip.style.left = `${cx}px`;
            ikrtooltip.style.top = `${cy}px`;
          } else if (item.tooltip_options == "onclickShoTooltip") {
            onclickShoTooltip = true;
            onlytooltip = false;
            tooWithDetail = false;
            ikrtooltip.style.display = "block";

            detail.style.display = "none";
            if (item.title == '' || null){
              // ikrtooltip.style.display = "none";
              ikrtooltip.innerHTML = 'pload id ='+ item.map_id;
            }else{
              ikrtooltip.innerHTML = item.title;
       
            ikrtooltip.style.left = `${cx}px`;
            ikrtooltip.style.top = `${cy}px`;
            }
            
          }
        }
      }
    });
  }

  function ikrShowDetailFunc(item, cy, cx) {

    detail.style.display = "block";

    plotId.innerText = item.map_id;
    item.title ==''  ? detail_name.style.display ='none':detail_name.innerHTML = item.title;

    detail_des.innerHTML = item.map_des;
    if(item.read_more_btn == ''|| null){
      btnTxt.style.display ='none';
   
    }else{
      

      btnLink.setAttribute('href',item.map_link);
      btnLink.innerHTML = item.read_more_btn;
      
      btnTxt.style.display ='block';
    }
    console.log(item.map_img)
if (item.map_img === '' ){
  console.log('detail_img')
  detail_img.style.display ='none';
}else{
  detail_img.style.display ='block';
  console.log('detadil_img')
  map_img.setAttribute("src", item.map_img === null ? "" : item.map_img);
}

    detail.style.left = `${cx}px`;
    detail.style.top = `${cy}px`;
  }

  // add mouse out functions

  const ikrmouseOutF = (mout) => {
    let mapId = mout.target.id;
    // if (tooWithDetail == true) {
    //   detail.style.display = "none";
    // }
    ikrtooltip.style.display = "none";
    datas.map((item) => {
      if (mout.target.tagName == "path") {
        let targetPath = mout.target;
        let getId = targetPath.getAttribute("id");
        if (
          mapId == getId &&
          getId === item.map_id &&
          item.country === urlvalue &&
          item.new_map_id == ulrMapId
        ) {
          targetPath.setAttribute("fill", item.fill_color);
        }
      }
    });
  };

  const ikrClickEvFunc = (clickEV) => {
    // ikrtooltip.style.display = "none";
    ikrHeidSubmitForm.style.display = "block";
  
    let dd = document.getElementById("editor-container_edit");

    dd.innerHTML = "hh";
    itemDetailEmpty();
    let mapId = clickEV.target.id;
    map_id_select.value = mapId;
    map_id.value = mapId;
    selected_country.innerHTML = `Selected Section ${mapId}`;
    getTheColorFromInPTColor();
    // map_id_edit.value = mapId;
    // checkbox.checked = true;

    // set the data in new array and compaire it
    let newData = [];
    datas.map((item) => {
      if (item.country === urlvalue && item.new_map_id == ulrMapId) {
        newData.push(item);
      }
    });

    //  compaire it

    if (newData.length == 0) {
      // console.log('emp')
    } else {
      // check the data and make hide and show the input from ;
      let i = 0;
      let item;

      do {
        item = newData[i];

        if (mapId === item.map_id) {
          rdata_edit_from.style.display = "block";
          // rdata_edit_from.style.position = "relative";

          ikrHeidSubmitForm.style.display = "none";
        } else if (mapId !== item.map_id) {
          ikrHeidSubmitForm.style.display = "block";
          rdata_edit_from.style.display = "none";
        }

        i++;
      } while (i < newData.length && mapId !== item.map_id);
      // check the data and make hide and show the input from ;
    }

    datas.forEach((item) => {
      // filter the data in top so all data work properly
      if (item.country === urlvalue && item.new_map_id == ulrMapId) {
        let tol = item.tooltip_options == null;
        // console.log(tol)

        if (clickEV.target.tagName === "path") {
          // clickEV.style.fill = 'red'
          
          if(dropdownOptions.value == ''|| null) {
            console.log('ddnnn')
            dropdownOptions.value= 'tooWithDetail';
            dropdownTooltip.value = 'tooWithDetail';
  dropdownTooltip_edit.value ='tooWithDetail';
          }
          // dropdownOptions.value = item.tooltip_options;
          // item.tooltip_options == null ? dropdownOptions.value ='onlytooltip':  dropdownOptions.value = item.tooltip_options;
          // item.tooltip_options

          // if(item.tooltip_options == null){
          //   console.log(item.tooltip_options);
          //   dropdownOptions.value = item.tooltip_options;
          // }
          // if(tol  ){
          //   console.log(item.tooltip_options)

          // }else{
          //   console.log('first')
          // }

          let targetPath = clickEV.target;

          let getId = targetPath.getAttribute("id");


          if (
            onlytooltip==false  &&
            tooWithDetail == false &&
            onclickShoTooltip
          ) {
            closebtn.style.display = "block";
            closebtn.classList.add("close_btn_toolTip");
            ikrItems.forEach((clickItem) => {
              clickItem.removeEventListener("mousemove", ikrshowTooltip);
              clickItem.removeEventListener("mousemove", ikrmouseOutF);
            });
          }

          if (item.map_id === mapId) {
            itemDetail(item);

            closebtn.addEventListener("click", (e) => {
              closebtn.classList.remove("close_btn_toolTip");
              detail.style.display = "none";
              isEdit = false;
              onclickShoTooltip = false;
              onlytooltip =true;
              detail.style.pointerEvents = "none";
              // isEditBtn.innerHTML = "edit";
              ikrItems.forEach((items) => {
                items.addEventListener("mousemove", ikrshowTooltip);
                items.addEventListener("mouseout", ikrmouseOutF);
                // items.addEventListener("click", ikrClickEvFunc);
              });
              targetPath.setAttribute("fill", item.fill_color);
            });

            let cx = clickEV.clientX;
            let cy = clickEV.clientY;
            if (
              onclickShoTooltip || onlytooltip||
              item.tooltip_options == "onclickShoTooltip"
            ) {
              ikrShowDetailFunc(item, cy, cx);
              detail.style.pointerEvents = "all";
              detail.style.display ='block';
              if (cx < 100 || cx < 160) {
                detail.style.left = `${cx + 50}px`;
              } else {
                detail.style.left = `${cx}px`;
              }

              if (cy < 100) {
                detail.style.top = `${cy + 50}px`;
              } else {
                detail.style.top = `${cy}px`;
              }
            }
          }

          if (getId === item.map_id) {
            targetPath.setAttribute("fill", item.click_color);
          }
        }
      }
    });

    // if (isEdit == true) {
    //   isEdit = true;
    //   isEditBtn.innerHTML = "stop editing";
    //   ikrHeidSubmitForm.style.display = "none";
    //   rdata_edit_from.style.display = "block";
    //   rdata_edit_from.style.position = "relative";
    //   edit_from_list_F(datas);

    // }
    // add edit
    // isEditBtn.addEventListener("click", () => {
    //   if (isEdit == false) {
    //     isEdit = true;
    //     isEditBtn.innerHTML = "stop editing";
    //     ikrHeidSubmitForm.style.display = "none";
    //     rdata_edit_from.style.display = "block";
    //     edit_from_list_F(datas);

    //   } else {
    //     isEditBtn.innerHTML = "edit";
    //     isEdit = false;
    //   }
    // });
  };

  // all functions

  // set the fill color of the item
  // and check the active path and deactive path
  ikrItems.forEach((items) => {
    let ide = items.id;
    // console.log('ID:', ide);
    let i = 0;
    let item;
    // compaire the map using their item.new_map_id  ulrMapId

    // filter the data is active or not if not
    datas.map((item) => {
      if (
        item.map_id == ide &&
        item.country === urlvalue &&
        item.new_map_id == ulrMapId
      ) {
        // console.log(item);
        // check is active  == 0

        items.setAttribute("fill", item.fill_color);

        // items.addEventListener("mouseenter", (ids) => {
        //   console.log("first 0");
        items.addEventListener("click", () => {
          ikrHeidSubmitForm.style.display = "none";
          rdata_edit_from.style.display = "block";
          itemDetail(item);
          map_id_edit.value = ide;
          selected_country.innerHTML = `Selected Section:- "${ide}"`;
        });
        // map_id_edit.value = id.target.id;
        //   // console.log(ids.target.id)

        //   items.removeEventListener("mousemove", ikrshowTooltip);
        //   items.removeEventListener("mousemove", ikrmouseOutF);
        //   items.removeEventListener("click", ikrClickEvFunc);
        // });

        // items.addEventListener("mouseout", () => {
        //   items.addEventListener("mousemove", ikrshowTooltip);
        //   items.addEventListener("mousemove", ikrmouseOutF);
        //   items.addEventListener("click", ikrClickEvFunc);
        // });

        // check is active  == 1 if 1 then set the fill color
        // if (item.is_active === "1") {
        //   // console.log(item.is_active);
        //   items.setAttribute("fill", item.fill_color);
        // }
      }
    });
  });
  // select the svg path
  // console.log(tab);

  // set the color on mouse enter and out
  const ikrColorThePath = (events, mapId, fill_color, map_id) => {
    // check the terget path
    if (events.target.tagName == "path") {
      let targetPath = events.target;
      let getId = targetPath.getAttribute("id");

      if (mapId == getId && getId === map_id) {
        targetPath.setAttribute("fill", fill_color);
      }
    }
  };
  // set the color on mouse enter and out
  ikrItems.forEach((ev, ind) => {
    let ids = ev.id;

    let id = {
      id: ids,
    };
    tab.push(id);
  });
  // add hover effect on mouse enter to the item

  function revalidetAjaxRequest() {
    // console.log('re')

    // declear tooltip functions

    displayDatabaseData(datas);

    // ll('robin')

    // add mouse out functions

    ikrItems.forEach((clickItem) => {
      clickItem.addEventListener("mousemove", ikrshowTooltip);
    });

    // click to show the data on detail popup
    ikrItems.forEach((clickItem) => {
      clickItem.addEventListener("click", ikrClickEvFunc);
    });

    // functions on mouse oute

    ikrItems.forEach((mout) => {
      mout.addEventListener("mouseout", ikrmouseOutF);
    });
  }
  revalidetAjaxRequest();
  // add the edit function from the edti list
  // come from ikr-edit-function
  edit_from_list_F(datas);
  ikrdeletFuncs();

  // ll('hhh')
  // add the edit function from the edti list
}

function sendDataToDB(datas) {
  onLoadshowdata(datas);
  // setInterval(revalidetAjaxRequest, 1000);
}

function shoes() {
  fetchAjaxRequest("rdata_fetch_data", (response) => {
    onLoadshowdata(response);

    //  console.log(response)
  });
}

// remove the tinyMCE editor functin
function removeEditorsAndContent() {
  const editor = tinyMCE.get("ikr_tynamic");

  if (editor) {
    editor.destroy(); // Destroy the TinyMCE editor instance
  }

  const newTextArea = document.getElementById("ikr_tynamic");
  if (newTextArea) {
    const ikr_tynamic = document.getElementById("ikr_tynamic");
    ikr_tynamic.remove();
  }
}

// window.addEventListener('load',shoes());
// add all edit from input
function itemDetail(item) {
  let readmorebtn_sub = document.getElementById('readmorebtn_sub');
  let readmorebtn_edit = document.getElementById('readmorebtn_edit');
  dropdownTooltip.value = item.tooltip_options;
  dropdownTooltip_edit.value = item.tooltip_options;
  dropdownOptions.value = item.tooltip_options;

  let image_url_edit = document.getElementById("image_url_edit");
  let map_url_edit = document.getElementById("map_url_edit");
  ikrTitle_edit.value = item.title;
  var editos = tinyMCE.get("editor-container_edit");
  if (editos) {
    editos.setContent(item.map_des);
  }
  // ikrdes_edit.value = item.map_des;
  // set the value of  tooltip options
  
  
  image_url_edit.value = item.map_img;
  map_url_edit.value = item.map_link;
  hovecolor_edit.value = item.hov_color;
  typeHovcolor_edit.value = item.hov_color;
  fill_color_edit.value = item.fill_color;
  filltype_edit.value = item.fill_color;
  clickcolor_edit.value = item.click_color;
  typeClickColor_edit.value = item.click_color;

// set the readmore btn on sub 
readmorebtn_edit.value = item.read_more_btn;
readmorebtn_sub.value = item.read_more_btn;
  // const ikrCheckbox_edit = document.getElementById("ikrCheckbox_edit");
  // ikrCheckbox_edit.checked = item.is_active == 1 ? true : false;
}
function itemDetailEmpty(item) {
  const ikrCheckbox_edit = document.getElementById("ikrCheckbox_edit");

  map_id.value = "";
  ikrTitle.value = "";
  // ikrdes.value = '';

  // ikrCheckbox_edit.checked = true;
  image_url.value = "";
  readmorebtn_sub.value ='';
}

// put the media uploader function outside auto reloader function to solve duble click proplem
imageUpload("upload_image_button_edit", "image_url_edit");
imageUpload("upload_image_button", "image_url");

function getTheColorFromInPTColor(){
  hovecolor.value=typeHovcolor.value;
  fill_color.value=filltype.value;
  clickColor.value=typeClickColor.value;
}