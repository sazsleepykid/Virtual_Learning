<!-- src/components/ChatbotPage.vue -->
<template>
  <div class="chat-page">
    <!-- Header -->
    <header class="header">
      <div class="header-container">
        <div class="logo">AliTeach</div>
        <nav class="navigation">
          <a href="#" class="nav-link">Learning</a>
          <a href="#" class="nav-link">About</a>
          <a href="#" class="nav-link">Community</a>
        </nav>
        <!-- Changed this part to not use an image -->
        <div class="user-avatar">
          <span>JS</span>
        </div>
        <!-- Close button -->
        <v-btn icon class="close-btn" @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </header>

    <!-- Rest of the component remains the same -->
    <!-- Main Content -->
    <div class="main-content">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <span class="logo-icon">A</span>
            <span class="logo-text">AliTeach</span>
          </div>
          <button class="new-session-btn">New Study Session</button>
        </div>

        <div class="recent-sessions">
          <h3>Recent Study Sessions</h3>
          <ul class="session-list">
            <li class="session-item active">
              <span class="session-icon">P</span>
              <span class="session-name">Physics: Wave Theory</span>
            </li>
            <li class="session-item">
              <span class="session-icon">M</span>
              <span class="session-name">Math: Calculus Review</span>
            </li>
            <li class="session-item">
              <span class="session-icon">H</span>
              <span class="session-name">History: Ancient Rome</span>
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
            <h2>Physics: Wave Theory</h2>
            <p class="chat-subtitle">Started 20 minutes ago</p>
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

        <div class="chat-messages">
          <!-- AI Message -->
          <div class="message ai-message">
            <div class="message-avatar">AI</div>
            <div class="message-content">
              <p>
                Let's explore wave theory in physics. I've prepared some resources in
                different formats. You can click the tabs above to filter by media type.
                What would you like to start with?
              </p>
              <div class="message-actions">
                <button class="action-link">Show video explanation</button>
                <button class="action-link">Show text summary</button>
                <button class="action-link">Play audio lecture</button>
              </div>
            </div>
          </div>

          <!-- User Message -->
          <div class="message user-message">
            <div class="message-content">
              <p>Can you also provide a text summary of the key wave equations?</p>
            </div>
          </div>

          <!-- AI Message with Equations -->
          <div class="message ai-message">
            <div class="message-avatar">AI</div>
            <div class="message-content">
              <div class="message-type">TEXT</div>
              <div class="equation-card">
                <h3>Key Wave Equations</h3>
                
                <div class="equation-section">
                  <h4>Wave Speed Equation:</h4>
                  <div class="equation">v = λ × f</div>
                  <p class="equation-description">
                    Where v is wave speed, λ is wavelength, and f is frequency
                  </p>
                </div>
                
                <div class="equation-section">
                  <h4>Wave Function:</h4>
                  <div class="equation">y(x,t) = A sin(kx - ωt)</div>
                  <p class="equation-description">
                    Where A is amplitude, k is wave number, and ω is angular frequency
                  </p>
                </div>
                
                <p class="equation-summary">
                  These equations are fundamental to understanding how waves
                  propagate and interact with different mediums.
                </p>
                
                <div class="equation-actions">
                  <button class="action-btn">Download as PDF</button>
                  <button class="action-btn">Practice problems</button>
                </div>
              </div>
            </div>
          </div>
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
            ></textarea>
            <button class="send-btn" @click="sendMessage">
              <i class="icon-send"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatbotPage',
  emits: ['close'],
  data() {
    return {
      userInput: '',
      messages: [
        {
          type: 'ai',
          content: "Let's explore wave theory in physics. I've prepared some resources in different formats. You can click the tabs above to filter by media type. What would you like to start with?",
          actions: ['Show video explanation', 'Show text summary', 'Play audio lecture']
        },
        {
          type: 'user',
          content: 'Can you also provide a text summary of the key wave equations?'
        },
        {
          type: 'ai',
          content: 'TEXT',
          isEquation: true,
          equationData: {
            title: 'Key Wave Equations',
            sections: [
              {
                title: 'Wave Speed Equation:',
                equation: 'v = λ × f',
                description: 'Where v is wave speed, λ is wavelength, and f is frequency'
              },
              {
                title: 'Wave Function:',
                equation: 'y(x,t) = A sin(kx - ωt)',
                description: 'Where A is amplitude, k is wave number, and ω is angular frequency'
              }
            ],
            summary: 'These equations are fundamental to understanding how waves propagate and interact with different mediums.',
            actions: ['Download as PDF', 'Practice problems']
          }
        }
      ]
    };
  },
  methods: {
    sendMessage() {
      if (!this.userInput.trim()) return;
      
      // Add user message to chat
      this.messages.push({
        type: 'user',
        content: this.userInput
      });
      
      // Clear input
      this.userInput = '';
      
      // In a real app, you would call your AI service here
      // and then add the response to the messages array
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
</style>