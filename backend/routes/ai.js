const express = require('express');
const router = express.Router();
const axios = require('axios');

// AI Assistant endpoint
router.post('/assistant', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // Simple rule-based responses (replace with actual AI integration)
    const response = await generateAIResponse(message, context);
    
    res.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing AI request',
      error: error.message
    });
  }
});

async function generateAIResponse(message, context) {
  const lowerMessage = message.toLowerCase();
  
  // Rule-based responses for demo
  if (lowerMessage.includes('timetable') || lowerMessage.includes('schedule')) {
    return "I can help you generate optimized timetables based on NEP 2020 guidelines. Would you like me to create a new timetable or modify an existing one?";
  }
  
  if (lowerMessage.includes('nep') || lowerMessage.includes('guideline')) {
    return "NEP 2020 emphasizes skill development, interdisciplinary learning, and flexible scheduling. I ensure your timetable includes skill periods, activity blocks, and balanced workload distribution.";
  }
  
  if (lowerMessage.includes('teacher') || lowerMessage.includes('faculty')) {
    return "I can help manage teacher allocations while considering their availability, subject expertise, and maximum weekly hours to prevent overload.";
  }
  
  if (lowerMessage.includes('classroom') || lowerMessage.includes('room')) {
    return "I optimize classroom allocation based on capacity, facility requirements, and availability to ensure efficient space utilization.";
  }
  
  if (lowerMessage.includes('conflict') || lowerMessage.includes('clash')) {
    return "My conflict detection system prevents teacher clashes, room double-booking, and student schedule conflicts automatically.";
  }
  
  return "I'm your NEP SmartScheduler AI assistant. I can help you create optimized timetables, manage resources, and ensure NEP 2020 compliance. How can I assist you with your scheduling needs today?";
}

module.exports = router;