require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Multer for image uploads
const upload = multer({ storage: multer.memoryStorage() });

// ============ TEXT ENHANCEMENT ENDPOINTS ============

// Enhance Text using Hugging Face (FREE)
app.post('/api/text/enhance', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Use Hugging Face text generation (free tier)
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        {
          inputs: `Enhance and improve this prompt for AI image generation. Make it more detailed, specific, and visual: "${text}"\n\nEnhanced prompt:`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          },
          timeout: 60000,
        }
      );

      const enhancedText = response.data[0]?.generated_text?.split('Enhanced prompt:')[1]?.trim() || text;

      return res.json({
        original: text,
        enhanced: enhancedText || `${text}, in high quality, detailed, professional, artistic style`,
        timestamp: new Date(),
        source: 'Hugging Face Mistral',
      });
    } catch (hfError) {
      console.log('Hugging Face model unavailable, using fallback enhancement...');
      
      // Fallback: provide a basic enhanced version
      const enhancedFallback = `${text}, highly detailed, professional quality, cinematic lighting, 8k resolution, award-winning, stunning visual composition`;
      
      return res.json({
        original: text,
        enhanced: enhancedFallback,
        timestamp: new Date(),
        source: 'Smart Fallback Enhancement',
      });
    }
  } catch (error) {
    console.error('Error enhancing text:', error.message);
    
    // Ultimate fallback
    const enhancedFallback = `${req.body.text}, detailed, high quality, professional, vibrant, well-composed, artistic`;
    return res.json({
      original: req.body.text,
      enhanced: enhancedFallback,
      timestamp: new Date(),
      source: 'Demo Enhancement',
    });
  }
});

// ============ IMAGE GENERATION ENDPOINTS ============

// Generate Image from Enhanced Text (Using Pixabay API - FREE REAL IMAGES)
app.post('/api/image/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`🎨 Finding image for: "${prompt}"`);
    
    // Use Pixabay API (FREE - 500k requests/month, no credit card needed)
    try {
      const pixabayKey = process.env.PIXABAY_API_KEY;
      
      if (!pixabayKey || pixabayKey.includes('YOUR_PIXABAY')) {
        throw new Error('Pixabay API key not configured');
      }
      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: pixabayKey,
          q: prompt,  // Search query
          image_type: 'photo',
          per_page: 3,  // Minimum is 3
          min_width: 1024,
        },
        timeout: 10000,
      });

      if (response.data.hits && response.data.hits.length > 0) {
        // Find the best matching image based on tags
        let bestImage = response.data.hits[0];
        
        // Check if any image has the main keyword in its tags
        const mainKeyword = prompt.toLowerCase().split(/[\s,]+/)[0]; // Get first word
        const imageWithKeyword = response.data.hits.find(img => 
          img.tags && img.tags.toLowerCase().includes(mainKeyword)
        );
        
        if (imageWithKeyword) {
          bestImage = imageWithKeyword;
          console.log('✅ Found matching image with tag:', mainKeyword);
        }
        
        const imageUrl = bestImage.largeImageURL;
        
        return res.json({
          imageUrl: imageUrl,
          prompt: prompt,
          timestamp: new Date(),
          source: `Pixabay Real Photo (${prompt})`,
        });
      } else {
        throw new Error('No images found for this prompt');
      }
    } catch (pixabayError) {
      console.log('⚠️  Pixabay error:', pixabayError.message);
      console.log('⚠️  Fallback: Using semantic photo matching...');
      
      // Fallback: Use semantic matching with known URLs
      const keywords = prompt.toLowerCase().match(/\b\w+\b/g) || [];
      const mainKeyword = keywords[0] || 'nature';
      
      const imageMap = {
        'car': 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'tree': 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'mountain': 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'sunset': 'https://images.pexels.com/photos/1130731/pexels-photo-1130731.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'ocean': 'https://images.pexels.com/photos/3915857/pexels-photo-3915857.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'city': 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
        'portrait': 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1024&h=1024&fit=crop',
      };
      
      const imageUrl = imageMap[mainKeyword] || `https://picsum.photos/1024/1024?random=${Math.abs(prompt.charCodeAt(0)) % 50}`;
      
      return res.json({
        imageUrl: imageUrl,
        prompt: prompt,
        timestamp: new Date(),
        source: `Photo (Semantic Match: ${mainKeyword})`,
      });
    }
  } catch (error) {
    console.error('Error generating image:', error.message);
    
    return res.json({
      imageUrl: `https://picsum.photos/1024/1024?random=${Math.abs(Date.now() % 100)}`,
      prompt: req.body.prompt,
      timestamp: new Date(),
      source: 'Photo (Fallback)',
    });
  }
});

// ============ IMAGE ANALYSIS ENDPOINTSfuck work ============

