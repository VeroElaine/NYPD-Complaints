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

$controls.on("click", "button", handleGetData);
$complaintListEl.on("click", "button", handleToggleVisibility)

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
        render();
    }, function(error) {
        console.log(error)
    }); 
}

function handleToggleVisibility() {
    $(this).parent().siblings("p").toggleClass("hidden");
}

function generateUI() {
    return complaints.map(function(complaint) {
        return `
        <section class="complaint">
            <div>
                <h5>🚨 ${complaint.descriptor}</h5>
                <button class="btn btn-small red">What Did The Police Do? </button>
            </div>
            <p class="hidden">${complaint.resolution_description}</p> 
        </section>
        `;
    })
}

function render () {
    const html = generateUI().join("");
    $complaintListEl.html(html) 
}
