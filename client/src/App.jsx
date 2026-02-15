import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import CreateTicket from './components/CreateTicket';
import Login from './pages/Login';
import ApiService from './services/api';

function Dashboard() {
  const { user, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, [filter, searchQuery, activeNav, user]);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'All') params.status = filter;
      if (searchQuery) params.search = searchQuery;
      if (activeNav === 'my-tickets' && user) params.assignee = user.id;
      
      const data = await ApiService.tickets.getAll(params);
      setTickets(data);
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTicket = async (ticketId) => {
    try {
      const ticket = await ApiService.tickets.getById(ticketId);
      const messages = await ApiService.messages.getByTicketId(ticketId);
      setSelectedTicket({ ...ticket, messages });
    } catch (err) {
      console.error('Failed to load ticket:', err);
    }
  };

  const handleUpdateTicket = async (ticketId, updates) => {
    try {
      const updated = await ApiService.tickets.update(ticketId, updates);
      setTickets(prev => prev.map(t => t._id === ticketId ? { ...t, ...updated } : t));
      if (selectedTicket?._id === ticketId) {
        setSelectedTicket(prev => ({ ...prev, ...updated }));
      }
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  const handleSendMessage = async (messageText, isPrivate) => {
    if (!selectedTicket) return;
    
    console.log('Sending message:', { ticketId: selectedTicket._id, text: messageText, isPrivate });
    
    try {
      const newMessage = await ApiService.messages.create({
        ticketId: selectedTicket._id,
        text: messageText,
        isPrivate
      });
      
      setSelectedTicket(prev => ({
        ...prev,
        messages: [...(prev.messages || []), newMessage]
      }));
      
      await loadTickets();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      await ApiService.tickets.create(ticketData);
      setShowCreateModal(false);
      loadTickets();
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeNav={activeNav}
        onNavChange={setActiveNav}
        onCreateTicket={() => setShowCreateModal(true)}
        onLogout={logout}
        user={user}
      />
      
      <main className="main-content">
        <TicketList
          tickets={tickets}
          selectedTicketId={selectedTicket?._id}
          onSelectTicket={handleSelectTicket}
          onFilterChange={setFilter}
          currentFilter={filter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          loading={loading}
          onCreateTicket={() => setShowCreateModal(true)}
        />
        
        <TicketDetails
          ticket={selectedTicket}
          onUpdateTicket={handleUpdateTicket}
          onSendMessage={handleSendMessage}
        />
      </main>

      {showCreateModal && (
        <CreateTicket 
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
