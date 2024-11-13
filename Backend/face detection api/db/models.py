# db/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Inisialisasi SQLAlchemy di sini

class Attendance(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    image = db.Column(db.Text, nullable=True)  # Jika Anda ingin menyimpan gambar
