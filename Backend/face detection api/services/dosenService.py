
import os
import cloudinary.api
import cv2
import numpy as np
import base64
import face_recognition
import cloudinary
import requests

# Variabel global untuk menyimpan wajah yang sudah dikenal
known_face_encodings = []
known_face_names = []

def load_known_faces():
    global known_face_encodings, known_face_names  # Menggunakan variabel global
    cloudinary.config(
    cloud_name="dj25fwmvp",
    api_key="537579951436223",
    api_secret="dB9VZ369AFHc5fQ9nIGQffIouxk"
)
    cloudImages = cloudinary.api.resources_by_asset_folder("dataset_kcb")


    # images = os.listdir('dataset')

    
    for img in cloudImages['resources']:
        imgName = img['display_name']
        splitImgName = imgName.split(".")
        nim = splitImgName[0]
        print("ini nim yng akan di proses")

        response = requests.get(img["url"])
        img_array = np.frombuffer(response.content, np.uint8)

        # Menggunakan cv2.imdecode untuk membaca gambar dari array byte
        image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        

        if image is None:
            print(f"Could not load image {nim}")
            continue

        # Pastikan gambar dalam format RGB
        if image.ndim == 3 and image.shape[2] == 3:
            rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            encodings = face_recognition.face_encodings(rgb_image)

            if encodings:
                known_face_encodings.append(encodings[0])
                known_face_names.append(nim)
            else:
                print(f"No face found in {img}")
        else:
            print(f"Image {img} is not in the correct format (must be RGB).")

load_known_faces()  # Muat wajah yang dikenal saat aplikasi dijalankan

def mark_attendance(nim):
    # Logika untuk menandai kehadiran dapat ditambahkan di sini
    return f"{nim}"

def attendance_system(image_data):
    # Decode gambar dari base64
    image_data = image_data.split(',')[1]  # Mengambil data setelah header
    image_bytes = base64.b64decode(image_data)
    np_array = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)

    results = []  # Menyimpan hasil pencocokan
    res = ""
    if face_locations:
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for (face_encoding, face_location) in zip(face_encodings, face_locations):
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            best_distance = face_distances[best_match_index]

            threshold = 0.5
            if best_distance < threshold:
                nim = known_face_names[best_match_index]
                # results.append(mark_attendance(nim))  # Menandai kehadiran
                print(nim)
                res = nim
               
                
            else:
                res = ""

    return res # Mengembalikan hasil pencocokan
