import { useState, useRef, useEffect } from 'react';
import { agents } from '../data/mockData';

export default function MessageComposer({ onSend, isPrivate }) {
  const [message, setMessage] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [mentionPosition, setMentionPosition] = useState(0);
  const [isPrivateNote, setIsPrivateNote] = useState(isPrivate);
  const textareaRef = useRef(null);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(mentionSearch.toLowerCase()) ||
    agent.email.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  useEffect(() => {
    setIsPrivateNote(isPrivate);
  }, [isPrivate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      if (!textAfterAt.includes(' ')) {
        setShowMentions(true);
        setMentionSearch(textAfterAt);
        setMentionPosition(lastAtIndex);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const handleMentionSelect = (agent) => {
    const beforeMention = message.slice(0, mentionPosition);
    const afterMention = message.slice(textareaRef.current.selectionStart);
    const newMessage = `${beforeMention}@${agent.name} ${afterMention}`;
    setMessage(newMessage);
    setShowMentions(false);
    textareaRef.current.focus();
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim(), isPrivateNote);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-composer">
      <div className="composer-wrapper">
        <div className="composer-toolbar">
          <button className="toolbar-btn" title="Bold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            </svg>
          </button>
          <button className="toolbar-btn" title="Italic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>
          <button className="toolbar-btn" title="Link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          
          <div className="toolbar-divider" />
          
          <button className="toolbar-btn" title="Attach file">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
          </button>
          <button className="toolbar-btn" title="Emoji">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
          <button 
            className={`toolbar-btn ${showMentions ? 'active' : ''}`}
            title="Mention"
            onClick={() => setShowMentions(!showMentions)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
            </svg>
          </button>
          <button className="toolbar-btn" title="Canned response">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
          </button>
        </div>

        {showMentions && filteredAgents.length > 0 && (
          <div className="mention-popup">
            {filteredAgents.map(agent => (
              <div 
                key={agent.id} 
                className="mention-item"
                onClick={() => handleMentionSelect(agent)}
              >
                <div className="mention-avatar" style={{ background: agent.color }}>
                  {agent.initials}
                </div>
                <div>
                  <div className="mention-name">{agent.name}</div>
                  <div className="mention-email">{agent.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <textarea
          ref={textareaRef}
          className="composer-textarea"
          placeholder={isPrivateNote ? "Write a private note..." : "Write a message..."}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="composer-footer">
        <div className="composer-options">
          <label className="private-toggle">
            <input 
              type="checkbox" 
              checked={isPrivateNote}
              onChange={(e) => setIsPrivateNote(e.target.checked)}
            />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Private note
          </label>
        </div>

        <div className="composer-send">
          <span className="char-count">{message.length}</span>
          <button className="btn btn-primary" onClick={handleSend}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
