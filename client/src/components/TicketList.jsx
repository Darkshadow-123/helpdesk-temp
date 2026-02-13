import { useState } from 'react';

const filterTabs = ['All', 'Open', 'Pending', 'Solved'];

function formatTimeAgo(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default function TicketList({ 
  tickets, 
  selectedTicketId, 
  onSelectTicket,
  onFilterChange,
  currentFilter,
  searchQuery,
  onSearchChange,
  loading,
  onCreateTicket
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const getStatusCount = (status) => {
    if (status === 'All') return tickets.length;
    return tickets.filter(t => t.status?.toLowerCase() === status.toLowerCase()).length;
  };

  const getAssignee = (ticket) => {
    if (ticket.assigneeId) {
      return {
        name: ticket.assigneeId.name,
        initials: ticket.assigneeId.initials,
        color: ticket.assigneeId.color
      };
    }
    return { name: 'Unassigned', initials: '?', color: '#94A3B8' };
  };

  return (
    <div className="ticket-list-panel">
      <div className="ticket-list-header">
        <h2 className="ticket-list-title">All Tickets</h2>
        <span className="ticket-count">{tickets.length} tickets</span>
      </div>

      <div className="ticket-filters">
        {filterTabs.map(tab => (
          <button
            key={tab}
            className={`filter-tab ${currentFilter === tab ? 'active' : ''}`}
            onClick={() => onFilterChange(tab)}
          >
            {tab} ({getStatusCount(tab)})
          </button>
        ))}
      </div>

      <div className="ticket-search">
        <div className="search-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search tickets..."
            value={localSearch}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="ticket-list">
        {loading ? (
          <div className="ticket-list-loading">
            <div className="loading-spinner"></div>
            <p>Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="empty-tickets">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <h3>No tickets yet</h3>
            <p>Create your first ticket to get started</p>
            <button className="btn btn-primary" onClick={onCreateTicket}>
              Create Ticket
            </button>
          </div>
        ) : (
          tickets.map(ticket => {
            const assignee = getAssignee(ticket);
            return (
              <div
                key={ticket._id}
                className={`ticket-card ${selectedTicketId === ticket._id ? 'selected' : ''}`}
                onClick={() => onSelectTicket(ticket._id)}
              >
                <div className="ticket-card-header">
                  <div className={`priority-dot priority-${ticket.priority || 'medium'}`} />
                  <div className="ticket-card-content">
                    <div className="ticket-customer">{ticket.customer?.name || 'Unknown'}</div>
                    <div className="ticket-subject">{ticket.subject}</div>
                    <div className="ticket-preview">
                      {ticket.lastMessage || 'No messages yet'}
                    </div>
                  </div>
                </div>
                <div className="ticket-card-meta">
                  <span className="ticket-time">{formatTimeAgo(ticket.updatedAt)}</span>
                  <div 
                    className="ticket-assignee"
                    style={{ background: assignee.color }}
                    title={assignee.name}
                  >
                    {assignee.initials}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
