from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin  # Tambahkan cross_origin

from flask_sqlalchemy import SQLAlchemy
from db.models import db
from services.dosenService import attendance_system

app = Flask(__name__)

# Konfigurasi CORS
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/praktikumdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()  # Membuat semua tabel yang didefinisikan

@app.route("/", methods=['POST', 'GET'])
@cross_origin(origin='http://127.0.0.1:5500')
def hello():
    if request.method == "POST":
        response_data = {
            "msg": "ini dari method POST"
        }
        return jsonify(response_data),200
    response_data = {
        "msg":"ini dari method GET"
    }

    return jsonify(response_data),200
    
   

@app.route("/absensi", methods=['POST'])
def get():
    data = request.get_json()
    
    if not data:
        return jsonify({"status": "error", "message": "Tidak ada data yang diterima."}), 400

    image_data = data.get('image')
    if not image_data:
        return jsonify({"status": "error", "message": "Tidak ada gambar yang diterima."}), 400
    
    result = attendance_system(image_data) or "gagal"
    print(result)

   


    return jsonify({
        "msg": "Halo, data berhasil diambil dan disimpan.",
        "data":result
        
        
    })

if __name__ == "__main__":
    app.run(debug=True)
