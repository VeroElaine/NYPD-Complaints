// Constants

const baseUrl = "https://data.cityofnewyork.us/resource/erm2-nwe9.json"

// State Variables

let limit, complaints, borough;

// Cached element references
const $yearEl = $("#year");
const $controls = $("#controls");
const $inputEl = $("input[type=number]");
const $complaintListEl = $("#complaint-list");

// Event Listeners

$controls.on("click", "button", handleGetData)

// Functions
init(); 

function init() {
    $yearEl.html(new Date().getFullYear());
    complaints = [];
}

function handleGetData(evt) {
    borough = evt.target.dataset.borough;
    limit = $inputEl.val() || "10";

    $.ajax({
        url: baseUrl + "?agency=NYPD&$limit=" + limit + "&borough=" + borough
    }).then(function(data){
        complaints = data;
        
    }, function(error) {
        console.log(error)
    }); 
}
