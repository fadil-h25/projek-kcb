
import os
import cv2
import numpy as np
import base64
import face_recognition

# Variabel global untuk menyimpan wajah yang sudah dikenal
known_face_encodings = []
known_face_names = []

def load_known_faces():
    global known_face_encodings, known_face_names  # Menggunakan variabel global

    images = os.listdir('dataset')
    print("Isi dataset : ", images)
    
    for img in images:
        imgName = os.path.splitext(img)[0]
        splitImgName = imgName.split()
        # print("ini nama full : " , splitImgName)
        
        nama = splitImgName[0]
        nim = splitImgName[1]
       
        # print("ini nama : " + nama)
        # print("ini nim : " + nim)
        img_path = os.path.join('dataset', img)
        image = cv2.imread(img_path)

        if image is None:
            print(f"Could not load image {img_path}")
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
