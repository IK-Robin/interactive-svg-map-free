document.addEventListener("DOMContentLoaded", (loadDocum) => {
  const ikrSvgObj = document.querySelector(".svg_img_obj");

  const ikrtooltip = document.getElementById("tooltip");
  const detail = document.getElementById("detail");
  const map_img = document.getElementById("map_img");
  const map_details = document.getElementById("map_details");
  const plotId = document.getElementById("plotId");
  const detail_name = document.getElementById("detail_name");
  const detail_des = document.getElementById("detail_des");
  const closebtn = document.getElementById("close_font");

  let tab = [];
  function getCountryImageUrl(countryId) {
    // Replace 'your-plugin-directory' with the actual directory path of your plugin
  
    return img_path.plugin_url + "assets/" + countryId + ".svg";
  }

  const isEditBtn = document.getElementById("isEditBtn");
  

  function setColorOnload(datas) {

    // const ikrsvgDocc = ikrSvgObj.contentDocument;
    // const ikrImap = ikrsvgDocc.querySelector("svg");

    // const ikrImapItems = ikrImap.querySelectorAll(
    //   "rect,path",
    //   "circle",
    //   "polygon",
    //   "text"
    // );

    let countrys=[];
    datas.map(item =>{


      if (ShrtCMapId == item.new_map_id){
        if(!countrys.includes(item.country))
        countrys.push(item.country)
    }})
   

    let imageUrl = getCountryImageUrl(countrys[0]);
    ikrSvgObj.setAttribute("data", imageUrl);
    // console.log(imageUrl)

  }

  


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

  function addAllFunctionFrontEnd(datas) {
    // set the color  of the path
    


    const ikrsvgDocc = ikrSvgObj.contentDocument;
    const ikrImap = ikrsvgDocc.querySelector("svg");

    const ikrImapItems = ikrImap.querySelectorAll(
      "rect,path",
      "circle",
      "polygon",
      "text"
    );
   
      ikrZoom(ikrImap);


    datas.map(item =>{



       // set the fill color of the item on load 
  // and check the active path and deactive path
  ikrImapItems.forEach((items) => {
    let ide = items.id;
    // console.log('ID:', ide);
    let i = 0;
    let item;

    datas.map((item) => {
      if (item.map_id == ide && item.new_map_id == ShrtCMapId) {
        // check is active  == 0
        


        
          // console.log(items)
          items.setAttribute("fill", item.fill_color);

          // items.addEventListener("mouseenter", (ids) => {
          //   // console.log("first 0");
          
          //   // map_id_edit.value = ids.target.id;
          //   // console.log(ids.target.id)

          //   items.removeEventListener("mousemove", ikrshowTooltip);
          //   items.removeEventListener("mousemove", ikrmouseOutFont);
          //   items.removeEventListener("click", ikrClickEvFunc);
          // });

          // items.addEventListener("mouseout", () => {
          //   items.addEventListener("mousemove", ikrshowTooltip);
          //   items.addEventListener("mousemove", ikrShowDetailFunc);
          //   items.addEventListener("click", ikrClickEvFunc);
          // });
        
        // check is active  == 1 if 1 then set the fill color
      
      }
    });
  });

    })





    
 
    
    // ikr set the tooltip function
    // function ikrshowTooltip(hover) {
    //   let mapId = hover.target.id;
      // console.log(hover)

      // datas.map((item) => {
      //   // set the fill colore
      //   // ikrColorThePath(hover, mapId, item.hov_color, item.map_id);

      //   if (mapId == item.map_id) {
      //     // ikrtooltip.style.display = "block";
      //     // ikrtooltip.innerHTML = item.title;
      //     let cx = hover.clientX;
          
      //     let cy = hover.clientY;
      //     ikrShowDetailFunc(item,cy,cx)
      //     ikrtooltip.style.left = `${cx}px`;
      //     ikrtooltip.style.top = `${cy - 30}px`;
      //   }
      // });
    // }
    

      // Make tooltip options
  let tooWithDetail = true;
  let onlytooltip = false;
  let onclickShoTooltip = false;

  // Make tooltip options
  function ikrshowTooltip(hover) {
    let mapId = hover.target.id;
    // console.log(mapId);
    let cx = hover.clientX;
    let cy = hover.clientY;
    datas.map((item) => {
      // set the fill colore
      
      if (mapId == item.map_id && item.new_map_id == ShrtCMapId) {
      
        if(isMobile()){

        }else{

          ikrColorThePath(hover, mapId, item.hov_color, item.map_id);
        }
       

       
          if (item.tooltip_options == "tooWithDetail") {
            if(item.title =='' && item.map_des =='' && item.map_img ==''){
              
              detail.style.display = "none";
            }else{
              detail.style.display = "block";
              
            }
            detail.style.display = "block";
            ikrShowDetailFunc(item, cy, cx);
            closebtn.style.display = "none";
            onlytooltip = false;
            tooWithDetail = true;
            onclickShoTooltip = false;
           
            ikrtooltip.style.display = "none";
          } else if (item.tooltip_options == "onlytooltip") {
            if(item.title =='' ){
        
              ikrtooltip.style.display = "none";
            }else{
              ikrtooltip.style.display = "block";
            }
            onlytooltip = true;
            tooWithDetail = false;
            onclickShoTooltip = false;
            detail.style.display = "none";
            ikrtooltip.innerHTML = item.title;
         
            ikrtooltip.style.left = `${cx}px`;
            ikrtooltip.style.top = `${cy}px`;
          } else if (item.tooltip_options == "onclickShoTooltip") {

            if(item.title =='' && item.map_des =='' && item.map_img ==''){
              onclickShoTooltip = false;
              onlytooltip = false;
              tooWithDetail = false;
              detail.style.display = "none";
            }else{
              detail.style.display = "block";
              onclickShoTooltip = true;
              onlytooltip = false;
              tooWithDetail = false;
            }

           
            ikrtooltip.style.display = "block";

            detail.style.display = "none";
            if (item.title == '' || null){
              ikrtooltip.style.display = "none";
              
            }else{
              ikrtooltip.innerHTML = item.title;
       
            ikrtooltip.style.left = `${cx}px`;
            ikrtooltip.style.top = `${cy}px`;
            }
            if (item.title == '' || null){
              ikrtooltip.style.display = "none";
              
            }else{
              ikrtooltip.innerHTML = item.title;
       
            ikrtooltip.style.left = `${cx}px`;
            ikrtooltip.style.top = `${cy}px`;
            }
            
          
        }
      }
    });
  }

  function ikrShowDetailFunc(item, cy, cx,mapid) {



    let closeDetail = document.getElementById('close_font');
    if(onclickShoTooltip){
      


    
      ikrImapItems.forEach((items) => {
        items.removeEventListener("mousemove", ikrshowTooltip);
        items.removeEventListener("mouseout", ikrmouseOutFont);
        items.removeEventListener("touchend", ikrmouseOutFont);
      
        // items.removeEventListener("click", ikrClickEvFunc);
       

      });
    
      closeDetail.style.visibility = "visible";
      closeDetail.addEventListener('click', () => {
  
        mapid.setAttribute("fill", item.fill_color);
        ikrImapItems.forEach((items) => {
          items.addEventListener("mousemove", ikrshowTooltip);
          items.addEventListener("mouseout", ikrmouseOutFont);
          items.addEventListener("touchend", ikrmouseOutFont);
          items.addEventListener("click", ikrClickEvFunc);
          items.addEventListener('touchstart',ikrClickEvFunc)
          items.addEventListener('touchmove',ikrClickEvFunc)
        
        });
        onclickShoTooltip = false;
       
        detail.style.display = "none";
        detail.style.pointerEvents = "none";
      });
    }
    
    
    plotId.innerText = item.map_id;
    detail_name.innerHTML = item.title;

    detail_des.innerHTML = item.map_des;

    map_img.setAttribute("src", item.map_img === null ? "" : item.map_img);

    detail.style.left = `${cx}px`;
    detail.style.top = `${cy}px`;
  }






  //   mouse out func 
  const ikrmouseOutFont = (mout) => {

    
    
    
    let mapId = mout.target.id;
    if (tooWithDetail == true) {
      if(isMobile()){

        detail.style.display = "block";
      }else{

        detail.style.display = "none";
      }
    }
    ikrtooltip.style.display = "none";
    datas.map((item) => {
      if (mout.target.tagName == "path") {
        let targetPath = mout.target;
        let getId = targetPath.getAttribute("id");
        if (mapId == getId && getId === item.map_id && item.new_map_id == ShrtCMapId) {
          targetPath.setAttribute("fill", item.fill_color);
        }
      }
    });
  };

  //   mouse out func 

  // click func 
  const ikrClickEvFunc = (clickEV) => {
    
    let mapId = clickEV.target.id;
    let tpath = clickEV.target;

    // detail.style.display ='none';
    function hideDetailClickAnyWhere(){
      // mapid.setAttribute("fill", item.fill_color);
 
      ikrImapItems.forEach((items) => {
        items.addEventListener("mousemove", ikrshowTooltip);
        items.addEventListener("mouseout", ikrmouseOutFont);
        items.addEventListener("touchend", ikrmouseOutFont);
        // items.addEventListener("click", ikrClickEvFunc);
     if(isMobile() ){
      detail.style.display = "block";
    }else{
       detail.style.display = "none";

     }
      });
    }
    hideDetailClickAnyWhere();
   

   
  
      if (datas.length == 0) {
        console.log('emp')
      } else {
        // check the data and make hide and show the input from ;
        let i = 0;
        let item;
  
        
        // check the data and make hide and show the input from ;
      }
  
      datas.forEach((item) => {
        if (clickEV.target.tagName === "path") {
          let targetPath = clickEV.target;
          let getId = targetPath.getAttribute("id");
          // console.log(getId)
          
          // if (onlytooltip || tooWithDetail && onclickShoTooltip ==false){
          //   window.open( `${item.map_link}`,'_blank')
          // }
          
       
          if (item.map_id === mapId && item.new_map_id == ShrtCMapId) {

           


        //  if item.map_id not match mapId then hide the tooltip 
            if (onlytooltip){
              ikrtooltip.style.display = "block";
              detail.style.display ='none';
              // check is onclickShoTooltip true or false 
            }else if(onclickShoTooltip){
        
                detail.style.display ='block';
                ikrtooltip.style.display = "none";
              
              
              
            }

     
            
            // closebtn.addEventListener("click", (e) => {
         
   
             

            // });
  
            // detail.style.display = "block";
            // plotId.innerText = item.map_id;
            // detail_name.innerHTML = item.title;
  
  
            // detail_des.innerHTML = item.map_des;
  
  
  
            // map_img.setAttribute(
            //   "src",
            //   item.map_img === null ? "" : item.map_img
            // );

            let cx = clickEV.clientX;
            let cy = clickEV.clientY;
            // console.log(cx)
            // console.log(cy)
           if(onclickShoTooltip){
            detail.style.pointerEvents ="all";
            
              ikrImapItems.forEach((itemr) => {
                itemr.removeEventListener("mousemove", ikrshowTooltip);
                itemr.removeEventListener("mouseout", ikrmouseOutFont );
                itemr.removeEventListener("touchend", ikrmouseOutFont );
              });
              ikrShowDetailFunc(item,cy,cx,targetPath);
            

           
        

              if (getId === item.map_id) {
                targetPath.setAttribute("fill", item.click_color);
              }

           }
  
          //  switch ( cx < 100 || cx < 160){
          //   case 
          //  }

            if (cx < 100 || cx < 160) {
              detail.style.left = `${cx + 30}px`;
            }else if( cx > 250){
              detail.style.left = `${cx - 80}px`;
            }
            else if(cx > 600){
              let moveLeft =cx - 600 
              console.log(cx - moveLeft)
              console.log(moveLeft)
              detail.style.left = `${cx - moveLeft -100  }px`;

            } 
            
            else {
              detail.style.left = `${cx}px`;
            }
  
            if (cy < 100) {
              detail.style.top = `${cy + 30}px`;
            } else {
              detail.style.top = `${cy}px`;
            }
          }
  
         
        }
      });
  
  
  
   
  
    };
  // click func 




    //  click event
    // click to show the data on detail popup
    ikrImapItems.forEach((clickItem) => {
      clickItem.addEventListener("click", ikrClickEvFunc);
    });

    // mouse move event
    ikrImapItems.forEach((clickItem) => {
      clickItem.addEventListener("mousemove", ikrshowTooltip);
      clickItem.addEventListener('touchstart',ikrshowTooltip)
      clickItem.addEventListener('touchmove',ikrshowTooltip)
      clickItem.addEventListener('touchmove',ikrshowTooltip);
    });
    // detail.addEventListener("touchcancel")

// mouse out func 
ikrImapItems.forEach((mout) => {
  mout.addEventListener("mouseout", ikrmouseOutFont);
  mout.addEventListener('touchend',ikrmouseOutFont);
  
});

    //   addAllFunctionFrontEnd end 
  }

function datasd(data) {
  addAllFunctionFrontEnd(data)

}






  fetchAjaxRequest("rdata_fetch_data", function (response) {
    // displayDatabaseData(response);
    setTimeout(() => {
      datasd(response)
    }, 1000);
    setColorOnload(response)
    // ikrShowDataFromDB(response,ikrImapItems);
    // addAllFunctionFrontEnd(response,ikrImapItems);
  });






  // ikrSvgObj.addEventListener("load", (svgLoad) => {
   
  

   

  //   // ikrSvgObj load 
  // });
//   domcont load 
 });

 function fetchAjaxRequest(actions,   callback) {
  xhr = new XMLHttpRequest();
  xhr.open("POST", ikr_front_end.ajax_url, true);
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
        console.error(response);
      }
    }
  };

  xhr.send(`action=${actions}`); // Send the AJAX request to fetch data
 }
 function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  return regex.test(navigator.userAgent);
}