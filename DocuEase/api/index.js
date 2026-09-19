const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// POST /api/analyze-business
app.post('/api/analyze-business', async (req, res) => {
  try {
    const business = req.body;
    
    const prompt = `You are a compliance AI assistant for DocuEase.
Given the following business profile, output a strict JSON array of required compliance documents (between 2 to 4 items).
The business profile is: ${JSON.stringify(business)}

The JSON array must contain objects with the following keys:
- id: a unique string ID
- title: string (e.g. "GST Registration")
- category: string (e.g. "Tax", "Legal", "Clearance", "License")
- status: string (e.g. "Due Soon", "Upcoming", "At Risk")
- deadline: string (YYYY-MM-DD)
- priority: string ("High", "Medium", "Low")
- description: string (brief description of what it is)
- applicabilityReason: string (why this business needs it)
- isDrafted: boolean (always false)

Output ONLY valid JSON array without markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const data = JSON.parse(response.text);
    res.json(data);
  } catch (error) {
    console.error('Error analyzing business:', error);
    res.status(500).json({ error: 'Failed to analyze business' });
  }
});

// POST /api/generate-schema
app.post('/api/generate-schema', async (req, res) => {
  try {
    const { documentTitle } = req.body;
    
    const prompt = `You are a legal form schema generator. 
We need a JSON schema describing the form fields required to draft a document titled: "${documentTitle}".

Return a strict JSON object with this structure:
{
  "title": "Drafting: [Title]",
  "fields": [
    { "name": "fieldName", "label": "Human Readable Label", "type": "text|textarea|date|number|email", "required": true, "placeholder": "Example" }
  ]
}

Include 4 to 6 relevant fields. Output ONLY valid JSON without markdown code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const data = JSON.parse(response.text);
    res.json(data);
  } catch (error) {
    console.error('Error generating schema:', error);
    res.status(500).json({ error: 'Failed to generate schema' });
  }
});

// POST /api/generate-document
app.post('/api/generate-document', async (req, res) => {
  try {
    const { documentTitle, formData } = req.body;
    
    const prompt = `You are an expert legal drafter. 
Please draft the content for a legal document titled: "${documentTitle}".
Use the following provided information to populate the document:
${JSON.stringify(formData, null, 2)}

Ensure the document is professional, well-structured, and sounds like a legitimate legal/compliance document. Return ONLY the drafted text.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.json({ documentText: response.text });
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ error: 'Failed to generate document text' });
  }
});

module.exports = app;
