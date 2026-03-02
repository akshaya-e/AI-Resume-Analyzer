@echo off
echo Fixing Python Environment...

:: 1. Ensure Pip is installed
python -m ensurepip --default-pip
python -m pip install --upgrade pip

:: 2. Install Dependencies
echo Installing dependencies...
python -m pip install flask flask-cors spacy nltk pdfminer.six pyresparser

:: 3. Download Models
echo Downloading SpaCy model...
python -m spacy download en_core_web_sm

echo Downloading NLTK data...
python -c "import nltk; nltk.download('stopwords')"

:: 4. Run App
echo Starting Python Service...
python app.py
pause
