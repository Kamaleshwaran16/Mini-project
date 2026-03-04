from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

data = None


# =========================
# Home Route
# =========================
@app.route("/")
def home():
    return "ANALYDWO Backend Running"


# =========================
# Upload CSV
# =========================
@app.route("/upload", methods=["POST"])
def upload_file():
    global data

    file = request.files["file"]
    data = pd.read_csv(file)

    rows = data.shape[0]
    columns = data.shape[1]
    missing = int(data.isnull().sum().sum())

    return jsonify({
        "rows": rows,
        "columns": columns,
        "missing_values": missing
    })


# =========================
# Clean Data
# =========================
@app.route("/clean", methods=["POST"])
def clean_data():
    global data

    if data is None:
        return jsonify({"message": "No dataset uploaded"})

    data.drop_duplicates(inplace=True)
    data.dropna(inplace=True)

    return jsonify({
        "message": "Data cleaned successfully",
        "rows_after_clean": data.shape[0]
    })


# =========================
# Analyze Dataset
# =========================
@app.route("/analyze", methods=["GET"])
def analyze():
    global data

    if data is None:
        return jsonify({"error": "No dataset uploaded"})

    summary = data.describe().to_dict()

    rows = data.shape[0]
    columns = data.shape[1]

    avg_values = {}
    for col in data.select_dtypes(include="number").columns:
        avg_values[col] = round(data[col].mean(), 2)

    return jsonify({
        "rows": rows,
        "columns": columns,
        "summary": summary,
        "averages": avg_values
    })


# =========================
# Generate Report
# =========================
@app.route("/report", methods=["GET"])
def report():
    global data

    if data is None:
        return jsonify({"error": "No dataset uploaded"})

    report_data = {
        "total_rows": len(data),
        "total_columns": len(data.columns),
        "columns": list(data.columns),
        "statistics": data.describe().to_dict()
    }

    return jsonify(report_data)


# =========================
# Chatbot /ask
# =========================
@app.route("/ask", methods=["POST"])
def ask():
    global data

    if data is None:
        return jsonify({"answer": "Please upload a dataset first."})

    question = request.json["question"].lower()

    try:

        if "average age" in question or "mean age" in question:
            return jsonify({"answer": str(round(data["Age"].mean(), 2))})

        elif "highest age" in question or "max age" in question:
            return jsonify({"answer": str(data["Age"].max())})

        elif "lowest age" in question or "min age" in question:
            return jsonify({"answer": str(data["Age"].min())})

        elif "average marks" in question or "mean marks" in question:
            return jsonify({"answer": str(round(data["Marks"].mean(), 2))})

        elif "highest marks" in question or "max marks" in question:
            return jsonify({"answer": str(data["Marks"].max())})

        elif "lowest marks" in question or "min marks" in question:
            return jsonify({"answer": str(data["Marks"].min())})

        elif "rows" in question or "records" in question:
            return jsonify({"answer": str(len(data))})

        elif "columns" in question:
            return jsonify({"answer": str(len(data.columns))})

        else:
            return jsonify({"answer": "Sorry, I don't understand the question yet."})

    except:
        return jsonify({"answer": "Dataset does not contain required columns."})


# =========================
# Run Server (Render Compatible)
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)