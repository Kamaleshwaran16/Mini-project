function inspectData() {
  document.getElementById("preview").innerHTML = `
    <p><b>Dataset Inspection</b></p>
    <ul>
      <li>Columns: Age, Salary, Experience</li>
      <li>Total Rows: 150</li>
      <li>Missing Values: 12</li>
    </ul>
  `;
}

function autoClean() {
  document.getElementById("preview").innerHTML = `
    <p><b>Data Cleaning Completed ✅</b></p>
    <ul>
      <li>Missing values removed</li>
      <li>Outliers handled</li>
      <li>Data normalized</li>
    </ul>
  `;
}

function downloadCleaned() {
  alert("Cleaned CSV downloaded successfully (demo)");
}

function startAnalysis() {
  window.location.href = "dashboard.html";
}
