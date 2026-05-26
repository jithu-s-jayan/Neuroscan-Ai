from fastapi import APIRouter, File, UploadFile
import random
import time

router = APIRouter()

@router.post("/voice")
async def predict_voice(file: UploadFile = File(...)):
    # In a real scenario, we would save the file and pass it to librosa and the ML model.
    # For now, we simulate processing time and return a mock prediction.
    time.sleep(2) # Simulate processing
    
    # Mock result
    probability = random.randint(65, 95)
    status = "High Risk Detected" if probability > 75 else "Moderate Risk Detected"
    
    return {
        "status": "success",
        "data": {
            "probability": probability,
            "status": status,
            "confidence": random.randint(85, 98),
            "features": {
                "jitter": f"+{random.randint(5, 15)}% above baseline",
                "shimmer": f"+{random.randint(4, 10)}% above baseline",
                "mfcc": "Irregular pattern detected"
            }
        }
    }

@router.post("/handwriting")
async def predict_handwriting(file: UploadFile = File(...)):
    time.sleep(2)
    probability = random.randint(50, 90)
    status = "Tremor Detected" if probability > 70 else "Normal"
    return {
        "status": "success",
        "data": {
            "probability": probability,
            "status": status,
            "confidence": random.randint(80, 95)
        }
    }

@router.post("/gait")
async def predict_gait(file: UploadFile = File(...)):
    time.sleep(3) # Video processing takes longer
    probability = random.randint(55, 95)
    status = "High Risk Detected" if probability > 75 else "Moderate Risk Detected"
    return {
        "status": "success",
        "data": {
            "probability": probability,
            "status": status,
            "confidence": random.randint(82, 97),
            "features": {
                "stepLength": "Reduced by 15%",
                "armSwing": "Asymmetrical (Left arm rigid)",
                "balance": "Poor (Frequent postural adjustments)"
            }
        }
    }
