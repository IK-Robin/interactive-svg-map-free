document.addEventListener("DOMContentLoaded", () => {
 
  // try to set the title on popup
  const new_map_id_sub = document.getElementById("new_map_id_sub");
  const new_map_id_edit = document.getElementById("new_map_id_edit");
  // Get the modal
  const submitBtn =document.getElementById("submitBtn");
  var modal = document.getElementById("ikr_myModal");
  // modal_select_map.value = urlvalue;
  // Get the button that opens the modal

  // check the url if edit true
  if (urlEdit == "true") {
    modal.style.display = "none";
  }  else {
    modal.style.display = "block";
  }
 
// check the  url id if there iny id on load if there have iny id  then do  this 
   if (ulrMapId ) {
  
    modal.style.display = "none";
  }

  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("ikr_close_title")[0];

  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function () {
  //   modal.style.display = "none";
  // };

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }

  // set the map title on edit url value
  let modalCountryName = "";
  const defaultValue = 'us';

  country.map((item, index) => {
   
    modalCountryName += `<option value="${item.countryId}">${item.countryId}</option>`;
  });
  
  modal_select_map.innerHTML = modalCountryName;
  
  // modal_select_map.innerHTML = modalCountryName;
  
  
  // modal_select_map.innerHTML = modalCountryName;
  // modal_select_map[0].selected =true;
  // modal_select_map.selectedIndex = 0;


  modal_select_map.value = urlvalue;
  new_map_id_edit.value = ulrMapId;
  new_map_id_sub.value = ulrMapId;

  var mapTitle = document.getElementById("ikr_set_title");
  // Get user input on submit

  mapTitle.value = urlvalue;
  function NewMapSet (mptTitle) {
    // Do something with the user input (e.g., send it to server, process it, etc.)
    let mapRandomId = Math.floor(Math.random(89374345) *997545);
    urlParams.set("id", `map${mapRandomId}`);
    urlParams.set("title", mapTitle.value);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlParams}`
    );

    let urlIds = urlParams.get('id');
    mapTitle.value == '' || null?  ikr_post_titles.value= `no title ${urlIds}`: ikr_post_titles.value = mapTitle.value;


    
    new_map_id_sub.value = urlIds;
    new_map_id_edit.value = urlIds;
    
    ikr_sub_post_Title.value = mapTitle.value;
    ikr_edit_post_Title.value = mapTitle.value;

    // Close the modal (if needed);
    modal.style.display = "none";
  }

  submitBtn.addEventListener("click",NewMapSet);

  // set the country name using cuntry data

  //   modal_select_map.addEventListener('change', (e) =>{
  //     map_country_img_select.value= e.target.value;
  //   })



  modal_select_map.addEventListener("change", (ev) => {
    let selectsCountry = ev.target.value;

    country.map((item) => {
      if (item.countryId == selectsCountry) {
        const baseURL = "admin.php?page=interactive-geo-data-add";
        const modifiedURL = `${baseURL}&value=${selectsCountry}`;

        window.location.href = modifiedURL;
        let imageUrl = getCountryImageUrl(selectsCountry);
        // console.log(get_url.img)
        ikrgooMap.setAttribute("data", imageUrl);

        // Trigger the mouseenter event on ikrgooMap
        const mouseEnterEvent = new MouseEvent("mouseenter");
        ikrgooMap.dispatchEvent(mouseEnterEvent);

        // set teh title on change
        //  datas.map(mapTitle =>{
        //   if(selectsCountry ==mapTitle.country && urlTitle ==mapTitle.post_titles){
        //     ikr_post_titles.value = mapTitle.post_titles;
        //   }
        //  });
      }
    });
  });

  // modal_select_map[0].selected=true

  console.log(modal_select_map.value)
  console.log(submitBtn)
  if (modal_select_map.value === '') {
    submitBtn.setAttribute('disabled','');
    submitBtn.removeEventListener('click',NewMapSet )
    modal_select_map.value = 'select a map ';
    map_country_img_select.value = 'select a map';
    map_country_img_select.dispatchEvent(new Event('change'));
    // location.reload(); // This line will reload the page
  }
});
