# NeuroScan AI

A state-of-the-art Parkinson's Disease Prediction System utilizing Voice, Gait, and Handwriting Analysis.

## Installation & Setup

### 1. Backend (FastAPI + Machine Learning)
Open a terminal and run:
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will run on `http://localhost:8000`.

### 2. Frontend (React + Vite)
Open a new terminal and run:
```powershell
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

## Features Implemented
- Premium UI with Framer Motion, Tailwind CSS, and Lucide React Icons.
- Landing Page, Auth Pages, and User Dashboard.
- Voice Analysis file upload connected to the FastAPI backend.
- Glassmorphism & medical futuristic AI aesthetic.
