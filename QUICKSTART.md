# 🎯 Pear Media - Quick Start Guide

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Set Environment Variables

Edit `backend/.env` with your API keys:
```
OPENAI_API_KEY=sk_your_key_here
HUGGING_FACE_API_KEY=hf_your_token_here
```

### Step 4: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Runs on http://localhost:3000
```

### Step 5: Open Application
Visit: http://localhost:3000

## 📋 Checklist Before Running

- [ ] Node.js installed (v16+)
- [ ] OpenAI API key ready
- [ ] Hugging Face token ready
- [ ] .env file in backend folder
- [ ] Both terminals ready

## 🚀 API Keys Setup

### Get OpenAI Key (2 min)
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy and paste in `.env` as `OPENAI_API_KEY`

### Get Hugging Face Token (2 min)
1. Go to https://huggingface.co/settings/tokens
2. Click "New token"
3. Copy and paste in `.env` as `HUGGING_FACE_API_KEY`

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:3001/api/health
```

### Test Text Enhancement
```bash
curl -X POST http://localhost:3001/api/text/enhance \
  -H "Content-Type: application/json" \
  -d '{"text": "A cat sitting on a fence"}'
```

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in .env or kill process |
| API key not working | Verify key format and permissions |
| CORS errors | Check proxy in frontend package.json |
| Module not found | Run `npm install` again |

## 📱 Expected Application Flow

1. **Text Tab**: Enter text → Enhance → Approve → Generate image
2. **Image Tab**: Enter prompt → Generate image → Add variations
3. **Analysis Tab**: Upload/URL → Analyze → Generate variations

## ✅ Success Indicators

- ✅ Backend running without errors
- ✅ Frontend loads in browser
- ✅ Can click buttons without errors
- ✅ API responses show in console

## 📚 Next Steps

1. Test each workflow
2. Record demo video (max 5 min)
3. Deploy to Vercel
4. Push to GitHub

## ⏱️ Time Breakdown

- Setup: 15 minutes
- Testing: 10 minutes
- Recording video: 10 minutes
- Deployment: 15 minutes
- Total: ~50 minutes

---

**Ready to start? Run the commands above!**
