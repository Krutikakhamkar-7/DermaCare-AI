from flask import Flask, render_template, request, redirect, url_for
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
DATABASE = "dermacare.db"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS prediction_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_path TEXT NOT NULL,
            disease TEXT NOT NULL,
            confidence INTEGER NOT NULL,
            risk TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    db.commit()


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return redirect(url_for('home'))

    file = request.files['image']

    if file.filename == '':
        return redirect(url_for('home'))

    filename = file.filename
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)

    # Temporary fake prediction until your ML model is connected
    prediction = "Melanoma"
    confidence = 92
    risk = "High"

    db = get_db()
    db.execute("""
        INSERT INTO prediction_history
        (image_path, disease, confidence, risk, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (
        save_path,
        prediction,
        confidence,
        risk,
        datetime.now().strftime("%d %b %Y, %I:%M %p")
    ))
    db.commit()

    return render_template(
        'result.html',
        prediction=prediction,
        confidence=confidence,
        risk=risk,
        image_path='/' + save_path.replace("\\", "/")
    )


@app.route('/history')
def history():
    db = get_db()
    rows = db.execute("""
        SELECT *
        FROM prediction_history
        ORDER BY id DESC
    """).fetchall()

    return render_template('history.html', history_items=rows)


@app.route('/clear-history', methods=['POST'])
def clear_history():
    db = get_db()
    db.execute("DELETE FROM prediction_history")
    db.commit()
    return redirect(url_for('history'))

if __name__ == "__main__":
    import os
    init_db()
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)