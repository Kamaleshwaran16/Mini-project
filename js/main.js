function inspectData() {
  document.getElementById("preview").innerText =
    "Columns: Age, Salary, Experience | Rows: 150";
}

function autoClean() {
  document.getElementById("preview").innerText =
    "Missing values removed. Data cleaned successfully.";
}

function startAnalysis() {
  window.location.href = "dashboard.html";
}
