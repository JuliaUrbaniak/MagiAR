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

threshold = {
    "r_low": 234.0, "r_high": 245.0,
    "g_low": 89.0, "g_high": 106.0,
    "b_low": 120.0, "b_high": 133.0
}


def decode_image(base64_string):
    """Dekoduje obraz z base64 do formatu OpenCV (numpy array)."""
    header, encoded = base64_string.split(",", 1)
    img_data = base64.b64decode(encoded)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)


@app.route('/kalibracja', methods=['POST'])
def kalibracja():
    image = decode_image(request.json['image'])

    height, width = image.shape[:2]
    center = (width // 2, height // 2)
    outer_radius = 50
    border_width = 4
    inner_radius = outer_radius - border_width

    mask = np.zeros((height, width), dtype=np.uint8)
    cv2.circle(mask, center, outer_radius, 255, -1)
    cv2.circle(mask, center, inner_radius, 0, -1)

    image_f = image.astype(np.float32)

    pixels = image_f[mask == 255]

    mean = np.mean(pixels, axis=0)
    stddev = np.std(pixels, axis=0)

    mean_rgb = mean[::-1]
    stddev_rgb = stddev[::-1]

    threshold["r_low"] = float(mean_rgb[0] - (stddev_rgb[0] / 2))
    threshold["r_high"] = float(mean_rgb[0] + (stddev_rgb[0] / 2))
    threshold["g_low"] = float(mean_rgb[1] - (stddev_rgb[1] / 2))
    threshold["g_high"] = float(mean_rgb[1] + (stddev_rgb[1] / 2))
    threshold["b_low"] = float(mean_rgb[2] - (stddev_rgb[2] / 2))
    threshold["b_high"] = float(mean_rgb[2] + (stddev_rgb[2] / 2))


    return jsonify({"threshold": threshold})


def extract_points_from_frames(frames):
    result_frames = []
    for frame in frames:
        r_image = np.where(((frame[:, :, 2] <= threshold["r_high"]) & (frame[:, :, 2] >= threshold["r_low"])),
                           frame[:, :, 2], 0)
        g_image = np.where(((frame[:, :, 1] <= threshold["g_low"]) & (frame[:, :, 1] >= threshold["g_high"])),
                           frame[:, :, 1], 0)
        b_image = np.where(((frame[:, :, 0] <= threshold["b_high"]) & (frame[:, :, 0] >= threshold["b_high"])),
                           frame[:, :, 0], 0)
        combined = (r_image & b_image & g_image)
        combined = (combined > 0).astype(np.uint8) * 255

        labeled_image = label(combined)
        regions = regionprops(labeled_image)

        if regions:
            largest_region = max(regions, key=lambda r: r.area)
            result_frames.append(largest_region.centroid)

    return result_frames


@app.route('/zaklecie', methods=['POST'])
def zaklecie():
    print("Otrzymano polecenie zaklecia")
    data = request.json
    frame_strings = data.get("frames", [])

    print("Otrzymano polecenie zaklecia")
    if not frame_strings:
        print("Brak klatek")
        return jsonify({"error": "Brak klatek"}), 400

    print(f"📥 Otrzymano {len(frame_strings)} klatek")

    # Dekodujemy wszystkie klatki
    frames = [decode_image(b64) for b64 in frame_strings]

    points = extract_points_from_frames(frames)

    if len(points) < 10:
        print("Za mało punktów")
        return jsonify({"error": "Za mało punktów"}), 400

    vectors = []
    for i in range(1, len(points)):
        x1, y1 = points[i - 1]
        x2, y2 = points[i]
        diff = [x2 - x1, y2 - y1]
        print(diff)
        vectors.append(diff)

    padded = pad_sequences([vectors], maxlen=SEQUENCE_LENGTH, dtype='float32', padding='post', truncating='post')

    prediction = model.predict(padded)
    predicted_class = SPELL_CLASSES[int(np.argmax(prediction))]

    del frames
    del frame_strings

    return jsonify({"zaklecie": predicted_class})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
