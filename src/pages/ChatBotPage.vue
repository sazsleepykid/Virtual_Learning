<!-- src/components/ChatbotPage.vue -->
<template>
  <div class="chat-page">
    <!-- Header -->
    <NavigationBar
    isLoggedIn=true
    userProfile="@assets/user.png"
    @login="handleLogin"
    @signup="handleSignup"
    @logout="handleLogout"
  />

    <!-- Main Content -->
    <div class="main-content">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <span class="logo-icon">A</span>
            <span class="logo-text">AliTeach</span>
          </div>
          <button class="new-session-btn" @click="startNewSession">New Study Session</button>
        </div>

        <div class="recent-sessions">
          <h3>Recent Study Sessions</h3>
          <ul class="session-list">
            <li 
              v-for="session in sessions" 
              :key="session.id" 
              class="session-item" 
              :class="{ active: currentSession.title === session.title }"
            >
              <span class="session-icon">{{ session.icon }}</span>
              <span class="session-name">{{ session.title }}</span>
            </li>
          </ul>
        </div>

        <div class="user-info">
          <div class="user-initials">JS</div>
          <div class="user-name">Jamie Smith</div>
        </div>
      </aside>

      <!-- Chat Area -->
      <main class="chat-area">
        <div class="chat-header">
          <div class="chat-title">
            <h2>{{ currentSession.title }}</h2>
            <p class="chat-subtitle">{{ formattedStartTime }}</p>
          </div>
          <div class="chat-actions">
            <button class="action-btn save-btn" title="Save session">
              <i class="icon-save"></i>
            </button>
            <button class="action-btn settings-btn" title="Session settings">
              <i class="icon-settings"></i>
            </button>
          </div>
        </div>

        <div class="content-filters">
          <div class="filter-item">
            <span class="filter-icon">3D</span>
            <span class="filter-label">3D Concept</span>
            <span class="filter-count">3</span>
          </div>
          <div class="filter-item active">
            <span class="filter-icon">T</span>
            <span class="filter-label">Text</span>
            <span class="filter-count">5</span>
          </div>
          <div class="filter-item">
            <span class="filter-icon">A</span>
            <span class="filter-label">Audio</span>
            <span class="filter-count">2</span>
          </div>
          <div class="filter-item">
            <span class="filter-icon">I</span>
            <span class="filter-label">Image</span>
            <span class="filter-count">4</span>
          </div>
        </div>

        <div class="chat-messages" ref="chatMessages">
          <!-- Loading indicator -->
          <div v-if="isLoading" class="loading-indicator">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <!-- Dynamic messages -->
          <template v-for="(message, index) in messages" :key="index">
            <!-- AI Message -->
            <div v-if="message.type === 'ai'" class="message ai-message">
              <div class="message-avatar">AI</div>
              <div class="message-content">
                <!-- Regular text message -->
                <template v-if="!message.isEquation">
                  <p v-html="formatMessage(message.content)"></p>
                  <div v-if="message.actions && message.actions.length" class="message-actions">
                    <button 
                      v-for="(action, actionIndex) in message.actions" 
                      :key="actionIndex" 
                      class="action-link"
                    >
                      {{ action }}
                    </button>
                  </div>
                </template>
                
                <!-- Equation/structured message -->
                <template v-else>
                  <div class="message-type">{{ message.content }}</div>
                  <div class="equation-card">
                    <h3>{{ message.equationData.title }}</h3>
                    
                    <div 
                      v-for="(section, sectionIndex) in message.equationData.sections" 
                      :key="sectionIndex" 
                      class="equation-section"
                    >
                      <h4>{{ section.title }}:</h4>
                      <div class="equation">{{ section.equation }}</div>
                      <p v-if="section.description" class="equation-description">
                        {{ section.description }}
                      </p>
                    </div>
                    
                    <p class="equation-summary">
                      {{ message.equationData.summary }}
                    </p>
                    
                    <div class="equation-actions">
                      <button 
                        v-for="(action, actionIndex) in message.equationData.actions" 
                        :key="actionIndex" 
                        class="action-btn"
                      >
                        {{ action }}
                      </button>
                    </div>
                  </div>
                </template>
              </div>
            </div>

            <!-- User Message -->
            <div v-else class="message user-message">
              <div class="message-content">
                <p>{{ message.content }}</p>
              </div>
            </div>
          </template>
        </div>

        <!-- Chat Input -->
        <div class="chat-input-area">
          <button class="add-media-btn">
            <i class="icon-add"></i>
            Add Media
          </button>
          <div class="format-buttons">
            <button class="format-btn"><i class="icon-bold"></i></button>
            <button class="format-btn"><i class="icon-italic"></i></button>
            <button class="format-btn"><i class="icon-code"></i></button>
            <button class="format-btn"><i class="icon-link"></i></button>
          </div>
          <div class="input-container">
            <textarea 
              placeholder="Ask a question or type / for commands..." 
              v-model="userInput"
              @keydown.enter.prevent="sendMessage"
              :disabled="isLoading"
            ></textarea>
            <button class="send-btn" @click="sendMessage" :disabled="isLoading">
              <i class="icon-send"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatbotPage',
  emits: ['close'],
  data() {
    return {
      userInput: '',
      messages: [],
      isLoading: false,
      API_KEY: "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",
      currentSession: {
        title: 'Physics: Wave Theory',
        startTime: new Date(Date.now() - 20 * 60000), // 20 minutes ago
      },
      sessions: [
        { id: 1, title: 'Physics: Wave Theory', icon: 'P' },
        { id: 2, title: 'Math: Calculus Review', icon: 'M' },
        { id: 3, title: 'History: Ancient Rome', icon: 'H' },
      ]
    };
  },
  computed: {
    formattedStartTime() {
      const minutes = Math.floor((Date.now() - this.currentSession.startTime) / 60000);
      return `Started ${minutes} minutes ago`;
    }
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          if (this.$refs.chatMessages) {
            this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.scrollHeight;
          }
        });
      },
      deep: true
    }
  },
  mounted() {
    // Send initial greeting message
    this.sendInitialMessage();
  },
  methods: {
    formatMessage(text) {
      // Convert line breaks to <br> tags
      let formatted = text.replace(/\n/g, '<br>');
      
      // Format inline code
      formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
      
      // Format bold text
      formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
      // Format italic text
      formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      
      return formatted;
    },
    
    async sendInitialMessage() {
      this.isLoading = true;
      try {
        const response = await this.callQwenAPI(
          "You are AliTeach, an AI educational assistant specialized in helping students learn effectively. " +
          "I'm starting a new session about Physics: Wave Theory. Introduce yourself briefly and ask what specific " +
          "aspects of wave theory I'd like to explore. Suggest a few specific topics like wave equations, " +
          "types of waves, or practical applications."
        );
        
        this.messages.push({
          type: 'ai',
          content: response,
          actions: ['Show video explanation', 'Show text summary', 'Play audio lecture']
        });
      } catch (error) {
        console.error('Error sending initial message:', error);
        this.messages.push({
          type: 'ai',
          content: "Hello! I'm AliTeach, your AI learning assistant. I'm having trouble connecting to my knowledge base. Please try again in a moment."
        });
      } finally {
        this.isLoading = false;
      }
    },
    
    async sendMessage() {
      if (!this.userInput.trim()) return;
      
      const userMessage = this.userInput.trim();
      
      // Add user message to chat
      this.messages.push({
        type: 'user',
        content: userMessage
      });
      
      // Clear input
      this.userInput = '';
      
      // Show loading state
      this.isLoading = true;
      
      try {
        // Create context from previous messages
        const context = this.messages
          .slice(-6) // Include last 6 messages for context
          .map(msg => `${msg.type === 'ai' ? 'Assistant' : 'User'}: ${msg.content}`)
          .join('\n');
        
        // Create the prompt for the AI
        const prompt = 
          "You are AliTeach, an advanced AI educational assistant designed to help students learn effectively. " +
          "You specialize in adapting to each student's learning style and providing personalized educational content. " +
          "Your goal is to make complex subjects easy to understand through clear explanations, examples, and interactive learning. " +
          "You can create educational content in various formats including text explanations, equations, diagrams descriptions, " +
          "and practice problems. You excel at breaking down complex topics into manageable parts. " +
          "When explaining concepts, provide real-world examples and applications to help students connect theory with practice. " +
          "For mathematical or scientific topics, explain the underlying principles before diving into formulas. " +
          "Always be encouraging, patient, and supportive. " +
          "Current subject: Physics - Wave Theory\n\n" +
          "Previous conversation:\n" + context + "\n\n" +
          "User's latest question: " + userMessage + "\n\n" +
          "Provide a helpful, educational response. If appropriate, include equations, examples, or offer to show different formats of learning materials.";
        
        const aiResponse = await this.callQwenAPI(prompt);
        
        // Process the response to identify any special content like equations
        const processedResponse = this.processAIResponse(aiResponse);
        
        // Add AI response to chat
        this.messages.push(processedResponse);
        
      } catch (error) {
        console.error('Error sending message:', error);
        this.messages.push({
          type: 'ai',
          content: "I'm sorry, I encountered an error while processing your request. Please try again."
        });
      } finally {
        this.isLoading = false;
      }
    },
    
    async callQwenAPI(prompt) {
      try {
        // Direct call to the OpenRouter API
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
          model: 'qwen/qwen3-30b-a3b:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        }, {
          headers: {
            'Authorization': `Bearer ${this.API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': window.location.origin, // Required by some API providers
            'X-Title': 'AliTeach Educational Assistant' // Optional identifier
          }
        });
        
        // Extract and return just the content
        return response.data.choices[0].message.content;
      } catch (error) {
        console.error('API call failed:', error);
        throw error;
      }
    },
    
    processAIResponse(response) {
      // Check if response contains equations (simple detection)
      const hasEquations = response.includes('=') && 
        (response.includes('equation') || response.includes('formula') || 
         response.includes('λ') || response.includes('ω') || 
         response.includes('sin') || response.includes('cos'));
      
      // Check if it's likely a structured explanation
      const isStructuredExplanation = response.includes('Key') && 
        (response.includes('Equation') || response.includes('Formula') || 
         response.includes('Concept') || response.includes('Principle'));
      
      if (hasEquations && isStructuredExplanation) {
        // Try to extract title and sections
        let title = 'Key Concepts';
        const titleMatch = response.match(/^#\s(.+)$|^(.+?):/) || response.match(/^(.+?)\n/);
        if (titleMatch) {
          title = titleMatch[1] || titleMatch[2];
        }
        
        // Create a structured response
        return {
          type: 'ai',
          content: 'TEXT',
          isEquation: true,
          equationData: {
            title: title,
            sections: this.extractSections(response),
            summary: this.extractSummary(response),
            actions: ['Download as PDF', 'Practice problems']
          }
        };
      } else {
        // Regular text response
        return {
          type: 'ai',
          content: response
        };
      }
    },
    
    extractSections(text) {
      // Simple section extraction - this could be more sophisticated
      const sections = [];
      
      // Look for patterns like "1. Wave Speed Equation: v = λ × f"
      const sectionRegex = /(?:^|\n)(?:\d+\.\s*|\*\s*|##\s*|•\s*)?([^:\n]+):\s*([^\n]+)(?:\n([^#\d\*•][^\n]+))?/g;
      
      let match;
      while ((match = sectionRegex.exec(text)) !== null) {
        const title = match[1].trim();
        const equation = match[2].trim();
        const description = match[3] ? match[3].trim() : '';
        
        if (title && equation) {
          sections.push({
            title: title,
            equation: equation,
            description: description
          });
        }
      }
      
      // If no sections found, create a generic one
      if (sections.length === 0) {
        const equationMatch = text.match(/[a-z\s]+=.+/) || text.match(/[a-z\s]+:[^:]+/);
        if (equationMatch) {
          sections.push({
            title: 'Key Equation',
            equation: equationMatch[0],
            description: 'Important relationship in wave theory'
          });
        }
      }
      
      return sections;
    },
    
    extractSummary(text) {
      // Try to find a concluding paragraph
      const summaryMatch = text.match(/(?:In\s+summary|To\s+summarize|Conclusion|Therefore)[^.]+\.[^.]+\./) || 
                           text.match(/(?:\n\n|\.\s+)([^.]+\.[^.]+\.[^.]+\.)$/);
      
      if (summaryMatch) {
        return summaryMatch[0].trim();
      }
      
      // Fallback to a generic summary
      return "These equations are fundamental to understanding how waves propagate and interact with different mediums.";
    },
    
    startNewSession() {
      this.currentSession = {
        title: 'New Study Session',
        startTime: new Date()
      };
      this.messages = [];
      this.sendInitialMessage();
    }
  }
};
</script>

<style scoped>
/* Base Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.chat-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
}

/* Header Styles */
.header {
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #00a19a;
  font-size: 1.5rem;
  font-weight: bold;
}

.navigation {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-size: 0.9rem;
}

.nav-link:hover {
  color: #00a19a;
}

.user-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Main Content Styles */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #00a19a;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.5rem;
}

.new-session-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #00a19a;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.new-session-btn:hover {
  background-color: #008f89;
}

.recent-sessions {
  padding: 1rem;
  flex: 1;
}

.recent-sessions h3 {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.session-list {
  list-style: none;
}

.session-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.session-item:hover {
  background-color: #f5f5f5;
}

.session-item.active {
  background-color: #e6f7f6;
  color: #00a19a;
}

.session-icon {
  width: 1.5rem;
  height: 1.5rem;
  background-color: #e0e0e0;
  color: #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 0.8rem;
}

.session-item.active .session-icon {
  background-color: #00a19a;
  color: white;
}

.session-name {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-info {
  padding: 1rem;
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}

.user-initials {
  width: 2rem;
  height: 2rem;
  background-color: #f0f0f0;
  color: #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 0.75rem;
  font-size: 0.8rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Chat Area Styles */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.chat-subtitle {
  font-size: 0.8rem;
  color: #777;
}

.chat-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.content-filters {
  display: flex;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  gap: 1rem;
  overflow-x: auto;
}

.filter-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.85rem;
}

.filter-item:hover {
  background-color: #e9e9e9;
}

.filter-item.active {
  background-color: #e6f7f6;
  color: #00a19a;
}

.filter-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.filter-count {
  margin-left: 0.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 10px;
  font-size: 0.7rem;
}

/* Chat Messages Styles */
.chat-messages {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  max-width: 90%;
}

.ai-message {
  align-self: flex-start;
}

.user-message {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #00a19a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.8rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.message-content {
  background-color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.ai-message .message-content {
  border-top-left-radius: 0;
}

.user-message .message-content {
  background-color: #e6f7f6;
  border-top-right-radius: 0;
}

.message-content p {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.message-content p:last-child {
  margin-bottom: 0;
}

.message-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.action-link {
  background-color: #f5f5f5;
  color: #555;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-link:hover {
  background-color: #e9e9e9;
  color: #333;
}

.message-type {
  color: #00a19a;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

/* Equation Card Styles */
.equation-card {
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  padding: 1.25rem;
  border: 1px solid #eee;
}

.equation-card h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
}

.equation-section {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #eee;
}

.equation-section:last-of-type {
  border-bottom: none;
}

.equation-section h4 {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.equation {
  font-family: 'Courier New', monospace;
  background-color: white;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  border: 1px solid #eee;
}

.equation-description {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.equation-summary {
  margin-bottom: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.equation-actions {
  display: flex;
  gap: 0.75rem;
}

.equation-actions .action-btn {
  background-color: #f0f0f0;
  color: #555;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  width: auto;
  height: auto;
}

.equation-actions .action-btn:hover {
  background-color: #e0e0e0;
}

/* Chat Input Styles */
.chat-input-area {
  padding: 1rem;
  border-top: 1px solid #f0f0f0;
  background-color: white;
}

.add-media-btn {
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  color: #00a19a;
  border: none;
  padding: 0.5rem;
  font-size: 0.85rem;
  cursor: pointer;
  margin-bottom: 0.75rem;
}

.add-media-btn:hover {
  color: #008f89;
}

.add-media-btn i {
  margin-right: 0.25rem;
}

.format-buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.format-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.format-btn:hover {
  background-color: #f5f5f5;
  color: #333;
}

.input-container {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.input-container textarea {
  flex: 1;
  padding: 0.75rem;
  border: none;
  resize: none;
  min-height: 2.5rem;
  max-height: 10rem;
  font-family: inherit;
  font-size: 0.9rem;
  outline: none;
}

.send-btn {
  width: 2.5rem;
  background-color: #00a19a;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-btn:hover {
  background-color: #008f89;
}

/* Icons */
[class^="icon-"] {
  font-style: normal;
}

.icon-add::before {
  content: "+";
}

.icon-bold::before {
  content: "B";
}

.icon-italic::before {
  content: "I";
}

.icon-code::before {
  content: "</>";
}

.icon-link::before {
  content: "🔗";
}

.icon-save::before {
  content: "💾";
}

.icon-settings::before {
  content: "⚙️";
}

.icon-send::before {
  content: "➤";
}

/* Responsive Styles */
@media (max-width: 768px) {
  .sidebar {
    width: 200px;
  }
  
  .message {
    max-width: 100%;
  }
  
  .equation-actions {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    max-height: 200px;
  }
  
  .chat-area {
    height: calc(100vh - 200px);
  }
  
  .content-filters {
    padding: 0.5rem;
  }
  
  .filter-item {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .message-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .action-link {
    width: 100%;
    text-align: center;
  }
}

/* Loading indicator styles */
.loading-indicator {
  display: flex;
  justify-content: flex-start;
  margin: 1rem 0;
  padding-left: 3rem;
}

.typing-indicator {
  display: flex;
  align-items: center;
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #00a19a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  animation: bounce 1.5s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-5px);
  }
}

/* Style for code blocks */
code {
  background-color: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

</style>