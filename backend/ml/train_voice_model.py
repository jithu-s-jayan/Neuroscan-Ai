import os
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def create_synthetic_dataset(num_samples=1000):
    """
    Generates a synthetic dataset mimicking 16 librosa audio features.
    Features: 13 MFCCs, Spectral Centroid, Spectral Bandwidth, Zero Crossing Rate
    """
    np.random.seed(42)
    X = []
    y = []
    
    for _ in range(num_samples):
        # 0 = Healthy, 1 = Parkinson's
        label = np.random.choice([0, 1])
        
        if label == 1:
            # Simulated PD features: slightly distorted MFCCs, higher zero crossing, lower bandwidth
            mfcc = np.random.normal(loc=1.2, scale=0.5, size=13)
            centroid = np.random.normal(loc=2500, scale=300)
            bandwidth = np.random.normal(loc=1800, scale=200)
            zcr = np.random.normal(loc=0.15, scale=0.05)
        else:
            # Simulated Healthy features
            mfcc = np.random.normal(loc=0.0, scale=0.3, size=13)
            centroid = np.random.normal(loc=1500, scale=200)
            bandwidth = np.random.normal(loc=2200, scale=150)
            zcr = np.random.normal(loc=0.08, scale=0.02)
            
        features = np.concatenate([mfcc, [centroid, bandwidth, zcr]])
        X.append(features)
        y.append(label)
        
    return np.array(X), np.array(y)

def train_and_save():
    print("Generating synthetic Voice Analysis dataset...")
    X, y = create_synthetic_dataset(1500)
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training RandomForestClassifier...")
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    acc = accuracy_score(y_test, model.predict(X_test))
    print(f"Model Validation Accuracy: {acc * 100:.2f}%")
    
    # Save the model
    models_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(models_dir, 'voice_rf.pkl')
    joblib.dump(model, model_path)
    print(f"Model successfully saved to {model_path}")

if __name__ == '__main__':
    train_and_save()
