import cv2
import numpy as np

def extract_spiral_features(image_path):
    """
    Extracts features from a spiral drawing image for tremor detection.
    """
    try:
        # Load image in grayscale
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        
        # Thresholding
        _, thresh = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Calculate tremor features based on contour irregularity
        # This is a simplified proxy for standard spiral features
        perimeter = 0
        area = 0
        for cnt in contours:
            perimeter += cv2.arcLength(cnt, True)
            area += cv2.contourArea(cnt)
            
        irregularity = perimeter / (area + 1e-5)
        
        return {
            "irregularity": float(irregularity),
            "contours_count": len(contours)
        }
    except Exception as e:
        print(f"Error processing image: {e}")
        return None
