// src/services/api.ts
import axios from 'axios';

const API_KEY = "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";

export const chatAPI = {
  async sendMessage(prompt: string, model: string = 'qwen/qwen3-30b-a3b:free') {
    try {
      // Note: This approach ignores SSL verification issues, which might not be ideal
      // for production but can work for development
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Qwen API:', error);
      throw error;
    }
  }
};