# Pear Media - Text Enhancement & Image Generation Platform

![Pear Media](https://img.shields.io/badge/Status-Active-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-18+-blue)

A full-stack web application that integrates multiple AI APIs to perform **text enhancement** and **image generation** workflows.

## 🎯 Features

### Text Enhancement Workflow
- ✅ Input text prompts
- ✅ AI-powered text analysis using OpenAI GPT
- ✅ Automatic prompt enhancement for better image generation
- ✅ Manual approval before image generation
- ✅ Direct image generation from enhanced prompts

### Image Generation Workflow
- ✅ Text-to-image generation using DALL-E 3
- ✅ Image style variations (Oil Painting, Watercolor, Digital Art, etc.)
- ✅ Image generation using Hugging Face Stable Diffusion

### Image Analysis Workflow
- ✅ Image upload and URL support
- ✅ AI-powered image analysis using OpenAI Vision API
- ✅ Automatic object detection, theme analysis, and caption generation
- ✅ Image variation generation based on analysis

## 🛠️ Tech Stack

### Backend
- **Framework**: Node.js + Express.js
- **APIs Used**:
  - OpenAI GPT-3.5-Turbo (text enhancement)
  - DALL-E 3 (image generation)
  - OpenAI Vision API (image analysis)
  - Hugging Face Stable Diffusion (image variations)

### Frontend
- **Framework**: React.js 18+
- **Styling**: CSS3 with responsive design
- **HTTP Client**: Axios

### Hosting
- **Deployment**: Vercel
- **Database**: Optional (for future enhancements)

## 📋 Prerequisites

- Node.js 16+ and npm
- OpenAI API Key ([Get it here](https://platform.openai.com/api-keys))
- Hugging Face API Token ([Get it here](https://huggingface.co/settings/tokens))

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/username/pear-media.git
cd pear-media
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your API keys
# OPENAI_API_KEY=sk_...
# HUGGING_FACE_API_KEY=hf_...

# Start the backend server
npm run dev
# Backend runs on http://localhost:3001
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
# Frontend runs on http://localhost:3000
```

### 4. Access the Application
Open your browser and navigate to: **http://localhost:3000**

## 🔑 API Configuration

### OpenAI Setup
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Navigate to API Keys
4. Create a new API key
5. Add it to your `.env` file as `OPENAI_API_KEY`

### Hugging Face Setup
1. Visit [Hugging Face](https://huggingface.co)
2. Create an account or sign in
3. Go to Settings → Access Tokens
4. Create a new token with read access
5. Add it to your `.env` file as `HUGGING_FACE_API_KEY`

## 📱 Application Workflow

### Text Enhancement → Image Generation
1. User enters a text prompt
2. System analyzes and enhances the prompt using OpenAI GPT
3. User reviews and approves the enhanced prompt
4. System generates an image using DALL-E 3
5. Optional: Generate style variations using Hugging Face

### Image Analysis → Variations
1. User uploads an image or provides URL
2. System analyzes the image using OpenAI Vision API
3. Analysis includes: objects, theme, style, and caption
4. User can generate variations in different styles
5. Variations are generated using Hugging Face Stable Diffusion

## 📦 API Endpoints

### Text Enhancement
```
POST /api/text/enhance
Body: { "text": "User's prompt" }
Response: { "original": "...", "enhanced": "..." }
```

### Image Generation
```
POST /api/image/generate
Body: { "prompt": "Enhanced prompt" }
Response: { "imageUrl": "...", "prompt": "..." }
```

### Image Analysis
```
POST /api/image/analyze
Body: { "imageUrl": "..." }
Response: { "analysis": "...", "imageUrl": "..." }
```

### Image Variations
```
POST /api/image/variations
Body: { "prompt": "...", "style": "Oil Painting" }
Response: { "imageBase64": "...", "prompt": "...", "style": "..." }
```

## 🌐 Deployment on Vercel

### Backend Deployment
```bash
cd backend
vercel
# Follow the prompts to deploy
```

### Frontend Deployment
```bash
cd frontend
npm run build
vercel
# Follow the prompts to deploy
```

## 📸 Screenshots

### Main Interface
- Tab-based navigation for different workflows
- Clean, modern UI with gradient background
- Responsive design for mobile and desktop

### Text Enhancement Tab
- Text input area
- Real-time comparison of original vs enhanced text
- Approval button for image generation

### Image Generation Tab
- Prompt input
- DALL-E generated images
- Style selector for variations
- Variation image grid

### Image Analysis Tab
- Image upload or URL input
- AI-powered analysis display
- Objects and themes detection
- Caption generation

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ API Integration (OpenAI, DALL-E, Hugging Face)
- ✅ Full-stack development (React + Node.js)
- ✅ Prompt Engineering
- ✅ Image Processing
- ✅ Responsive UI/UX Design
- ✅ Error Handling & User Feedback
- ✅ Deployment & Hosting

## ⏱️ Development Timeline

- **Hour 1-1.5**: API setup & backend configuration
- **Hour 1.5-2.5**: Backend API endpoint development
- **Hour 2.5-3.5**: Frontend UI and component integration
- **Hour 3.5-4.5**: Testing and bug fixes
- **Hour 4.5-5.5**: Deployment to Vercel
- **Hour 5.5-6**: Documentation and demo video

## 🐛 Troubleshooting

### Backend not starting?
- Check if Node.js is installed: `node --version`
- Verify .env file exists with API keys
- Check port 3001 is not in use

### Frontend not connecting to backend?
- Ensure backend is running on port 3001
- Check proxy setting in frontend `package.json`
- Clear browser cache and restart dev server

### API errors?
- Verify API keys are correct in .env
- Check API key limits and usage
- Ensure API keys have necessary permissions

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Pear Media Assignment**
- Full-stack development
- AI API integration
- UI/UX design

## 🎬 Demo Video

A 5-minute demonstration video is available showing:
- Full text enhancement workflow
- Image generation and variations
- Image analysis capabilities
- API integrations in action

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review API documentation
3. Create an issue on GitHub

## 🙏 Acknowledgments

- OpenAI for GPT and DALL-E APIs
- Hugging Face for Stable Diffusion models
- React and Node.js communities
- Vercel for hosting

---

**Status**: ✅ Complete and Deployed
**Last Updated**: April 2026
