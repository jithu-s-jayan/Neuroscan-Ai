import cv2
import mediapipe as mp
import numpy as np

def extract_gait_features(video_path):
    """
    Extracts kinematic features from a walking video using MediaPipe Pose.
    """
    try:
        mp_pose = mp.solutions.pose
        pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)
        
        cap = cv2.VideoCapture(video_path)
        
        frames_processed = 0
        left_knee_angles = []
        right_knee_angles = []
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
                
            # Convert to RGB for MediaPipe
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(image)
            
            if results.pose_landmarks:
                landmarks = results.pose_landmarks.landmark
                # Simplified example: track knee Y positions over time to measure step length
                left_knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE.value]
                right_knee = landmarks[mp_pose.PoseLandmark.RIGHT_KNEE.value]
                
                left_knee_angles.append(left_knee.y)
                right_knee_angles.append(right_knee.y)
                
            frames_processed += 1
            # Limit processing for the mock to avoid long delays
            if frames_processed > 30:
                break
                
        cap.release()
        
        # Calculate variance in knee movement as a proxy for step regularity
        left_var = np.var(left_knee_angles) if left_knee_angles else 0
        right_var = np.var(right_knee_angles) if right_knee_angles else 0
        
        return {
            "step_regularity": float(left_var + right_var),
            "asymmetry": float(abs(left_var - right_var))
        }
    except Exception as e:
        print(f"Error processing video: {e}")
        return None
