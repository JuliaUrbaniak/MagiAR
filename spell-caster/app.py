import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2

import tensorflow as tf
from keras_preprocessing.sequence import pad_sequences
from skimage.measure import label, regionprops

SPELL_CLASSES = ["Glacius_V", "Ignis_A", "Protego_O", "Fulmen_Triangle", "Silencio_Line_Horizontal",
                 "Umbra_Bowl", "Ascensio_Line_Vertical", "Tenebrae_C", "Tempestas_7", "Lux_L"]

SEQUENCE_LENGTH = 60
model = tf.keras.models.load_model("Models/best_model.h5")

app = Flask(__name__)
CORS(app)


def decode_image(base64_string):
    """Dekoduje obraz z base64 do formatu OpenCV (numpy array)."""
    header, encoded = base64_string.split(",", 1)
    img_data = base64.b64decode(encoded)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)


@app.route('/kalibracja', methods=['POST'])
def kalibracja():
    image = decode_image(request.json['image'])
    # Tutaj można wykryć kolor lasera i wyliczyć próg HSV
    print("Klatka do kalibracji otrzymana.")
    return jsonify({"threshold": 127})  # Przykładowy próg


def extract_points_from_frames(frames):
    result_frames = []
    for frame in frames:
        r_image = np.where(((frame[:, :, 2] <= 245.25) & (frame[:, :, 2] >= 234.2)), frame[:, :, 2], 0)
        g_image = np.where(((frame[:, :, 1] <= 106.01) & (frame[:, :, 1] >= 89.75)), frame[:, :, 1], 0)
        b_image = np.where(((frame[:, :, 0] <= 133.82) & (frame[:, :, 0] >= 120.3)), frame[:, :, 0], 0)
        combined = (r_image & b_image & g_image)
        combined = (combined > 0).astype(np.uint8) * 255

        labeled_image = label(combined)
        regions = regionprops(labeled_image)

        if regions:
            largest_region = max(regions, key=lambda r: r.area)
            result_frames.append(largest_region.centroid)
            print(largest_region.bbox)

    return result_frames

@app.route('/zaklecie', methods=['POST'])
def zaklecie():
    data = request.json
    frame_strings = data.get("frames", [])

    if not frame_strings:
        return jsonify({"error": "Brak klatek"}), 400

    print(f"📥 Otrzymano {len(frame_strings)} klatek")

    # Dekodujemy wszystkie klatki
    frames = [decode_image(b64) for b64 in frame_strings]

    points = extract_points_from_frames(frames)

    if len(points) < 10:
        return jsonify({"error": "Za mało punktów"}), 400

    vectors = []
    for i in range(1, len(points)):
        x1, y1 = points[i - 1]
        x2, y2 = points[i]
        vectors.append([x2 - x1, y2 - y1])


    padded = pad_sequences([vectors], maxlen=SEQUENCE_LENGTH, dtype='float32', padding='post', truncating='post')

    prediction = model.predict(padded)
    predicted_class = SPELL_CLASSES[int(np.argmax(prediction))]

    return jsonify({"zaklecie": predicted_class})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
