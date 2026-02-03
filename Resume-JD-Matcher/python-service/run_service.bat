@echo off
echo ==========================================
echo   Starting AI Resume Analyzer Service
echo ==========================================
echo.

REM 1. Install Dependencies
echo [1/3] Installing Python Dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies.
    echo Please make sure you have Python installed and permitted.
    pause
    exit /b 1
)

REM 2. Download SpaCy Model
echo.
echo [2/3] Downloading SpaCy English Model...
python -m spacy download en_core_web_sm
if %errorlevel% neq 0 (
    echo.
    echo Warning: Failed to download SpaCy model. AI analysis might be limited.
)

REM 3. Run the Service
echo.
echo [3/3] Starting Python Service...
echo.
python app.py

pause
