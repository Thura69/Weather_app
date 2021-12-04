const arrow = document.querySelector(".Weather-part i");
 app = document.querySelector(".app");
 user = app.querySelector(".user");
 input = user.querySelector("input");
 info = user.querySelector(".info");
 img = app.querySelector("img");
 button = user.querySelector("button");

 let api;

input.addEventListener('keyup', (e)=>{
   if(e.key == "Enter" && input.value!=""){
       request_Api(input.value);
   }
});

button.addEventListener('click',()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess,onError)
  }else{
    alert("Your Browser is not support Geolocation!!!!!");
  }
})

function onSuccess(location){
  const {latitude,longitude} = location.coords;
  console.log(latitude);
  console.log(longitude);

  api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${'0f603ab633ef202d2355a435d058dbc4'}`;

  dataFetch();
}

function  onError() {
  console.log("This is no Error");
}
function request_Api(city){
   api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${'0f603ab633ef202d2355a435d058dbc4'}`;

  dataFetch();
}

function dataFetch(){
    info.classList.add("pending");
    info.innerText ="Loading...";
   
    fetch(api).then(res=>res.json()).then(result=>weather_deatils(result));
}

function weather_deatils(result){
    if(result.cod == '404'){
        info.classList.replace("pending","error");
        info.innerText =`Idiot,it is not even a name of city`;
    }else{
        app.classList.add("active");
        console.log(result);
        info.innerText = "";
        info.classList.remove("pending");
        info.classList.remove("error");
        input.value="";
        const {feels_like,humidity,temp} = result.main;
        const country = result.sys.country;
        const city    = result.name;
        const {description,id} = result.weather[0];
         
        if(id==800){
            img.src=`Weather Icons/clear.svg`;
         };
         if(id>801 && id<804){
           img.src=`Weather Icons/cloud.svg`;
         };
        if(id>600 && id<622){
          img.src=`Weather Icons/snow.svg`;
        };
        if(id>500 && id<531){
          img.src=`Weather Icons/rain.svg`;
        };
        if(id>200 && id<232){
          img.src=`Weather Icons/storm.svg`;
        }


        app.querySelector(".situation").innerText = description;
        app.querySelector(".tem  .num-1").innerText = Math.round(temp);
        app.querySelector(".location span").innerText = `${city} , ${country}`;
        app.querySelector(".feels .num-2").innerText =Math.round(feels_like);
        app.querySelector(".humidity .num-3").innerText = humidity;
    };};

    arrow.addEventListener("click",()=>{

        app.classList.remove("active");
    })