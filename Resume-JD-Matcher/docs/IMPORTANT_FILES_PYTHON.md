# Important Files from Old Python Project

These files were preserved from the Old_Python_Project before it was removed:

## 1. resume_parser_fix.py

**Original Location:** `Old_Python_Project/pyresparser/resume_parser.py`

**Purpose:** This is a fixed version of the pyresparser library's resume_parser.py file.

**How to Use:**
After installing pyresparser, you need to replace the default resume_parser.py with this fixed version:

```bash
# Find your Python site-packages location
python -c "import site; print(site.getsitepackages())"

# Copy this file to replace the default one
# Example for Windows:
copy resume_parser_fix.py C:\Users\irfan\AppData\Local\Programs\Python\Python39\Lib\site-packages\pyresparser\resume_parser.py
```

**Why it's needed:**
The original pyresparser library has some bugs that prevent it from working correctly. This fixed version resolves those issues.

## 2. courses_data.py

**Original Location:** `Old_Python_Project/App/Courses.py`

**Purpose:** Contains curated course recommendations for different fields:

- Data Science courses
- Web Development courses
- Android Development courses
- iOS Development courses
- UI/UX Development courses
- Resume writing video tutorials
- Interview preparation video tutorials

**How to Use:**
You can import this in your Python service to provide course recommendations:

```python
from courses_data import ds_course, web_course, android_course, ios_course, uiux_course

# Get random course recommendations
import random
recommended_courses = random.sample(web_course, 5)
```

## Note

The Old_Python_Project folder has been removed as all its functionality has been successfully integrated into the Resume-JD-Matcher project through the Python microservice.

If you need to reference the original project, you can find it in the Git history or restore it from backup.

## Integration Status

✅ All features from Old_Python_Project are now available in:

- `python-service/app.py` - Main microservice
- `server/index.js` - Node.js integration
- These preserved files for reference

The integration is complete and the old project is no longer needed.
