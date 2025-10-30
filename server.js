const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const { RateLimiterMemory } = require('rate-limiter-flexible');
const natural = require('natural');
const Sentiment = require('sentiment');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const sentiment = new Sentiment();
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req) => req.ip,
  points: 10, // Number of requests
  duration: 60, // Per 60 seconds
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mental health responses database
const responses = {
  anxiety: [
    "I understand you're feeling anxious. Try taking slow, deep breaths. Breathe in for 4 counts, hold for 4, breathe out for 4.",
    "Anxiety can feel overwhelming. Remember that this feeling is temporary. What's one small thing you can do right now to feel more grounded?",
    "It's okay to feel anxious. You're not alone in this. Have you tried the 5-4-3-2-1 grounding technique?"
  ],
  depression: [
    "I hear that you're going through a difficult time. Your feelings are valid, and it's brave of you to reach out.",
    "Depression can make everything feel heavy. Remember that small steps count. What's one tiny thing you accomplished today?",
    "You matter, and your life has value. If you're having thoughts of self-harm, please reach out to a crisis helpline immediately."
  ],
  stress: [
    "Stress can be really challenging. Let's try to break down what's causing you stress. What's the biggest concern right now?",
    "When we're stressed, our bodies need care. Have you eaten something nutritious and stayed hydrated today?",
    "Stress often comes from feeling overwhelmed. What's one task you could delegate or postpone?"
  ],
  general: [
    "Thank you for sharing with me. How are you feeling right now?",
    "I'm here to listen. What's been on your mind lately?",
    "It takes courage to talk about mental health. What would be most helpful for you right now?"
  ],
  crisis: [
    "I'm concerned about what you've shared. Please reach out to a mental health professional or crisis helpline immediately.",
    "Your safety is the most important thing. In the US, you can call 988 for the Suicide & Crisis Lifeline.",
    "You don't have to go through this alone. Please contact emergency services or a trusted person in your life right now."
  ]
};

// Crisis keywords that require immediate attention
const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself'];

// Analyze message and provide appropriate response
function analyzeMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for crisis indicators
  if (crisisKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      category: 'crisis',
      severity: 'high',
      response: responses.crisis[Math.floor(Math.random() * responses.crisis.length)]
    };
  }
  
  // Sentiment analysis
  const sentimentResult = sentiment.analyze(message);
  
  // Keyword matching for mental health topics
  if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
    return {
      category: 'anxiety',
      severity: sentimentResult.score < -2 ? 'high' : 'medium',
      response: responses.anxiety[Math.floor(Math.random() * responses.anxiety.length)]
    };
  }
  
  if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad')) {
    return {
      category: 'depression',
      severity: sentimentResult.score < -3 ? 'high' : 'medium',
      response: responses.depression[Math.floor(Math.random() * responses.depression.length)]
    };
  }
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
    return {
      category: 'stress',
      severity: sentimentResult.score < -1 ? 'medium' : 'low',
      response: responses.stress[Math.floor(Math.random() * responses.stress.length)]
    };
  }
  
  return {
    category: 'general',
    severity: 'low',
    response: responses.general[Math.floor(Math.random() * responses.general.length)]
  };
}

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.emit('bot_message', {
    message: "Hello! I'm here to provide mental health support. How are you feeling today?",
    timestamp: new Date(),
    resources: [
      { name: "Crisis Text Line", contact: "Text HOME to 741741" },
      { name: "National Suicide Prevention Lifeline", contact: "988" },
      { name: "SAMHSA Helpline", contact: "1-800-662-4357" }
    ]
  });
  
  socket.on('user_message', async (data) => {
    try {
      // Rate limiting
      await rateLimiter.consume(socket.handshake.address);
      
      const analysis = analyzeMessage(data.message);
      
      // Log high-severity interactions (in production, this would go to a secure logging system)
      if (analysis.severity === 'high') {
        console.log(`High-severity interaction: ${socket.id} - ${analysis.category}`);
      }
      
      socket.emit('bot_message', {
        message: analysis.response,
        category: analysis.category,
        severity: analysis.severity,
        timestamp: new Date(),
        resources: analysis.category === 'crisis' ? [
          { name: "Emergency Services", contact: "911" },
          { name: "Crisis Text Line", contact: "Text HOME to 741741" },
          { name: "National Suicide Prevention Lifeline", contact: "988" }
        ] : []
      });
      
    } catch (rejRes) {
      socket.emit('bot_message', {
        message: "I'm receiving too many messages. Please wait a moment before sending another message.",
        timestamp: new Date()
      });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Mental Health Chatbot running on port ${PORT}`);
});
