"""
AI Resume Analyzer Python Microservice
Integrates the old Python project's resume parsing functionality
with the new Node.js/React Resume-JD-Matcher project
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import io
from werkzeug.utils import secure_filename
import traceback

# Resume parsing libraries
import nltk
try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')
    nltk.download('punkt')
    nltk.download('wordnet')

try:
    from pyresparser import ResumeParser
    from pdfminer3.layout import LAParams
    from pdfminer3.pdfpage import PDFPage
    from pdfminer3.pdfinterp import PDFResourceManager, PDFPageInterpreter
    from pdfminer3.converter import TextConverter
except ImportError as e:
    print(f"Warning: Some libraries not installed: {e}")
    print("Run: pip install -r requirements.txt")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def pdf_reader(file_path):
    """Extract text from PDF file"""
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    
    with open(file_path, 'rb') as fh:
        for page in PDFPage.get_pages(fh, caching=True, check_extractable=True):
            page_interpreter.process_page(page)
        text = fake_file_handle.getvalue()
    
    converter.close()
    fake_file_handle.close()
    return text

def get_skill_recommendations(skills, resume_text):
    """Get skill recommendations based on detected skills"""
    # Keywords for different fields
    ds_keyword = ['tensorflow', 'keras', 'pytorch', 'machine learning', 'deep learning', 'flask', 'streamlit']
    web_keyword = ['react', 'django', 'node js', 'react js', 'php', 'laravel', 'magento', 'wordpress',
                   'javascript', 'angular js', 'c#', 'asp.net', 'flask']
    android_keyword = ['android', 'android development', 'flutter', 'kotlin', 'xml', 'kivy']
    ios_keyword = ['ios', 'ios development', 'swift', 'cocoa', 'cocoa touch', 'xcode']
    uiux_keyword = ['ux', 'adobe xd', 'figma', 'zeplin', 'balsamiq', 'ui', 'prototyping', 'wireframes']
    
    recommended_skills = []
    predicted_field = 'General'
    
    # Check skills and predict field
    for skill in skills:
        skill_lower = skill.lower()
        
        if skill_lower in ds_keyword:
            predicted_field = 'Data Science'
            recommended_skills = ['Data Visualization', 'Predictive Analysis', 'Statistical Modeling',
                                'Data Mining', 'Clustering & Classification', 'Data Analytics',
                                'Quantitative Analysis', 'Web Scraping', 'ML Algorithms', 'Keras',
                                'Pytorch', 'Probability', 'Scikit-learn', 'Tensorflow', 'Flask', 'Streamlit']
            break
        elif skill_lower in web_keyword:
            predicted_field = 'Web Development'
            recommended_skills = ['React', 'Django', 'Node JS', 'React JS', 'php', 'laravel',
                                'Magento', 'wordpress', 'Javascript', 'Angular JS', 'C#', 'Flask', 'SDK']
            break
        elif skill_lower in android_keyword:
            predicted_field = 'Android Development'
            recommended_skills = ['Android', 'Android development', 'Flutter', 'Kotlin', 'XML',
                                'Java', 'Kivy', 'GIT', 'SDK', 'SQLite']
            break
        elif skill_lower in ios_keyword:
            predicted_field = 'IOS Development'
            recommended_skills = ['IOS', 'IOS Development', 'Swift', 'Cocoa', 'Cocoa Touch',
                                'Xcode', 'Objective-C', 'SQLite', 'Plist', 'StoreKit', 'UI-Kit',
                                'AV Foundation', 'Auto-Layout']
            break
        elif skill_lower in uiux_keyword:
            predicted_field = 'UI-UX Development'
            recommended_skills = ['UI', 'User Experience', 'Adobe XD', 'Figma', 'Zeplin', 'Balsamiq',
                                'Prototyping', 'Wireframes', 'Storyframes', 'Adobe Photoshop',
                                'Editing', 'Illustrator', 'After Effects', 'Premier Pro', 'Indesign',
                                'Wireframe', 'Solid', 'Grasp', 'User Research']
            break
    
    return predicted_field, recommended_skills

def calculate_experience_level(resume_text, no_of_pages):
    """Determine candidate experience level"""
    if no_of_pages < 1:
        return "Fresher"
    
    text_upper = resume_text.upper()
    
    if 'INTERNSHIP' in text_upper or 'INTERNSHIPS' in text_upper:
        return "Intermediate"
    elif 'EXPERIENCE' in text_upper or 'WORK EXPERIENCE' in text_upper:
        return "Experienced"
    else:
        return "Fresher"

def calculate_resume_score(resume_text):
    """Calculate resume score based on key sections"""
    score = 0
    text_upper = resume_text.upper()
    
    scoring_criteria = {
        'Objective/Summary': (['OBJECTIVE', 'SUMMARY'], 6),
        'Education': (['EDUCATION', 'SCHOOL', 'COLLEGE'], 12),
        'Experience': (['EXPERIENCE', 'WORK EXPERIENCE'], 16),
        'Internships': (['INTERNSHIP', 'INTERNSHIPS'], 6),
        'Skills': (['SKILLS', 'SKILL'], 7),
        'Hobbies': (['HOBBIES'], 4),
        'Interests': (['INTERESTS'], 5),
        'Achievements': (['ACHIEVEMENTS'], 13),
        'Certifications': (['CERTIFICATIONS', 'CERTIFICATION'], 12),
        'Projects': (['PROJECTS', 'PROJECT'], 19)
    }
    
    feedback = []
    
    for section, (keywords, points) in scoring_criteria.items():
        if any(keyword in text_upper for keyword in keywords):
            score += points
            feedback.append({
                'section': section,
                'present': True,
                'points': points,
                'message': f'✓ Great! You have added {section}'
            })
        else:
            feedback.append({
                'section': section,
                'present': False,
                'points': 0,
                'message': f'✗ Consider adding {section} to improve your resume'
            })
            
    # Content Density Bonus
    word_count = len(resume_text.split())
    if word_count > 200:
        bonus = 5
        if word_count > 500:
            bonus += 5
        
        score += bonus
        feedback.append({
            'section': 'Content Depth',
            'present': True,
            'points': bonus,
            'message': f'✓ Good detailed content ({word_count} words)'
        })
    
    return min(100, score), feedback

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'AI Resume Analyzer'}), 200

@app.route('/api/analyze-resume', methods=['POST'])
def analyze_resume():
    """
    Main endpoint to analyze resume
    Accepts PDF file and returns comprehensive analysis
    """
    try:
        # Check if file is present
        if 'resume' not in request.files:
            return jsonify({'error': 'No resume file provided'}), 400
        
        file = request.files['resume']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only PDF files are allowed'}), 400
        
        # Save file
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        try:
            # Parse resume using pyresparser
            resume_data = ResumeParser(file_path).get_extracted_data()
            
            if not resume_data:
                return jsonify({'error': 'Failed to parse resume'}), 500
            
            # Extract full text from PDF
            resume_text = pdf_reader(file_path)
            
            # Get skills
            skills = resume_data.get('skills', [])
            
            # Get recommendations
            predicted_field, recommended_skills = get_skill_recommendations(skills, resume_text)
            
            # Calculate experience level
            no_of_pages = resume_data.get('no_of_pages', 1)
            experience_level = calculate_experience_level(resume_text, no_of_pages)
            
            # Calculate resume score
            resume_score, score_feedback = calculate_resume_score(resume_text)
            
            # Prepare response
            response = {
                'success': True,
                'data': {
                    'basic_info': {
                        'name': resume_data.get('name', 'Not found'),
                        'email': resume_data.get('email', 'Not found'),
                        'mobile': resume_data.get('mobile_number', 'Not found'),
                        'degree': resume_data.get('degree', []),
                        'no_of_pages': no_of_pages
                    },
                    'skills': {
                        'detected': skills,
                        'recommended': recommended_skills,
                        'predicted_field': predicted_field
                    },
                    'experience': {
                        'level': experience_level,
                        'college_name': resume_data.get('college_name', []),
                        'company_names': resume_data.get('company_names', []),
                        'designation': resume_data.get('designation', [])
                    },
                    'score': {
                        'total': resume_score,
                        'max': 100,
                        'percentage': min(resume_score, 100),
                        'feedback': score_feedback
                    },
                    'raw_text': resume_text[:500]  # First 500 chars for preview
                }
            }
            
            # Clean up uploaded file
            try:
                os.remove(file_path)
            except:
                pass
            
            return jsonify(response), 200
            
        except Exception as parse_error:
            # Clean up file on error
            try:
                os.remove(file_path)
            except:
                pass
            
            return jsonify({
                'error': 'Error parsing resume',
                'details': str(parse_error),
                'traceback': traceback.format_exc()
            }), 500
            
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'details': str(e),
            'traceback': traceback.format_exc()
        }), 500

@app.route('/api/extract-text', methods=['POST'])
def extract_text():
    """
    Extract text from PDF resume
    """
    try:
        if 'resume' not in request.files:
            return jsonify({'error': 'No resume file provided'}), 400
        
        file = request.files['resume']
        
        if file.filename == '' or not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file'}), 400
        
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        try:
            text = pdf_reader(file_path)
            os.remove(file_path)
            
            return jsonify({
                'success': True,
                'text': text
            }), 200
        except Exception as e:
            try:
                os.remove(file_path)
            except:
                pass
            return jsonify({'error': str(e)}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Starting AI Resume Analyzer Python Microservice...")
    print("📝 Service will run on http://localhost:5001")
    print("🔗 Integrating with Resume-JD-Matcher Node.js backend")
    app.run(host='0.0.0.0', port=5001, debug=True)
