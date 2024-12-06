import cv2
import face_recognition
import pandas as pd
from datetime import datetime
import os
import numpy as np

# Fungsi untuk mengambil dan menyimpan gambar baru
def capture_and_save_image(name):
    video_capture = cv2.VideoCapture(0)
    if not video_capture.isOpened():
        print("Error: Could not open video device.")
        return

    while True:
        ret, frame = video_capture.read()
        if not ret:
            print("Error: Could not read frame.")
            break

        cv2.imshow('Capture Image - Press "s" to save', frame)

        if cv2.waitKey(1) & 0xFF == ord('s'):
            img_name = f'dataset/{name}.jpg'
            cv2.imwrite(img_name, frame)
            print(f"Image saved as {img_name}")
            break
        elif cv2.waitKey(1) & 0xFF == ord('q'):
            print("Capture cancelled.")
            break

    video_capture.release()
    cv2.destroyAllWindows()

# Load dataset wajah yang sudah ada
def load_known_faces():
    known_face_encodings = []
    known_face_names = []

    images = os.listdir('dataset')
    print("isi dataset : ", images)
    for img in images:
        name = os.path.splitext(img)[0]
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
                known_face_names.append(name)
            else:
                print(f"No face found in {img}")
        else:
            print(f"Image {img} is not in the correct format (must be RGB).")

    return known_face_encodings, known_face_names


# Fungsi untuk mencatat kehadiran dalam file Excel
def mark_attendance(name, marked_names):
    now = datetime.now()
    current_time = now.strftime('%Y-%m-%d %H:%M:%S')

    if name in marked_names:
        print(f"Attendance for {name} already marked.")
        return
    marked_names.add(name)

    if os.path.exists('Attendance.xlsx'):
        df = pd.read_excel('Attendance.xlsx')
    else:
        df = pd.DataFrame(columns=['Name', 'Time', 'status'])

    new_entry = pd.DataFrame({'Name': [name], 'Time': [current_time], 'status': ['Present']})
    df = pd.concat([df, new_entry], ignore_index=True)
    df.to_excel('Attendance.xlsx', index=False)
    print(f"Attendance marked for {name} at {current_time}")

# Fungsi utama untuk pengenalan wajah dan pencatatan kehadiran
def attendance_system():
    known_face_encodings, known_face_names = load_known_faces()
    video_capture = cv2.VideoCapture(0)

    if not video_capture.isOpened():
        print("Error: Could not open video device.")
        return

    # Baca file Excel dan simpan nama yang sudah tercatat ke dalam marked_names
    marked_names = set()
    if os.path.exists('Attendance.xlsx'):
        df = pd.read_excel('Attendance.xlsx')
        marked_names.update(df['Name'].unique())  # Masukkan semua nama yang sudah ada di Excel

    while True:
        ret, frame = video_capture.read()
        if not ret:
            print("Error: Could not read frame.")
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_frame)

        if face_locations:
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            for (face_encoding, face_location) in zip(face_encodings, face_locations):
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                best_distance = face_distances[best_match_index]

                # print(f"Face distances: {face_distances}")
                # print(f"Best distance: {best_distance} for {known_face_names[best_match_index]}")

                threshold = 0.4
                if best_distance < threshold:
                    name = known_face_names[best_match_index]
                else:
                    name = "Unknown"

                top, right, bottom, left = face_location
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(frame, name, (left + 6, bottom - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

                if name != "Unknown":
                    mark_attendance(name, marked_names)

        cv2.imshow('Attendance System', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    video_capture.release()
    cv2.destroyAllWindows()

# Fungsi untuk menambahkan wajah baru ke dataset
def add_new_face():
    name = input("Enter the name of the person: ")
    capture_and_save_image(name)
    print(f"{name}'s face has been added to the dataset.")

# Menu utama
def main_menu():
    print("1. Run Attendance System")
    print("2. Add New Face to Dataset")
    choice = input("Enter your choice (1/2): ")

    if choice == '1':
        attendance_system()
    elif choice == '2':
        add_new_face()
    else:
        print("Invalid choice. Please enter 1 or 2.")

# Panggil menu utama
main_menu()