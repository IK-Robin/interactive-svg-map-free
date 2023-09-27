document.addEventListener('DOMContentLoaded', () => {
    const addValueButton = document.getElementById('addValueButton');

    const baseURL = 'admin.php?page=interactive-geo-data-add';

    addValueButton.addEventListener('click', () => {
        const modifiedURL = `${baseURL}&value=us`;

        window.location.href = modifiedURL;
    });
    

    const ikr_shortcode_nav_container = document.getElementById('ikr_shortcode_nav_container');

let uniqueCountries  = []; 
 
// make this function for show the shortcode 

let mapIndex=1;
    fetchAjaxRequest("rdata_fetch_data", (data) => {
        data.forEach((item,ind) => {
            country.forEach(countryid => {
                if (countryid.countryId == item.country) {
                    if (!uniqueCountries.includes(item.post_titles)) {
                        uniqueCountries.push(item.post_titles);
                        console.log(uniqueCountries)
                        let html = document.createElement("div");
                        html.setAttribute('class', 'ikr_shortcode_Row');
                        html.innerHTML = `
                           <div class="ikr_shortcode_nav_item ikr_shortcode_navs">${mapIndex++}</div>
                            <div class="ikr_shortcode_nav_item ikr_shortcode_navs">${item.post_titles} </div>
                            <div class="ikr_shortcode_nav_item ikr_shortcode_navs"> [ikr_interactive_map id=${item.new_map_id}]</div>
                            <div class="ikr_shortcode_nav_item ikr_shortcode_navs" ><button data-mapUniId ="${item.new_map_id}"  data-id="${countryid.countryId}"  data-ptitle="${item.post_titles}" class="allMapEdit"> edit</button> </div>

                            <div class="ikr_shortcode_delet ikr_shortcode_navs" > <form  class="allMapDelets" action="">

                            <input type="hidden" value="${item.new_map_id}" name="allMapIdDelete" data-mapUniId ="${item.new_map_id}"  >
                            <input type="submit" value="delete" data-mapUniId ="${item.new_map_id}"  " >
                        </form></div>
                        `;
                        ikr_shortcode_nav_container.appendChild(html);
                    }
                }
            });
        });

        // edit the the map using thire map title 
        const allMapEdit  = document.querySelectorAll('.allMapEdit');
         allMapEdit.forEach(MapEditItem =>{
            MapEditItem.addEventListener('click',(ev) =>{
                let getDataId = ev.target.dataset.id;
                let getPostTitle = ev.target.dataset.ptitle;
                let mapAllMpaId = ev.target.dataset.mapuniid;
          
                const modifiedURL = `${baseURL}&value=${getDataId}&title=${getPostTitle}&edit=true&id=${mapAllMpaId}`;
                
          
                window.location.href = modifiedURL;
            });
         });

         const allMapDelete = document.querySelectorAll('.allMapDelets');
         allMapDelete.forEach(allDelet =>{
            allDelet.addEventListener('submit',(ev) =>{
            ev.preventDefault();
          
                makeAjaxRequestGlobal(allDelet,your_ajax_object.ikrDelet)
                window.location.reload();
            });
         });
       
    });




    
    // compaire the map for test purpos to check the map id country id if there any uniq  id  
    

    // fetchAjaxRequest("rdata_fetch_data", (data) => {
    //     let newPostTitle = [];
    //     console.log(data)
    //     data.map(item =>{
    //         // check the map item  and title and store the map title in a seperate array 
    //         country.map(coutryId =>{

    //             if (coutryId.countryId ==item.country){
    //                 if(!newPostTitle.includes(item.country))
    //                 // 
    //                 newPostTitle.push(item.country)
    //                 console.log(newPostTitle)
    //             }
    //         })
    //     });

    // })
 

});
