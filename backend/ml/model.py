from sklearn.ensemble import RandomForestClassifier
import numpy as np
import os
import joblib

class NeuroScanModels:
    def __init__(self):
        self.models_dir = os.path.dirname(os.path.abspath(__file__))
        self.voice_model = None
        self.handwriting_cnn = None
        self.gait_lstm = None
        self.multimodal_hybrid = None
        self.load_models()
        
    def load_models(self):
        """
        Loads pre-trained models from the models/ directory.
        """
        try:
            model_path = os.path.join(self.models_dir, 'voice_rf.pkl')
            if os.path.exists(model_path):
                self.voice_model = joblib.load(model_path)
                print("Voice ML Model loaded successfully")
            else:
                print("No trained voice model found. Using mock fallback.")
        except Exception as e:
            print(f"Error loading models: {e}")
        
    def predict_voice(self, features):
        """
        Predicts Parkinson's risk from voice features.
        """
        if self.voice_model is not None and features is not None:
            # Model expects 2D array
            features_2d = features.reshape(1, -1)
            # Get probabilities [prob_healthy, prob_parkinsons]
            probs = self.voice_model.predict_proba(features_2d)[0]
            probability_pct = int(probs[1] * 100)
            
            status = "High Risk Detected" if probability_pct > 75 else "Moderate Risk Detected" if probability_pct > 40 else "Normal/Low Risk"
            
            return {
                "probability": probability_pct,
                "status": status,
                "confidence": int(max(probs) * 100)
            }
        
        # Fallback Mock logic
        return {"probability": 78, "status": "High Risk Detected (Mock)", "confidence": 92}
        
    def predict_handwriting(self, features):
        """
        Predicts Parkinson's risk from handwriting features.
        """
        # Mock logic
        return {"probability": 85, "status": "Tremor Detected", "confidence": 89}

    def predict_gait(self, features):
        """
        Predicts Parkinson's risk from gait features.
        """
        # Mock logic
        return {"probability": 72, "status": "Moderate Risk Detected", "confidence": 85}

# Singleton instance
ai_models = NeuroScanModels()
