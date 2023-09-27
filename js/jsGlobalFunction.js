// fetch data from mysql server 
// get the url from browser and get teh value that pass by url 
let urlParams = new URLSearchParams(window.location.search);
let urlvalue = urlParams.get("value");
let urlTitle = urlParams.get("title");
let urlEdit = urlParams.get("edit");
let ulrMapId = urlParams.get("id");


const country =[
  {
      countryId:'worldmap',
      countryImg:'assets/worldmap.svg'
  },
  {
      countryId:'us',
      countryImg:'assets/us.svg'
  },
];



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

 function getcountryId (item) {
    // getd(item);
  }

  function makeAjaxRequestGlobal (fromdata,action,editorId){
  
  
    var formData = new FormData(fromdata);
    // formData.append(editorId, editorContent);
    formData.append("action",action);
  
      var xhr = new XMLHttpRequest();
      xhr.open("POST", ajaxurl, true);
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          console.log(xhr.responseText)
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