import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2

import tensorflow as tf
from keras_preprocessing.sequence import pad_sequences

SPELL_CLASSES = ["Glacius_V", "Ignis_A", "Protego_O", "Fulmen_Triangle", "Silencio_Line_Horizontal",
                 "Umbra_Bowl", "Ascensio_Line_Vertical", "Tenebrae_C", "Tempestas_7", "Lux_L"]

SEQUENCE_LENGTH = 60
model = tf.keras.models.load_model("../Models/best_model.h5")

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

    # TODO: Wydobyć punkty z klatek → przygotować sekwencję (wektor ruchu)
    # np. `points = extract_points_from_video(image)`
    # TODO: Obliczyć pochodne (TranslationDerivative, itd.)
    # TODO: Przekształcić do tablicy `spell_vector`

    # Placeholder:
    spell_vector = [[0.1] * SEQUENCE_LENGTH]  # symulowany wektor do testu

    # Padujemy dane
    padded = pad_sequences(spell_vector, maxlen=SEQUENCE_LENGTH, dtype='float32', padding='post', truncating='post')
    prediction = model.predict(padded)
    predicted_class = SPELL_CLASSES[int(np.argmax(prediction))]

    return jsonify({"zaklecie": predicted_class})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
