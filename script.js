inputNumber.addEventListener("input",()=>{
    if(!isNaN(inputNumber.value)){
        Search.disabled=false;
    }
    if(inputNumber.value==""){
        Search.disabled=true;
    }
})
let data=[];
Search.addEventListener("click",(event)=>{
    event.preventDefault();
    showImages.innerHTML="";
    
    showImages.insertAdjacentHTML("afterbegin",`<img id="load" src="./spinner_360.gif">`);
    fetch(`https://api.nasa.gov/planetary/apod?api_key=k8DX1zVulAEaTeHaTaILiaCIUekrg3eoj9JAkx9Y&count=${inputNumber.value}&thumbs=true`)
    .then(response=>response.json()).then(result=> {data=result
    load.remove();  
    for(image of data){
    if(image.media_type=="image"){
    showImages.insertAdjacentHTML("beforeend",`<div class="image">
    <h2>${image.media_type}</h2><img src="${image.url}" class="images">
    <h4>${image.title} <br>${image.date}</h4>
    </div>`)
    }
    else{
        showImages.insertAdjacentHTML("beforeend",`<div class="image">
        <h2>${image.media_type}</h2><img src="${image.thumbnail_url}" class="images" >
        <h4>${image.title} <br>${image.date}</h4>
        </div>`) 
    }
    }})
})
showImages.onclick=function(event){
    details.innerHTML="";
       let click=data.filter((deta)=>{
        if(event.target.parentNode.children[1].src==deta.url||event.target.parentNode.children[1].src==deta.thumbnail_url)
        {return deta}})
       let copyrights=`copyright ${click[0].copyright}`;
        if(copyrights.includes("undefined")){copyrights="";}
       if(click[0].media_type=="image"){
       details.insertAdjacentHTML("beforeend",`<div><button id="closex">X</button>
        <h2>${click[0].title}(${click[0].media_type})</h2>
        <p>${click[0].explanation}</p>
       <img src="${click[0].url}"><h6>${copyrights}</h6></div>`)}
       
        else{ details.insertAdjacentHTML("beforeend",`<div><button id="closex">X</button>
       <h2>${click[0].title}(${click[0].media_type})</h2>
       <p>${click[0].explanation}<br><a href="${click[0].url}" target="_blank">see video</a></p>
      <img src="${click[0].thumbnail_url}"><h6>${copyrights}</h6></div>`)}


   document.getElementById("closex").onclick=function(){
       details.innerHTML="";  }
}
