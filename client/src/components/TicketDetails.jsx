import { useState } from 'react';
import MessageComposer from './MessageComposer';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit'
  });
}

export default function TicketDetails({ ticket, onUpdateTicket, onSendMessage }) {
  const [activeTab, setActiveTab] = useState('public');
  const [status, setStatus] = useState(ticket?.status || 'open');
  const [priority, setPriority] = useState(ticket?.priority || 'medium');

  if (!ticket) {
    return (
      <div className="ticket-details-panel">
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <h3>Select a ticket</h3>
          <p>Choose a ticket from the list to view details</p>
        </div>
      </div>
    );
  }

  const publicMessages = ticket.messages.filter(m => !m.isPrivate);
  const privateMessages = ticket.messages.filter(m => m.isPrivate);
  const displayedMessages = activeTab === 'public' ? publicMessages : privateMessages;

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateTicket(ticket.id, { status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    onUpdateTicket(ticket.id, { priority: newPriority });
  };

  const handleSend = (messageText, isPrivate) => {
    onSendMessage(ticket.id, messageText, isPrivate);
  };

  return (
    <div className="ticket-details-panel">
      <div className="ticket-details-header">
        <div className="ticket-header-top">
          <span className="ticket-id">{ticket.id}</span>
          <div className="ticket-actions">
            <button className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </button>
            <button className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Resolve
            </button>
          </div>
        </div>

        <h1 className="ticket-title">{ticket.subject}</h1>

        <div className="ticket-meta">
          <div className="meta-item">
            <span className={`status-badge status-${status}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <div className="select-wrapper">
              <select 
                className="select" 
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="solved">Solved</option>
              </select>
            </div>
          </div>

          <div className="meta-item">
            <span className={`priority-badge priority-${priority}-badge`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <div className="select-wrapper">
              <select 
                className="select"
                value={priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(ticket.createdAt)}
          </div>

          <div className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {ticket.channel}
          </div>
        </div>
      </div>

      <div className="customer-info">
        <div className="customer-card">
          <div className="customer-avatar" style={{ background: ticket.customer.color }}>
            {ticket.customer.initials}
          </div>
          <div className="customer-details">
            <h4>{ticket.customer.name}</h4>
            <p>{ticket.customer.email}</p>
          </div>
          <div className="customer-extra">
            <div className="customer-company">{ticket.customer.company}</div>
            <div className="customer-since">Member since {ticket.customer.memberSince}</div>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'public' ? 'active' : ''}`}
            onClick={() => setActiveTab('public')}
          >
            Public Messages
            <span className="tab-count">{publicMessages.length}</span>
          </button>
          <button 
            className={`tab ${activeTab === 'private' ? 'active' : ''}`}
            onClick={() => setActiveTab('private')}
          >
            Private Notes
            <span className="tab-count">{privateMessages.length}</span>
          </button>
        </div>
      </div>

      <div className="message-thread">
        {displayedMessages.length === 0 ? (
          <div className="empty-state">
            <p>No {activeTab} messages yet</p>
          </div>
        ) : (
          displayedMessages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.type} ${message.isPrivate ? 'private' : ''}`}
            >
              <div className="message-avatar" style={{ background: message.color }}>
                {message.initials}
              </div>
              <div className="message-content">
                {message.isPrivate && (
                  <div className="private-note-indicator">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Private Note
                  </div>
                )}
                <div className="message-header">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-text">
                  <p>{message.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <MessageComposer 
        onSend={handleSend}
        isPrivate={activeTab === 'private'}
      />
    </div>
  );
}
