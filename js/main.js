let selectedFile = null;

// Backend URL (Render)
const API_URL = "https://mini-project-35ij.onrender.com";


// Detect CSV file
document.getElementById("csvFile").addEventListener("change", function(e){

    selectedFile = e.target.files[0];

    if(!selectedFile){
        document.getElementById("preview").innerHTML = "No file selected";
        return;
    }

    document.getElementById("preview").innerHTML =
    "File Selected: <b>"+selectedFile.name+"</b>";

});



// Upload / Inspect
function inspectData(){

    if(!selectedFile){
        alert("Please select a CSV file first");
        return;
    }

    let formData = new FormData();
    formData.append("file",selectedFile);

    fetch(API_URL + "/upload",{
        method:"POST",
        body:formData
    })

    .then(res=>res.json())

    .then(data=>{

        document.getElementById("preview").innerHTML =

        `Rows: ${data.rows}<br>
        Columns: ${data.columns}<br>
        Missing: ${data.missing_values}`;

    })

    .catch(err=>{
        document.getElementById("preview").innerHTML = "Upload failed";
    });

}



// Clean
function autoClean(){

    fetch(API_URL + "/clean",{
        method:"POST"
    })

    .then(res=>res.json())

    .then(data=>{
        document.getElementById("preview").innerHTML = data.message;
    })

    .catch(()=>{
        document.getElementById("preview").innerHTML = "Cleaning failed";
    });

}



// Chart
function startAnalysis(){

    fetch(API_URL + "/report")

    .then(res=>res.json())

    .then(data=>{

        if(!data.averages){
            document.getElementById("preview").innerHTML = "No analysis data available";
            return;
        }

        document.getElementById("preview").innerHTML =
        `<canvas id="chart"></canvas>`;

        let labels = Object.keys(data.averages);
        let values = Object.values(data.averages);

        new Chart(document.getElementById("chart"),{

            type:"bar",

            data:{
                labels:labels,
                datasets:[{
                    label:"Average Values",
                    data:values
                }]
            }

        });

    })

    .catch(()=>{
        document.getElementById("preview").innerHTML = "Analysis failed";
    });

}



// AI Report
function generateReport(){

    fetch(API_URL + "/report")

    .then(res=>res.json())

    .then(data=>{

        let insights="";

        if(data.insights){
            data.insights.forEach(i=>{
                insights += "<li>"+i+"</li>";
            });
        }else{
            insights = "<li>No AI insights available</li>";
        }

        document.getElementById("preview").innerHTML =
        `
        <h3>AI Insights</h3>
        <ul>${insights}</ul>
        `;

    })

    .catch(()=>{
        document.getElementById("preview").innerHTML = "Report generation failed";
    });

}



// Download report
function downloadReport(){

    fetch(API_URL + "/report")

    .then(res=>res.json())

    .then(data=>{

        let blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"});

        let a=document.createElement("a");

        a.href=URL.createObjectURL(blob);

        a.download="analysis_report.json";

        a.click();

    })

    .catch(()=>{
        alert("Download failed");
    });

}