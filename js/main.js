let selectedFile = null;


// Detect CSV file
document.getElementById("csvFile").addEventListener("change", function(e){

selectedFile = e.target.files[0]

document.getElementById("preview").innerHTML =
"File Selected: <b>"+selectedFile.name+"</b>"

})



// Upload / Inspect
function inspectData(){

let formData = new FormData()

formData.append("file",selectedFile)

fetch("http://127.0.0.1:5000/upload",{

method:"POST",
body:formData

})

.then(res=>res.json())

.then(data=>{

document.getElementById("preview").innerHTML =

`Rows: ${data.rows}<br>
Columns: ${data.columns}<br>
Missing: ${data.missing_values}`

})

}



// Clean
function autoClean(){

fetch("http://127.0.0.1:5000/clean",{

method:"POST"

})

.then(res=>res.json())

.then(data=>{

document.getElementById("preview").innerHTML =
data.message

})

}



// Chart
function startAnalysis(){

fetch("http://127.0.0.1:5000/report")

.then(res=>res.json())

.then(data=>{

document.getElementById("preview").innerHTML =
`<canvas id="chart"></canvas>`

let labels = Object.keys(data.averages)

let values = Object.values(data.averages)

new Chart(document.getElementById("chart"),{

type:"bar",

data:{
labels:labels,
datasets:[{
label:"Average Values",
data:values
}]
}

})

})

}



// AI Report
function generateReport(){

fetch("http://127.0.0.1:5000/report")

.then(res=>res.json())

.then(data=>{

let insights=""

data.insights.forEach(i=>{

insights += "<li>"+i+"</li>"

})

document.getElementById("preview").innerHTML =
`
<h3>AI Insights</h3>
<ul>${insights}</ul>
`

})

}



// Download report
function downloadReport(){

fetch("http://127.0.0.1:5000/report")

.then(res=>res.json())

.then(data=>{

let blob = new Blob([JSON.stringify(data,null,2)],{type:"application/json"})

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="report.json"

a.click()

})

}