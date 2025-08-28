# 🔥 Forest Fire Detection System

A comprehensive machine learning-based web application for predicting forest fire risks in Algeria using environmental factors such as temperature, humidity, wind conditions, and rainfall.

## 🌟 Features

### **ML-Powered Predictions**
- **Ridge Regression Model**: Advanced machine learning algorithm for accurate fire risk assessment
- **Real-time Analysis**: Instant predictions based on environmental parameters
- **Risk Level Classification**: LOW, MEDIUM, HIGH, and EXTREME risk categories

### **Interactive Dashboard**
- **Prediction History**: Track all your previous predictions with detailed analytics
- **Data Visualization**: Beautiful charts showing temperature trends, risk patterns, and distribution
- **Summary Statistics**: Total predictions, average risk, highest/lowest risk scores
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### **User Experience**
- **Smooth Navigation**: GSAP-powered smooth scrolling between dashboard sections
- **Active Page Indicators**: Clear navigation showing current page
- **Custom Scrollbars**: Beautiful, dark-themed scrollbars for better visibility
- **Hover Effects**: Interactive elements with smooth transitions and animations

### **Data Management**
- **Local Storage**: Secure storage of user prediction history
- **Data Persistence**: Predictions saved locally for privacy and convenience
- **Export Ready**: Structured data format for future analysis

## 🏗️ Project Structure

```
ML Project 1/
├── Backend/                          # Python Flask Backend
│   ├── application.py               # Main Flask application
│   ├── models/                      # Trained ML models
│   │   ├── ridgereg.pkl            # Ridge Regression model
│   │   └── scaler.pkl              # Data scaler
│   ├── notebooks/                   # Jupyter notebooks
│   │   ├── 1.EDA&FeatureEngi.ipynb # Exploratory Data Analysis
│   │   ├── 2.ModelTraining.ipynb   # Model Training
│   │   └── Algerian_forest_fires_clean_dataset.csv
│   └── requirements.txt             # Python dependencies
│
└── Frontend/                        # Next.js Frontend
    ├── src/
    │   ├── app/                     # Next.js App Router
    │   │   ├── page.js             # Home page with prediction form
    │   │   ├── about/page.js       # About page
    │   │   ├── dashboard/page.js   # Dashboard with charts
    │   │   └── api/predict/        # API routes
    │   ├── Components/              # React components
    │   │   ├── Form.jsx            # Prediction form
    │   │   ├── Navigation.jsx      # Navigation bar
    │   │   └── DashboardChart.jsx  # Custom chart components
    │   └── app/globals.css         # Global styles with custom scrollbars
    ├── package.json                 # Node.js dependencies
    └── next.config.mjs             # Next.js configuration
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+
- Modern web browser

### **Frontend Setup**

1. **Navigate to Frontend directory**
   ```bash
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install GSAP for smooth scrolling**
   ```bash
   npm install gsap
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### **Backend Setup**

1. **Navigate to Backend directory**
   ```bash
   cd Backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Flask application**
   ```bash
   python application.py
   ```

## 📱 How to Use

### **1. Make a Prediction**
- Navigate to the home page
- Fill in environmental parameters:
  - **Temperature** (°C)
  - **Relative Humidity** (%)
  - **Wind Speed** (km/h)
  - **Rainfall** (mm)
  - **FFMC, DMC, ISI** (Fire Weather Index)
  - **Region** selection
- Click "Predict" to get instant fire risk assessment

### **2. View Dashboard**
- Click "Dashboard" in navigation
- View your prediction history
- Analyze trends with interactive charts
- Check summary statistics

### **3. Navigate Between Sections**
- Use quick navigation buttons (Summary, Charts, History)
- Smooth scrolling between dashboard sections
- Active page indicators in navigation

## 🛠️ Technologies Used

### **Frontend**
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: High-performance animations and smooth scrolling
- **Custom SVG Charts**: Lightweight, interactive data visualization

### **Backend**
- **Python Flask**: Lightweight web framework
- **Scikit-learn**: Machine learning library
- **Ridge Regression**: ML algorithm for fire risk prediction
- **Pickle**: Model serialization

### **Data & ML**
- **Algerian Forest Fires Dataset**: Historical fire data
- **Feature Engineering**: Advanced data preprocessing
- **Model Training**: Jupyter notebooks for ML pipeline
- **Data Validation**: Input validation and error handling

## 📊 Machine Learning Model

### **Algorithm**: Ridge Regression
- **Type**: Linear regression with L2 regularization
- **Purpose**: Predict forest fire risk based on environmental factors
- **Features**: Temperature, humidity, wind, rainfall, fire weather indices
- **Output**: Continuous risk score (0-100)

### **Model Performance**
- **Training Data**: Historical Algerian forest fire records
- **Validation**: Cross-validation for robust performance
- **Scalability**: Handles various environmental conditions
- **Accuracy**: Optimized for real-world fire risk assessment

## 🎨 Custom Features

### **Smooth Scrolling**
- GSAP-powered smooth section navigation
- Custom easing functions for natural movement
- Fallback to native smooth scrolling

### **Custom Scrollbars**
- Dark-themed scrollbars for better visibility
- Webkit and Firefox compatibility
- Hover effects and smooth transitions

### **Responsive Design**
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🔧 Configuration

### **Environment Variables**
```bash
# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend
FLASK_ENV=development
FLASK_DEBUG=1
```

### **Customization**
- **Colors**: Modify Tailwind CSS classes
- **Animations**: Adjust GSAP timing and easing
- **Charts**: Customize chart colors and styles
- **Scrollbars**: Modify scrollbar appearance in `globals.css`

## 🚀 Deployment

### **Frontend (Vercel/Netlify)**
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Output directory: `.next`
4. Deploy automatically on push

### **Backend (Render/Railway)**
1. Upload Backend folder
2. Install Python dependencies
3. Set environment variables
4. Deploy Flask application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Dataset**: Algerian Forest Fires Dataset
- **ML Framework**: Scikit-learn community
- **Frontend**: Next.js and React communities
- **Animations**: GSAP team for smooth scrolling

## 📞 Support

For questions or support:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ for forest fire prevention and environmental safety**
