export const agents = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah@capacity.com',
    initials: 'SC',
    color: '#6366F1',
    role: 'Support Lead'
  },
  {
    id: 2,
    name: 'Mike Johnson',
    email: 'mike@capacity.com',
    initials: 'MJ',
    color: '#10B981',
    role: 'Support Agent'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma@capacity.com',
    initials: 'EW',
    color: '#F59E0B',
    role: 'Support Agent'
  }
];

export const tickets = [
  {
    id: 'TKT-001',
    customer: {
      name: 'Alex Thompson',
      email: 'alex@acmecorp.com',
      company: 'Acme Corp',
      initials: 'AT',
      color: '#667eea',
      memberSince: 'Jan 2024'
    },
    subject: 'Cannot access dashboard after latest update',
    status: 'open',
    priority: 'urgent',
    createdAt: '2024-02-13T10:30:00Z',
    updatedAt: '2024-02-13T14:45:00Z',
    assignee: agents[0],
    channel: 'Email',
    tags: ['bug', 'dashboard'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Alex Thompson',
        initials: 'AT',
        color: '#667eea',
        text: 'Hi, I just updated the Capacity platform and now I cannot access my dashboard. It shows a blank white screen with no error message.',
        timestamp: '2024-02-13T10:30:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Sarah Chen',
        initials: 'SC',
        color: '#6366F1',
        text: 'Hi Alex, thank you for reaching out. I\'m sorry to hear you\'re experiencing this issue. Can you please try clearing your browser cache and cookies, then attempt to log in again?',
        timestamp: '2024-02-13T10:45:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'customer',
        sender: 'Alex Thompson',
        initials: 'AT',
        color: '#667eea',
        text: 'I tried that but it still doesn\'t work. I\'m using Chrome version 121.0.6167.85 on MacOS.',
        timestamp: '2024-02-13T11:00:00Z',
        isPrivate: false
      },
      {
        id: 4,
        type: 'agent',
        sender: 'Sarah Chen',
        initials: 'SC',
        color: '#6366F1',
        text: 'Thank you for that information. I\'ve escalated this to our engineering team. They\'re investigating a known issue with the latest release. I\'ll keep you updated.',
        timestamp: '2024-02-13T11:15:00Z',
        isPrivate: false
      },
      {
        id: 5,
        type: 'agent',
        sender: 'Sarah Chen',
        initials: 'SC',
        color: '#6366F1',
        text: 'Engineering confirmed this is a bug in v2.4.1. Fix coming in v2.4.2 tomorrow.',
        timestamp: '2024-02-13T14:30:00Z',
        isPrivate: true,
        privateNote: 'Internal note - do not share with customer'
      }
    ]
  },
  {
    id: 'TKT-002',
    customer: {
      name: 'Maria Garcia',
      email: 'maria@techstart.io',
      company: 'TechStart',
      initials: 'MG',
      color: '#10B981',
      memberSince: 'Nov 2023'
    },
    subject: 'Question about API rate limits',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-02-12T09:15:00Z',
    updatedAt: '2024-02-13T08:20:00Z',
    assignee: agents[1],
    channel: 'Chat',
    tags: ['api', 'billing'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Maria Garcia',
        initials: 'MG',
        color: '#10B981',
        text: 'Hello! I wanted to ask about the API rate limits for our plan. We\'re seeing some 429 errors during peak hours.',
        timestamp: '2024-02-12T09:15:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Mike Johnson',
        initials: 'MJ',
        color: '#10B981',
        text: 'Hi Maria! I\'d be happy to help with that. Your current plan includes 10,000 API requests per month. Would you like me to check your current usage?',
        timestamp: '2024-02-12T09:30:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'customer',
        sender: 'Maria Garcia',
        initials: 'MG',
        color: '#10B981',
        text: 'Yes please! That would be helpful. We\'re growing quickly and might need to upgrade.',
        timestamp: '2024-02-12T09:45:00Z',
        isPrivate: false
      },
      {
        id: 4,
        type: 'agent',
        sender: 'Mike Johnson',
        initials: 'MJ',
        color: '#10B981',
        text: 'I\'ve reviewed your account. You\'ve used 8,500 requests this billing cycle. I\'ve sent a quote for the Pro plan to your email which includes 50,000 requests.',
        timestamp: '2024-02-13T08:20:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-003',
    customer: {
      name: 'James Wilson',
      email: 'james@globalinc.com',
      company: 'Global Inc',
      initials: 'JW',
      color: '#F59E0B',
      memberSince: 'Jun 2023'
    },
    subject: 'Integration with Salesforce not syncing',
    status: 'open',
    priority: 'high',
    createdAt: '2024-02-13T08:00:00Z',
    updatedAt: '2024-02-13T08:00:00Z',
    assignee: agents[2],
    channel: 'Email',
    tags: ['integration', 'salesforce'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'James Wilson',
        initials: 'JW',
        color: '#F59E0B',
        text: 'Our Salesforce integration stopped syncing contacts yesterday. Last successful sync was Feb 11th. We need this fixed ASAP as our sales team is impacted.',
        timestamp: '2024-02-13T08:00:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-004',
    customer: {
      name: 'Lisa Park',
      email: 'lisa@designlab.co',
      company: 'Design Lab',
      initials: 'LP',
      color: '#EC4899',
      memberSince: 'Dec 2023'
    },
    subject: 'Feature request: Dark mode',
    status: 'solved',
    priority: 'low',
    createdAt: '2024-02-10T14:20:00Z',
    updatedAt: '2024-02-12T16:00:00Z',
    assignee: agents[0],
    channel: 'Feedback',
    tags: ['feature-request', 'ui'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Lisa Park',
        initials: 'LP',
        color: '#EC4899',
        text: 'Hi team! I love using Capacity but would really appreciate a dark mode option. Working late nights with a bright screen is tough on the eyes.',
        timestamp: '2024-02-10T14:20:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Sarah Chen',
        initials: 'SC',
        color: '#6366F1',
        text: 'Hi Lisa! Thank you so much for the feedback. I\'ve added this to our feature request board. Dark mode is actually planned for Q2 2024!',
        timestamp: '2024-02-10T14:45:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'customer',
        sender: 'Lisa Park',
        initials: 'LP',
        color: '#EC4899',
        text: 'That\'s great news! Can\'t wait. Thanks for letting me know.',
        timestamp: '2024-02-10T15:00:00Z',
        isPrivate: false
      },
      {
        id: 4,
        type: 'agent',
        sender: 'Sarah Chen',
        initials: 'SC',
        color: '#6366F1',
        text: 'We\'ll make sure to notify you when it\'s released! I\'m going to mark this as solved but feel free to reach out if you have any other questions.',
        timestamp: '2024-02-12T16:00:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-005',
    customer: {
      name: 'Robert Kim',
      email: 'robert@enterprise.net',
      company: 'Enterprise Solutions',
      initials: 'RK',
      color: '#8B5CF6',
      memberSince: 'Mar 2023'
    },
    subject: 'SSO configuration help needed',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-02-11T11:30:00Z',
    updatedAt: '2024-02-13T09:00:00Z',
    assignee: agents[1],
    channel: 'Email',
    tags: ['sso', 'enterprise'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Robert Kim',
        initials: 'RK',
        color: '#8B5CF6',
        text: 'We\'re trying to set up SSO with Okta but the SAML configuration keeps failing. Can you provide the correct metadata URL?',
        timestamp: '2024-02-11T11:30:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Mike Johnson',
        initials: 'MJ',
        color: '#10B981',
        text: 'Hi Robert, I\'d be happy to help with your SSO setup. The metadata URL should be: https://your-domain.capacity.com/saml/metadata. Have you configured the ACS URL in Okta?',
        timestamp: '2024-02-11T12:00:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'customer',
        sender: 'Robert Kim',
        initials: 'RK',
        color: '#8B5CF6',
        text: 'Yes, we have the ACS URL set. The error says "Invalid issuer". Could this be related to our certificate?',
        timestamp: '2024-02-13T09:00:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-006',
    customer: {
      name: 'Emily Chen',
      email: 'emily@startup.com',
      company: 'New Startup',
      initials: 'EC',
      color: '#06B6D4',
      memberSince: 'Feb 2024'
    },
    subject: 'How to export data to CSV?',
    status: 'solved',
    priority: 'low',
    createdAt: '2024-02-09T16:45:00Z',
    updatedAt: '2024-02-09T17:30:00Z',
    assignee: agents[2],
    channel: 'Chat',
    tags: ['how-to', 'export'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Emily Chen',
        initials: 'EC',
        color: '#06B6D4',
        text: 'Hi! New user here. How do I export my data to CSV? I can\'t find the option anywhere.',
        timestamp: '2024-02-09T16:45:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Emma Wilson',
        initials: 'EW',
        color: '#F59E0B',
        text: 'Welcome to Capacity, Emily! To export data, go to Settings > Data > Export. You can choose which data types to include and the date range. Let me know if you need any help!',
        timestamp: '2024-02-09T17:00:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'customer',
        sender: 'Emily Chen',
        initials: 'EC',
        color: '#06B6D4',
        text: 'Found it! Thank you so much for the quick response.',
        timestamp: '2024-02-09T17:30:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-007',
    customer: {
      name: 'David Brown',
      email: 'david@corporate.com',
      company: 'Corporate Ltd',
      initials: 'DB',
      color: '#EF4444',
      memberSince: 'Aug 2023'
    },
    subject: 'Billing discrepancy on latest invoice',
    status: 'open',
    priority: 'urgent',
    createdAt: '2024-02-13T13:00:00Z',
    updatedAt: '2024-02-13T13:00:00Z',
    assignee: agents[0],
    channel: 'Email',
    tags: ['billing', 'urgent'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'David Brown',
        initials: 'DB',
        color: '#EF4444',
        text: 'I just received invoice #4521 for $2,499 but we\'re on the $999/month plan. This is a significant overcharge. Please resolve immediately.',
        timestamp: '2024-02-13T13:00:00Z',
        isPrivate: false
      }
    ]
  },
  {
    id: 'TKT-008',
    customer: {
      name: 'Sophie Turner',
      email: 'sophie@creative.agency',
      company: 'Creative Agency',
      initials: 'ST',
      color: '#14B8A6',
      memberSince: 'Oct 2023'
    },
    subject: 'White label customization request',
    status: 'pending',
    priority: 'medium',
    createdAt: '2024-02-08T10:00:00Z',
    updatedAt: '2024-02-12T14:00:00Z',
    assignee: agents[2],
    channel: 'Email',
    tags: ['white-label', 'enterprise'],
    messages: [
      {
        id: 1,
        type: 'customer',
        sender: 'Sophie Turner',
        initials: 'ST',
        color: '#14B8A6',
        text: 'We\'re interested in white labeling Capacity for our agency. What are the options for custom branding?',
        timestamp: '2024-02-08T10:00:00Z',
        isPrivate: false
      },
      {
        id: 2,
        type: 'agent',
        sender: 'Emma Wilson',
        initials: 'EW',
        color: '#F59E0B',
        text: 'Hi Sophie! Great question. White labeling is available on our Enterprise plan. It includes custom logo, colors, and domain. I\'ve connected you with our sales team for pricing.',
        timestamp: '2024-02-08T11:00:00Z',
        isPrivate: false
      },
      {
        id: 3,
        type: 'agent',
        sender: 'Emma Wilson',
        initials: 'EW',
        color: '#F59E0B',
        text: 'Following up - did the sales team reach out? Let me know if you have any other questions!',
        timestamp: '2024-02-12T14:00:00Z',
        isPrivate: false
      }
    ]
  }
];

export const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'Getting Started with Capacity',
    category: 'Getting Started',
    views: 1250
  },
  {
    id: 2,
    title: 'Setting up SSO with Okta',
    category: 'Integrations',
    views: 890
  },
  {
    id: 3,
    title: 'Understanding API Rate Limits',
    category: 'API',
    views: 654
  },
  {
    id: 4,
    title: 'Exporting Your Data',
    category: 'Getting Started',
    views: 432
  }
];
