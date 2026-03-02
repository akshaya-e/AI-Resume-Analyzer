# Python Service Setup Script

Write-Host "Installing dependencies..."
pip install -r requirements.txt

Write-Host "Downloading spaCy model..."
python -m spacy download en_core_web_sm

Write-Host "Applying pyresparser fix..."
$site_packages = python -c "import site; print(site.getsitepackages()[1])" # usually [1] is user site or global
if (-not (Test-Path $site_packages)) {
    $site_packages = python -c "import site; print(site.getsitepackages()[0])"
}
$target = Join-Path $site_packages "pyresparser/resume_parser.py"

Write-Host "Copying fix to: $target"
Copy-Item "resume_parser_fix.py" -Destination $target -Force

Write-Host "Setup complete!"
Write-Host "Starting Python Service..."
python app.py