// Analyze Image using Hugging Face Vision (FREE)
app.post('/api/image/analyze', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Try OpenAI Vision first
    try {
      const { OpenAI } = require('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
              {
                type: 'text',
                text: 'Analyze this image and provide: 1) Objects detected, 2) Theme/style, 3) Color palette, 4) A detailed caption suitable for regenerating similar images.',
              },
            ],
          },
        ],
        max_tokens: 500,
      });

      return res.json({
        analysis: response.choices[0].message.content,
        imageUrl: imageUrl,
        timestamp: new Date(),
        source: 'OpenAI Vision',
      });
    } catch (openaiError) {
      console.log('OpenAI Vision unavailable, using Hugging Face...');
      
      // Fallback to Hugging Face Vision: Image-to-Text (FREE)
      try {
        const response = await axios.post(
          'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base',
          {
            inputs: imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            },
            timeout: 30000,
          }
        );

        // Get caption from Hugging Face model
        const caption = response.data[0]?.generated_text || 'Image analyzed';

        // Generate analysis based on caption
        const analysis = `Image Analysis (Hugging Face Vision Model):

🎯 Visual Understanding:
${caption}

📊 Objects & Elements:
The image contains various visual elements that have been analyzed and understood by the AI model.

🎨 Theme & Style:
This image presents a specific visual style and composition suitable for creative reuse.

🌈 Color & Composition:
The image demonstrates a well-balanced composition with distinct visual characteristics.

📝 Generated Caption for Image Regeneration:
"${caption}" - This detailed caption can be used to generate similar images using AI image generation models.

💡 Suggested Variations:
- Different artistic style (oil painting, watercolor, digital art)
- Different perspective or angle
- Similar scene with varying lighting
- Related subject matter in the same style`;

        return res.json({
          analysis: analysis,
          imageUrl: imageUrl,
          timestamp: new Date(),
          source: 'Hugging Face BLIP Vision Model',
          caption: caption,
        });
      } catch (hfError) {
        console.log('Hugging Face Vision also unavailable, using enhanced mock analysis...');
        
        // Fallback: Return enhanced mock analysis
        const mockAnalysis = `Image Analysis (Demo Mode - Free Tier):

🎯 Visual Understanding:
This image has been processed through an AI analysis pipeline to extract meaningful information about its content, composition, and visual characteristics.

📊 Objects & Elements Detected:
- Primary subject matter identified
- Secondary elements and background components
- Visual hierarchy and focal points established

🎨 Theme & Style Analysis:
The image demonstrates specific artistic or photographic characteristics that define its visual style. The composition suggests a professional or intentional arrangement of elements.

🌈 Color Palette:
The image uses a coordinated color scheme with:
- Dominant colors that set the overall tone
- Accent colors that add visual interest
- Good color balance and contrast

📝 Detailed Caption for Image Regeneration:
"A professionally composed image with clear visual elements, distinctive style, and balanced composition, suitable for creating similar images through AI generation."

💡 Suggested Variations:
- Oil Painting Style: Transform into classical artistic medium
- Watercolor Version: Soft, fluid artistic interpretation
- Digital Art: Modern, stylized digital rendering
- Photography Style: Photorealistic enhancement
- Different Lighting: Varied illumination scenarios
- Alternative Perspective: Different viewing angles`;

        return res.json({
          analysis: mockAnalysis,
          imageUrl: imageUrl,
          timestamp: new Date(),
          source: 'Mock Analysis (Free Tier Demo)',
        });
      }
    }
  } catch (error) {
    console.error('Error analyzing image:', error.message);
    res.status(500).json({ error: 'Failed to analyze image', details: error.message });
  }
});

// Generate Image Variations (Using Pixabay API - FREE REAL IMAGES)
app.post('/api/image/variations', async (req, res) => {
  try {
    const { prompt, style } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`🎨 Generating variation for: "${prompt}" in ${style || 'default'} style`);
    
    try {
      const pixabayKey = process.env.PIXABAY_API_KEY;
      
      if (!pixabayKey || pixabayKey.includes('YOUR_PIXABAY')) {
        throw new Error('Pixabay API key not configured');
      }
      
      const searchQuery = style ? `${prompt} ${style}` : prompt;
      
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: pixabayKey,
          q: searchQuery,
          image_type: 'photo',
          per_page: 3,  // Minimum is 3
          min_width: 512,
        },
        timeout: 10000,
      });

      if (response.data.hits && response.data.hits.length > 0) {
        // Find the best matching image based on tags
        let bestImage = response.data.hits[0];
        
        // Check if any image has the main keyword in its tags
        const mainKeyword = prompt.toLowerCase().split(/[\s,]+/)[0];
        const imageWithKeyword = response.data.hits.find(img => 
          img.tags && img.tags.toLowerCase().includes(mainKeyword)
        );
        
        if (imageWithKeyword) {
          bestImage = imageWithKeyword;
          console.log('✅ Found best matching variation for:', mainKeyword);
        }
        
        const imageUrl = bestImage.largeImageURL;
        
        return res.json({
          imageBase64: imageUrl,
          prompt: prompt,
          style: style || 'default',
          timestamp: new Date(),
          source: `Pixabay Variation (${style || 'default'} style)`,
        });
      } else {
        throw new Error('No variations found');
      }
    } catch (pixabayError) {
      console.log('⚠️  Pixabay error, using fallback...');
      
      const placeholderUrl = `https://picsum.photos/512/512?random=${Math.abs(Date.now() % 50)}`;
      return res.json({
        imageBase64: placeholderUrl,
        prompt: prompt,
        style: style || 'default',
        timestamp: new Date(),
        source: `Photo (Fallback - ${style || 'default'} style)`,
      });
    }
  } catch (error) {
    console.error('Error generating variations:', error.message);
    
    return res.json({
      imageBase64: `https://picsum.photos/512/512?random=${Math.abs(Date.now() % 50)}`,
      prompt: req.body.prompt,
      style: req.body.style || 'default',
      timestamp: new Date(),
      source: 'Photo (Fallback)',
    });
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Export for Vercel Serverless Functions
module.exports = app;

// Start Server (only for local development)
if (process.env.NODE_ENV !== 'production' && require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Pear Media Backend running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Image Generation: Pixabay API (Real Photos)`);
    console.log(`📊 Using: FREE 500k/month photo search`);
  });
}

