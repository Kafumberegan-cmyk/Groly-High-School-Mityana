// Chat widget functionality
class ChatWidget {
    constructor() {
        this.widget = document.getElementById('chatWidget');
        this.toggleBtn = document.querySelector('.chat-toggle');
        this.closeBtn = document.querySelector('.close-chat');
        this.sendBtn = document.querySelector('.chat-input button');
        this.input = document.querySelector('.chat-input input');
        this.messagesContainer = document.querySelector('.chat-messages');
        
        this.init();
    }
    
    init() {
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }
    
    toggleChat() {
        this.widget.classList.toggle('active');
    }
    
    closeChat() {
        this.widget.classList.remove('active');
    }
    
    sendMessage() {
        const message = this.input.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.input.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                this.addMessage('Thank you for your message. Our team will respond shortly.', 'bot');
            }, 1000);
        }
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chat widget
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});