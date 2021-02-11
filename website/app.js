/* Global Variables */
const URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&APPID=cfdad6bdf9aa41090ff3a11130624928&units=metric";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);
function performAction(e) {
    const Zip = document.getElementById("zip").value;
    const feels = document.getElementById("feelings").value;
    getweb(URL, Zip, key)
    .then(function(data){
        const info ={
            temp: data.main.temp,
            date: newDate,
            cont: feels,
        }
      postData("/add", info)
      updateUI();
    })
};


/* Function to GET Web API Data*/
const getweb = async (URL, Zip, key) => {
    const res = await fetch(URL + Zip + key);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

/* Update user interface */
const updateUI = async () => {
    const req = await fetch("/all");
    console.log(req);
    try {
        let allData = await req.json();
        console.log(allData);
        let Date = document.getElementById("date");
        let Temp = document.getElementById("temp");
        let Feel = document.getElementById("content");
        Date.innerHTML = allData.date;
        Temp.innerHTML = allData.temp;
        Feel.innerHTML = allData.cont;
    } catch (error) {
        console.log("error", error);
    }
}