function inspectData() {
  document.getElementById("preview").innerHTML =
    "<p><b>Columns:</b> Age, Salary, Experience</p><p><b>Rows:</b> 150</p>";
}

function autoClean() {
  document.getElementById("preview").innerHTML =
    "<p>Missing values removed ✔</p><p>Data normalized ✔</p>";
}

function startAnalysis() {
  window.location.href = "dashboard.html";
}
