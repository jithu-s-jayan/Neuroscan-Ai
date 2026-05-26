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
        
        # Extract MFCCs (13 coefficients)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfccs_mean = np.mean(mfccs.T, axis=0)
        
        # Approximate Jitter and Shimmer (using zero crossing rate and energy variance as simple proxies for now)
        # In a full implementation, you would use parselmouth (Praat) for exact acoustic metrics
        zcr = np.mean(librosa.feature.zero_crossing_rate(y))
        rms = np.mean(librosa.feature.rms(y=y))
        
        return {
            "mfcc_mean": mfccs_mean.tolist(),
            "zcr": float(zcr),
            "rms": float(rms)
        }
    except Exception as e:
        print(f"Error processing audio: {e}")
        return None
