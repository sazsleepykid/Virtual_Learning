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