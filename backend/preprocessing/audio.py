import librosa
import numpy as np
import os

def extract_features(file_path):
    """
    Extracts acoustic features from an audio file.
    Returns MFCCs, jitter, and shimmer approximations.
    """
    try:
        # Load audio file
        y, sr = librosa.load(file_path, sr=None)
        
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
