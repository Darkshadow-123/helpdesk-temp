import { useState } from 'react';
import './CreateTicket.css';

export default function CreateTicket({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    company: '',
    subject: '',
    priority: 'medium',
    channel: 'Email',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      customer: {
        name: formData.customerName,
        email: formData.customerEmail,
        company: formData.company
      },
      subject: formData.subject,
      priority: formData.priority,
      channel: formData.channel,
      tags: []
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Ticket</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Inc."
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Ticket Details</h3>
            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief description of the issue"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the issue..."
                rows={4}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="form-group">
                <label>Channel</label>
                <select name="channel" value={formData.channel} onChange={handleChange}>
                  <option value="Email">Email</option>
                  <option value="Chat">Chat</option>
                  <option value="Phone">Phone</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
