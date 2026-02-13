import User from '../models/User.js';
import Ticket from '../models/Ticket.js';
import Message from '../models/MessageModel.js';

const colors = ['#667eea', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#06B6D4', '#EF4444', '#14B8A6'];

const agents = [
  { name: 'Sarah Chen', email: 'sarah@capacity.com', password: 'password123', role: 'agent', initials: 'SC', color: '#6366F1' },
  { name: 'Mike Johnson', email: 'mike@capacity.com', password: 'password123', role: 'agent', initials: 'MJ', color: '#10B981' },
  { name: 'Emma Wilson', email: 'emma@capacity.com', password: 'password123', role: 'agent', initials: 'EW', color: '#F59E0B' }
];

const customers = [
  { name: 'Alex Thompson', email: 'alex@acmecorp.com', company: 'Acme Corp' },
  { name: 'Maria Garcia', email: 'maria@techstart.io', company: 'TechStart' },
  { name: 'James Wilson', email: 'james@globalinc.com', company: 'Global Inc' },
  { name: 'Lisa Park', email: 'lisa@designlab.co', company: 'Design Lab' },
  { name: 'Robert Kim', email: 'robert@enterprise.net', company: 'Enterprise Solutions' }
];

const ticketData = [
  {
    subject: 'Cannot access dashboard after latest update',
    status: 'open',
    priority: 'urgent',
    channel: 'Email',
    tags: ['bug', 'dashboard'],
    messages: [
      { text: 'Hi, I just updated the Capacity platform and now I cannot access my dashboard. It shows a blank white screen with no error message.', senderType: 'customer', isPrivate: false },
      { text: "Hi Alex, thank you for reaching out. I'm sorry to hear you're experiencing this issue. Can you please try clearing your browser cache and cookies, then attempt to log in again?", senderType: 'agent', isPrivate: false },
      { text: 'I tried that but it still doesn\'t work. I\'m using Chrome version 121.0.6167.85 on MacOS.', senderType: 'customer', isPrivate: false },
      { text: "Thank you for that information. I've escalated this to our engineering team. They're investigating a known issue with the latest release. I'll keep you updated.", senderType: 'agent', isPrivate: false },
      { text: 'Engineering confirmed this is a bug in v2.4.1. Fix coming in v2.4.2 tomorrow.', senderType: 'agent', isPrivate: true, privateNote: 'Internal note - do not share with customer' }
    ]
  },
  {
    subject: 'Question about API rate limits',
    status: 'pending',
    priority: 'medium',
    channel: 'Chat',
    tags: ['api', 'billing'],
    messages: [
      { text: 'Hello! I wanted to ask about the API rate limits for our plan. We\'re seeing some 429 errors during peak hours.', senderType: 'customer', isPrivate: false },
      { text: "Hi Maria! I'd be happy to help with that. Your current plan includes 10,000 API requests per month. Would you like me to check your current usage?", senderType: 'agent', isPrivate: false },
      { text: 'Yes please! That would be helpful. We\'re growing quickly and might need to upgrade.', senderType: 'customer', isPrivate: false },
      { text: "I've reviewed your account. You've used 8,500 requests this billing cycle. I've sent a quote for the Pro plan to your email which includes 50,000 requests.", senderType: 'agent', isPrivate: false }
    ]
  },
  {
    subject: 'Integration with Salesforce not syncing',
    status: 'open',
    priority: 'high',
    channel: 'Email',
    tags: ['integration', 'salesforce'],
    messages: [
      { text: 'Our Salesforce integration stopped syncing contacts yesterday. Last successful sync was Feb 11th. We need this fixed ASAP as our sales team is impacted.', senderType: 'customer', isPrivate: false }
    ]
  },
  {
    subject: 'Feature request: Dark mode',
    status: 'solved',
    priority: 'low',
    channel: 'Feedback',
    tags: ['feature-request', 'ui'],
    messages: [
      { text: "Hi team! I love using Capacity but would really appreciate a dark mode option. Working late nights with a bright screen is tough on the eyes.", senderType: 'customer', isPrivate: false },
      { text: "Hi Lisa! Thank you so much for the feedback. I've added this to our feature request board. Dark mode is actually planned for Q2 2024!", senderType: 'agent', isPrivate: false },
      { text: "That's great news! Can't wait. Thanks for letting me know.", senderType: 'customer', isPrivate: false },
      { text: "We'll make sure to notify you when it's released! I'm going to mark this as solved but feel free to reach out if you have any other questions.", senderType: 'agent', isPrivate: false }
    ]
  },
  {
    subject: 'SSO configuration help needed',
    status: 'pending',
    priority: 'medium',
    channel: 'Email',
    tags: ['sso', 'enterprise'],
    messages: [
      { text: "We're trying to set up SSO with Okta but the SAML configuration keeps failing. Can you provide the correct metadata URL?", senderType: 'customer', isPrivate: false },
      { text: "Hi Robert, I'd be happy to help with your SSO setup. The metadata URL should be: https://your-domain.capacity.com/saml/metadata. Have you configured the ACS URL in Okta?", senderType: 'agent', isPrivate: false },
      { text: 'Yes, we have the ACS URL set. The error says "Invalid issuer". Could this be related to our certificate?', senderType: 'customer', isPrivate: false }
    ]
  }
];

export async function seedDatabase() {
  try {
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    const createdAgents = await User.insertMany(agents);
    
    for (let i = 0; i < ticketData.length; i++) {
      const td = ticketData[i];
      const customer = customers[i % customers.length];
      const initials = customer.name.split(' ').map(n => n[0]).join('').toUpperCase();
      const color = colors[i % colors.length];

      const ticket = new Ticket({
        ticketNumber: `TKT-${String(i + 1).padStart(3, '0')}`,
        customer: {
          name: customer.name,
          email: customer.email,
          company: customer.company,
          initials,
          color,
          memberSince: 'Jan 2024'
        },
        subject: td.subject,
        status: td.status,
        priority: td.priority,
        channel: td.channel,
        tags: td.tags,
        assigneeId: createdAgents[i % createdAgents.length]._id
      });

      const savedTicket = await ticket.save();

      for (const msg of td.messages) {
        const senderAgent = createdAgents.find(a => a.name === 'Sarah Chen');
        
        await new Message({
          ticketId: savedTicket._id,
          senderId: msg.senderType === 'agent' ? senderAgent._id : null,
          senderType: msg.senderType,
          senderName: msg.senderType === 'agent' ? senderAgent.name : customer.name,
          senderInitials: msg.senderType === 'agent' ? senderAgent.initials : initials,
          senderColor: msg.senderType === 'agent' ? senderAgent.color : color,
          text: msg.text,
          isPrivate: msg.isPrivate || false
        }).save();
      }
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seed error:', err);
  }
}
