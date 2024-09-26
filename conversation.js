const express = require('express');
const app = express();

// Dummy data: 20 dialogues per topic (partner and user) + image URLs for each topic
const conversations = {
  education: {
    imageUrl: "https://www.freepik.com/free-photo/education-day-arrangement-table-with-copy-space_10752836.htm#query=education&position=1&from_view=keyword&track=ais_hybrid&uuid=7646a47d-e214-4872-98d2-88782d8470fc",
    dialogues: [
      { id: 1, partner: "Why do you think education is important?", user: "It broadens our perspective and opens opportunities." },
      { id: 2, partner: "Do you enjoy learning new things?", user: "Yes, I believe lifelong learning is crucial for growth." },
      { id: 3, partner: "What was your favorite subject in school?", user: "Mathematics, because it challenged me to think critically." },
      { id: 4, partner: "How has education shaped your career?", user: "It gave me the foundational skills I needed to succeed." },
      { id: 5, partner: "Do you think online education is effective?", user: "Absolutely, it provides flexibility and access to quality resources." },
      { id: 6, partner: "What’s the role of technology in education?", user: "Technology enhances learning by providing innovative tools and resources." },
      { id: 7, partner: "How do you stay motivated while studying?", user: "I set small goals and reward myself when I achieve them." },
      { id: 8, partner: "Do you believe everyone should pursue higher education?", user: "Not necessarily, but I think it depends on individual goals." },
      { id: 9, partner: "What’s the most important skill you’ve learned?", user: "Critical thinking has been the most valuable skill in my life." },
      { id: 10, partner: "How do you see the future of education?", user: "I believe it will become more personalized and technology-driven." }
    ]
  },
  health: {
    imageUrl: "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=900&t=st=1727260861~exp=1727261461~hmac=a5ca248bc1385b576b2b7e9d81319fc2b587bcbe7bc202ebb4d0a2fb360f15d6",
    dialogues: [
      { id: 1, partner: "How often do you exercise?", user: "I try to work out at least three times a week." },
      { id: 2, partner: "Do you think mental health is as important as physical health?", user: "Absolutely, mental well-being is essential for overall health." },
      { id: 3, partner: "What’s your favorite way to stay active?", user: "I enjoy running outdoors and doing yoga." },
      { id: 4, partner: "How do you manage stress?", user: "I practice meditation and take breaks when I feel overwhelmed." },
      { id: 5, partner: "Do you follow any specific diet?", user: "I focus on eating balanced meals with plenty of vegetables and fruits." },
      { id: 6, partner: "How important is sleep for your health?", user: "Sleep is critical; I make sure to get at least 7-8 hours every night." },
      { id: 7, partner: "What’s your view on preventive healthcare?", user: "It's vital to prevent diseases rather than treat them after they occur." },
      { id: 8, partner: "How do you stay motivated to lead a healthy lifestyle?", user: "I focus on the long-term benefits and how great I feel when I'm healthy." },
      { id: 9, partner: "What’s the biggest challenge in maintaining your health?", user: "Time management, balancing work and staying active can be tough." },
      { id: 10, partner: "What do you do to maintain mental well-being?", user: "I practice mindfulness and make time for hobbies I enjoy." }
    ]
  },
  travel: {
    imageUrl: "https://t4.ftcdn.net/jpg/02/80/82/81/360_F_280828158_ZZ2W8atYMHiSkLoDzxgDHNhdmXJ31jCR.webp",
    dialogues: [
      { id: 1, partner: "What’s your dream travel destination?", user: "I would love to visit Japan for its culture and scenery." },
      { id: 2, partner: "Do you prefer solo travel or traveling with others?", user: "I prefer solo travel because it gives me more freedom." },
      { id: 3, partner: "What’s the most memorable trip you’ve been on?", user: "A road trip across Europe was an unforgettable experience." },
      { id: 4, partner: "How do you decide where to travel next?", user: "I usually choose places based on recommendations or my bucket list." },
      { id: 5, partner: "Do you enjoy exploring nature when you travel?", user: "Yes, I love hiking and being in natural landscapes." },
      { id: 6, partner: "What’s your go-to travel tip?", user: "Always pack light and keep your essentials easily accessible." },
      { id: 7, partner: "Do you prefer adventure or relaxation when you travel?", user: "I like a balance of both, some adventure with time to relax." },
      { id: 8, partner: "How important is experiencing local culture to you?", user: "It's a top priority, I always try to learn about the local customs." },
      { id: 9, partner: "Do you plan your trips meticulously or go with the flow?", user: "I like to have a basic plan but leave room for spontaneous activities." },
      { id: 10, partner: "What’s the best part of traveling for you?", user: "The best part is meeting new people and experiencing different cultures." }
    ]
  },
  business: {
    imageUrl: "https://img.freepik.com/free-photo/aerial-view-business-team_53876-124515.jpg?size=626&ext=jpg&ga=GA1.1.1187892385.1727260783&semt=ais_hybrid",
    dialogues: [
      { id: 1, partner: "What inspired you to start your business?", user: "I saw a gap in the market and wanted to solve a problem I experienced." },
      { id: 2, partner: "What’s the biggest challenge you've faced as an entrepreneur?", user: "Managing cash flow and balancing growth has been difficult." },
      { id: 3, partner: "How do you stay motivated during tough times?", user: "I remind myself of my long-term vision and the impact I want to create." },
      { id: 4, partner: "What’s your strategy for business growth?", user: "I focus on providing value to customers and scaling sustainably." },
      { id: 5, partner: "How do you handle competition in your industry?", user: "I focus on differentiating my product and building strong relationships with customers." },
      { id: 6, partner: "What’s the most rewarding part of running your business?", user: "Seeing the positive impact on customers and the growth of my team." },
      { id: 7, partner: "What advice would you give to aspiring entrepreneurs?", user: "Stay persistent and be open to learning from failures." },
      { id: 8, partner: "How do you prioritize tasks in your day-to-day business?", user: "I use time-blocking techniques and focus on high-priority tasks first." },
      { id: 9, partner: "What’s your long-term vision for your business?", user: "I want to expand globally and create a lasting positive impact." },
      { id: 10, partner: "How do you manage work-life balance as a business owner?", user: "I set clear boundaries and make time for family and personal well-being." }
    ]
  }
};

// Endpoint to get conversations by topics
app.get('/api/conversations', (req, res) => {
  const topicsParam = req.query.topics; // topics=education:health:travel:business
  
  if (topicsParam) {
    const topics = topicsParam.split(':');
    let result = [];

    topics.forEach(topic => {
      if (conversations[topic]) {
        result.push({
          topic,
          imageUrl: conversations[topic].imageUrl,
          dialogues: conversations[topic].dialogues
        });
      }
    });

    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json({ message: "No conversations found for the specified topics." });
    }
  } else {
    res.status(400).json({ message: "No topics provided in the query." });
  }
});

// Export the app for serverless function
module.exports = app;
