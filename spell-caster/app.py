from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2

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

@app.route('/zaklecie', methods=['POST'])
def zaklecie():
    image = decode_image(request.json['image'])
    # Tutaj w przyszłości YOLO / analiza trajektorii
    print("Klatka do rozpoznania zaklęcia otrzymana.")
    return jsonify({"zaklecie": "Expelliarmus"})  # Przykładowa odpowiedź

if __name__ == '__main__':
    app.run(debug=True)
