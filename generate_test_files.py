import numpy as np
import cv2
import wave
import os

# Create Voice file
sample_rate = 22050
t = np.linspace(0, 3, int(sample_rate * 3), endpoint=False)
audio = 0.5 * np.sin(2 * np.pi * 200 * t) + 0.2 * np.sin(2 * np.pi * 400 * t)
audio_data = (audio * 32767).astype(np.int16)

wav_path = os.path.join(os.getcwd(), 'test_voice.wav')
with wave.open(wav_path, 'w') as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(sample_rate)
    f.writeframes(audio_data.tobytes())

# Create Handwriting file
img_path = os.path.join(os.getcwd(), 'test_handwriting.png')
img = np.ones((400, 400, 3), dtype=np.uint8) * 255
for i in range(300):
    theta = i / 10.0
    r = 1.0 * theta
    x = int(200 + r * np.cos(theta) * 10)
    y = int(200 + r * np.sin(theta) * 10)
    if 0 <= x < 400 and 0 <= y < 400:
        cv2.circle(img, (x, y), 2, (0, 0, 0), -1)
cv2.imwrite(img_path, img)

print("Test files created successfully!")
