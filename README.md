# 🧠 Mental Health Support Chatbot

**AI-powered mental health support with crisis detection and resource recommendations**

## 🚀 Live Deploy Options

### Heroku (Recommended)
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/durellwilson/mental-health-chatbot)

### Railway
```bash
railway login
railway init
railway up
```

### Digital Ocean App Platform
```bash
# Connect GitHub repo to DO App Platform
# Auto-deploys with zero config
```

## ✨ Features

### 🤖 **Intelligent Response System**
- Sentiment analysis for emotional state detection
- Keyword matching for specific mental health topics
- Crisis detection with immediate resource provision
- Contextual responses based on conversation history

### 🚨 **Crisis Intervention**
- Automatic detection of self-harm indicators
- Immediate crisis resource recommendations
- Emergency contact information display
- Escalation protocols for high-risk situations

### 🛡️ **Privacy & Security**
- Anonymous conversations (no user data stored)
- Rate limiting to prevent abuse
- Secure WebSocket connections
- HIPAA-compliant design principles

### 📱 **User Experience**
- Real-time chat interface
- Mobile-responsive design
- Typing indicators and timestamps
- Resource links and contact information

## 🛠️ Tech Stack
- **Backend**: Node.js, Express, Socket.io
- **Frontend**: Vanilla JavaScript, WebSockets
- **AI**: Natural Language Processing, Sentiment Analysis
- **Security**: Helmet.js, Rate Limiting, CORS
- **Deployment**: Heroku, Railway, Digital Ocean

## 🏥 Mental Health Resources

### Crisis Support
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357

### Professional Help
- **Psychology Today**: Find local therapists
- **BetterHelp**: Online therapy platform
- **Talkspace**: Text-based therapy

## 💻 Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 🔧 Environment Variables
```bash
PORT=3000
NODE_ENV=production
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

## 🧪 Testing
```bash
npm test
# Run integration tests for crisis detection
# Test rate limiting functionality
# Validate response accuracy
```

## 📊 Analytics & Monitoring
- Real-time conversation monitoring
- Crisis intervention tracking
- Response effectiveness metrics
- User engagement analytics

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/improvement`)
3. Add comprehensive tests
4. Submit pull request with detailed description

## ⚠️ Important Disclaimers
- **Not a replacement for professional mental health care**
- **Emergency situations require immediate professional help**
- **All conversations are anonymous and not stored**
- **Crisis detection triggers immediate resource recommendations**

## 📄 License
MIT License - Use responsibly for mental health support

## 🌟 Impact
- **24/7 Availability**: Always accessible mental health support
- **Crisis Prevention**: Early intervention for at-risk individuals
- **Resource Connection**: Bridge to professional mental health services
- **Stigma Reduction**: Anonymous, judgment-free support environment

**Built with compassion for mental health awareness and support** 💚
