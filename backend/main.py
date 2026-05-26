from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import predict

app = FastAPI(title="NeuroScan AI Backend")

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict.router, prefix="/api/predict", tags=["Prediction"])

@app.get("/")
def read_root():
    return {"status": "ok", "message": "NeuroScan AI Backend is running."}

# We will add other routes here later
