import librosa
import numpy as np
import os

def extract_features(file_path):
    """
    Extracts acoustic features from an audio file.
    Returns MFCCs, jitter, and shimmer approximations.
    """
    try:
        from scipy.io import wavfile
        
        # Load audio file using scipy to avoid libsndfile dependency on linux
        sr, y_int = wavfile.read(file_path)
        # Convert to float32 between -1 and 1 for librosa
        if y_int.dtype == np.int16:
            y = y_int.astype(np.float32) / 32768.0
        else:
            y = y_int.astype(np.float32)
            
        # Ensure mono
        if len(y.shape) > 1:
            y = np.mean(y, axis=1)
        
        # Extract 13 MFCCs
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfccs_mean = np.mean(mfccs.T, axis=0)
        
        # Extract Spectral Centroid, Bandwidth, and ZCR
        centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
        bandwidth = np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr))
        zcr = np.mean(librosa.feature.zero_crossing_rate(y))
        
        # Return exact 16 feature array
        features = np.concatenate([mfccs_mean, [centroid, bandwidth, zcr]])
        return features
    except Exception as e:
        print(f"Error processing audio: {e}")
        return None
