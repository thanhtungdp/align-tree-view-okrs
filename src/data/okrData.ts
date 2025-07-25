import { OKRData } from '../types/okr';

export const okrData: OKRData = {
  sessions: {
    'year-2025': {
      id: 'year-2025',
      title: '2025',
      type: 'year',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true
    },
    'q1-2025': {
      id: 'q1-2025',
      title: 'Q1 2025',
      type: 'quarter',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      parentSessionId: 'year-2025',
      isActive: false
    },
    'q2-2025': {
      id: 'q2-2025',
      title: 'Q2 2025',
      type: 'quarter',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      parentSessionId: 'year-2025',
      isActive: true
    },
    'q3-2025': {
      id: 'q3-2025',
      title: 'Q3 2025',
      type: 'quarter',
      startDate: '2025-07-01',
      endDate: '2025-09-30',
      parentSessionId: 'year-2025',
      isActive: false
    },
    'q4-2025': {
      id: 'q4-2025',
      title: 'Q4 2025',
      type: 'quarter',
      startDate: '2025-10-01',
      endDate: '2025-12-31',
      parentSessionId: 'year-2025',
      isActive: false
    }
  },

  teams: {
    'leadership-team': {
      id: 'leadership-team',
      name: 'Leadership Team',
      leadership: true
    },
    'sales-team': {
      id: 'sales-team',
      name: 'Sales Team',
      leadership: false
    },
    'marketing-team': {
      id: 'marketing-team',
      name: 'Marketing Team',
      leadership: false
    },
    'product-team': {
      id: 'product-team',
      name: 'Product Team',
      leadership: false
    }
  },

  activeSessionId: 'year-2025',
  currentTeamId: 'leadership-team',

  objectives: {
    // Company Level
    'company-1': {
      id: 'company-1',
      title: 'Tăng trưởng người dùng 300% trong năm 2025',
      description: 'Mở rộng cơ sở người dùng từ 10,000 lên 30,000 người dùng hoạt động',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 65,
      sessionId: 'year-2025',
      teamId: 'leadership-team',
      metrics: [
        {
          id: 'm1',
          name: 'Monthly Active Users',
          current: 19500,
          target: 30000,
          unit: 'users',
          progress: 65
        },
        {
          id: 'm2',
          name: 'User Retention Rate',
          current: 72,
          target: 80,
          unit: '%',
          progress: 90
        }
      ],
      actions: [
        {
          id: 'a1',
          title: 'Thực hiện chiến dịch marketing tổng thể',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'Marketing Team'
        },
        {
          id: 'a2',
          title: 'Cải thiện product-market fit',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'Product Team'
        }
      ],
      childrenIds: ['company-q2-1', 'sales-1', 'marketing-1', 'product-1']
    },

    'company-q2-1': {
      id: 'company-q2-1',
      title: 'Đạt 20,000 MAU trong Q2 2025',
      description: 'Milestone quan trọng để đạt mục tiêu năm 2025',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 75,
      sessionId: 'q2-2025',
      teamId: 'leadership-team',
      metrics: [
        {
          id: 'm1q2',
          name: 'Q2 Monthly Active Users',
          current: 19500,
          target: 20000,
          unit: 'users',
          progress: 97
        }
      ],
      actions: [
        {
          id: 'a1q2',
          title: 'Tăng cường marketing trong Q2',
          status: 'in-progress',
          dueDate: '2025-06-30',
          assignee: 'Marketing Team'
        }
      ],
      parentId: 'company-1',
      childrenIds: ['sales-q2-1', 'marketing-q2-1', 'product-q2-1']
    },

    // Sales Department - Year Level
    'sales-1': {
      id: 'sales-1',
      title: 'Đạt 200% tăng trưởng doanh thu năm 2025',
      description: 'Tăng doanh thu từ 2B lên 4B VNĐ thông qua việc mở rộng khách hàng doanh nghiệp',
      level: 'department',
      department: 'Sales',
      owner: 'Sales Director - Trần Thị B',
      progress: 60,
      sessionId: 'year-2025',
      teamId: 'sales-team',
      metrics: [
        {
          id: 'm3',
          name: 'Annual Recurring Revenue',
          current: 2.4,
          target: 4.0,
          unit: 'B VNĐ',
          progress: 60
        },
        {
          id: 'm4',
          name: 'Enterprise Customers',
          current: 120,
          target: 200,
          unit: 'customers',
          progress: 60
        }
      ],
      actions: [
        {
          id: 'a3',
          title: 'Triển khai sales automation toàn diện',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'Sales Ops'
        },
        {
          id: 'a4',
          title: 'Tuyển dụng 15 sales executive',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'HR & Sales'
        }
      ],
      parentId: 'company-1',
      childrenIds: ['sales-q2-1', 'sales-individual-1', 'sales-individual-2']
    },

    // Sales Department - Q2 Level
    'sales-q2-1': {
      id: 'sales-q2-1',
      title: 'Đạt 750M VNĐ doanh thu Q2',
      description: 'Milestone Q2 để đạt mục tiêu năm 2025',
      level: 'department',
      department: 'Sales',
      owner: 'Sales Director - Trần Thị B',
      progress: 70,
      sessionId: 'q2-2025',
      teamId: 'sales-team',
      metrics: [
        {
          id: 'm3q2',
          name: 'Q2 Revenue',
          current: 525,
          target: 750,
          unit: 'M VNĐ',
          progress: 70
        }
      ],
      actions: [
        {
          id: 'a3q2',
          title: 'Tăng cường prospecting trong Q2',
          status: 'in-progress',
          dueDate: '2025-06-30',
          assignee: 'Sales Team'
        }
      ],
      parentId: 'company-q2-1',
      childrenIds: ['sales-individual-q2-1']
    },

    'sales-individual-1': {
      id: 'sales-individual-1',
      title: 'Đạt 120% quota bán hàng cá nhân năm 2025',
      description: 'Hoàn thành 48M VNĐ doanh thu và chuyển đổi 60 lead thành khách hàng',
      level: 'individual',
      department: 'Sales',
      owner: 'Senior Sales - Lê Văn C',
      progress: 65,
      sessionId: 'year-2025',
      teamId: 'sales-team',
      metrics: [
        {
          id: 'm5',
          name: 'Annual Personal Revenue',
          current: 31.2,
          target: 48,
          unit: 'M VNĐ',
          progress: 65
        },
        {
          id: 'm6',
          name: 'Annual Lead Conversion',
          current: 39,
          target: 60,
          unit: 'customers',
          progress: 65
        }
      ],
      actions: [
        {
          id: 'a5',
          title: 'Hoàn thành advanced sales training',
          status: 'completed',
          dueDate: '2025-03-31',
        },
        {
          id: 'a6',
          title: 'Duy trì 20 sales call mỗi tuần',
          status: 'in-progress',
          dueDate: '2025-12-31',
        }
      ],
      parentId: 'sales-1',
      childrenIds: []
    },

    'sales-individual-q2-1': {
      id: 'sales-individual-q2-1',
      title: 'Đạt 12M VNĐ doanh thu Q2',
      description: 'Milestone Q2 cho mục tiêu cá nhân năm 2025',
      level: 'individual',
      department: 'Sales',
      owner: 'Senior Sales - Lê Văn C',
      progress: 85,
      sessionId: 'q2-2025',
      teamId: 'sales-team',
      metrics: [
        {
          id: 'm5q2',
          name: 'Q2 Personal Revenue',
          current: 10.2,
          target: 12,
          unit: 'M VNĐ',
          progress: 85
        }
      ],
      actions: [
        {
          id: 'a5q2',
          title: 'Focus on enterprise deals in Q2',
          status: 'in-progress',
          dueDate: '2025-06-30',
        }
      ],
      parentId: 'sales-q2-1',
      childrenIds: []
    },

    'sales-individual-2': {
      id: 'sales-individual-2',
      title: 'Phát triển 15 đối tác chiến lược năm 2025',
      description: 'Xây dựng mạng lưới đối tác để mở rộng kênh bán hàng gián tiếp',
      level: 'individual',
      department: 'Sales',
      owner: 'Partnership Manager - Phạm Thị D',
      progress: 40,
      sessionId: 'year-2025',
      teamId: 'sales-team',
      metrics: [
        {
          id: 'm7',
          name: 'Strategic Partners',
          current: 6,
          target: 15,
          unit: 'partners',
          progress: 40
        },
        {
          id: 'm8',
          name: 'Partner Revenue',
          current: 180,
          target: 400,
          unit: 'M VNĐ',
          progress: 45
        }
      ],
      actions: [
        {
          id: 'a7',
          title: 'Ký kết hợp đồng với 10 đối tác mới',
          status: 'in-progress',
          dueDate: '2025-12-31',
        },
        {
          id: 'a8',
          title: 'Tổ chức partner training program',
          status: 'in-progress',
          dueDate: '2025-09-30',
        }
      ],
      parentId: 'sales-1',
      childrenIds: []
    },

    // Marketing Department - Year Level
    'marketing-1': {
      id: 'marketing-1',
      title: 'Tăng 500% qualified leads từ digital channels năm 2025',
      description: 'Từ 2000 leads/tháng lên 10000 leads/tháng thông qua SEO, content marketing và paid ads',
      level: 'department',
      department: 'Marketing',
      owner: 'Marketing Director - Võ Thị E',
      progress: 55,
      sessionId: 'year-2025',
      teamId: 'marketing-team',
      metrics: [
        {
          id: 'm9',
          name: 'Monthly Qualified Leads',
          current: 5500,
          target: 10000,
          unit: 'leads',
          progress: 55
        },
        {
          id: 'm10',
          name: 'Cost per Lead',
          current: 95,
          target: 60,
          unit: 'K VNĐ',
          progress: 40
        }
      ],
      actions: [
        {
          id: 'a9',
          title: 'Launch comprehensive content strategy',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'Content Team'
        },
        {
          id: 'a10',
          title: 'Scale paid advertising campaigns',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'Performance Marketing'
        }
      ],
      parentId: 'company-1',
      childrenIds: ['marketing-q2-1', 'marketing-individual-1', 'marketing-individual-2']
    },

    // Marketing Department - Q2 Level
    'marketing-q2-1': {
      id: 'marketing-q2-1',
      title: 'Đạt 6000 qualified leads/tháng trong Q2',
      description: 'Milestone Q2 để đạt mục tiêu năm 2025',
      level: 'department',
      department: 'Marketing',
      owner: 'Marketing Director - Võ Thị E',
      progress: 75,
      sessionId: 'q2-2025',
      teamId: 'marketing-team',
      metrics: [
        {
          id: 'm9q2',
          name: 'Q2 Monthly Qualified Leads',
          current: 4500,
          target: 6000,
          unit: 'leads',
          progress: 75
        }
      ],
      actions: [
        {
          id: 'a9q2',
          title: 'Optimize Q2 marketing campaigns',
          status: 'in-progress',
          dueDate: '2025-06-30',
          assignee: 'Marketing Team'
        }
      ],
      parentId: 'company-q2-1',
      childrenIds: ['marketing-individual-q2-1']
    },

    'marketing-individual-1': {
      id: 'marketing-individual-1',
      title: 'Tăng organic traffic 400% năm 2025',
      description: 'Phát triển SEO và content marketing để đạt 200K visitors/tháng',
      level: 'individual',
      department: 'Marketing',
      owner: 'SEO Specialist - Nguyễn Văn F',
      progress: 60,
      sessionId: 'year-2025',
      teamId: 'marketing-team',
      metrics: [
        {
          id: 'm11',
          name: 'Organic Traffic',
          current: 120000,
          target: 200000,
          unit: 'visitors',
          progress: 60
        },
        {
          id: 'm12',
          name: 'Keyword Rankings',
          current: 450,
          target: 600,
          unit: 'keywords',
          progress: 75
        }
      ],
      actions: [
        {
          id: 'a11',
          title: 'Publish 100 high-quality blog posts',
          status: 'in-progress',
          dueDate: '2025-12-31',
        },
        {
          id: 'a12',
          title: 'Optimize 200 landing pages',
          status: 'in-progress',
          dueDate: '2025-12-31',
        }
      ],
      parentId: 'marketing-1',
      childrenIds: []
    },

    'marketing-individual-q2-1': {
      id: 'marketing-individual-q2-1',
      title: 'Đạt 140K organic visitors/tháng trong Q2',
      description: 'Milestone Q2 cho mục tiêu SEO năm 2025',
      level: 'individual',
      department: 'Marketing',
      owner: 'SEO Specialist - Nguyễn Văn F',
      progress: 80,
      sessionId: 'q2-2025',
      teamId: 'marketing-team',
      metrics: [
        {
          id: 'm11q2',
          name: 'Q2 Organic Traffic',
          current: 112000,
          target: 140000,
          unit: 'visitors',
          progress: 80
        }
      ],
      actions: [
        {
          id: 'a11q2',
          title: 'Focus on high-impact keywords in Q2',
          status: 'in-progress',
          dueDate: '2025-06-30',
        }
      ],
      parentId: 'marketing-q2-1',
      childrenIds: []
    },

    'marketing-individual-2': {
      id: 'marketing-individual-2',
      title: 'Đạt 20% conversion rate từ paid ads năm 2025',
      description: 'Tối ưu hóa các chiến dịch Google Ads và Facebook Ads để tăng conversion',
      level: 'individual',
      department: 'Marketing',
      owner: 'Paid Ads Manager - Lê Thị G',
      progress: 50,
      sessionId: 'year-2025',
      teamId: 'marketing-team',
      metrics: [
        {
          id: 'm13',
          name: 'Ad Conversion Rate',
          current: 10,
          target: 20,
          unit: '%',
          progress: 50
        },
        {
          id: 'm14',
          name: 'ROAS',
          current: 3.2,
          target: 5.0,
          unit: 'x',
          progress: 64
        }
      ],
      actions: [
        {
          id: 'a13',
          title: 'A/B test 50 ad creatives',
          status: 'in-progress',
          dueDate: '2025-12-31',
        },
        {
          id: 'a14',
          title: 'Implement advanced conversion tracking',
          status: 'in-progress',
          dueDate: '2025-08-31',
        }
      ],
      parentId: 'marketing-1',
      childrenIds: []
    },

    // Product Department - Year Level
    'product-1': {
      id: 'product-1',
      title: 'Cải thiện user experience và retention năm 2025',
      description: 'Nâng cao chất lượng sản phẩm để tăng user retention lên 90% và giảm churn rate',
      level: 'department',
      department: 'Product',
      owner: 'Product Director - Hoàng Văn H',
      progress: 45,
      sessionId: 'year-2025',
      teamId: 'product-team',
      metrics: [
        {
          id: 'm15',
          name: 'User Retention Rate',
          current: 78,
          target: 90,
          unit: '%',
          progress: 87
        },
        {
          id: 'm16',
          name: 'Churn Rate',
          current: 8,
          target: 3,
          unit: '%',
          progress: 20
        }
      ],
      actions: [
        {
          id: 'a15',
          title: 'Complete product redesign',
          status: 'in-progress',
          dueDate: '2025-12-31',
          assignee: 'UX Team'
        },
        {
          id: 'a16',
          title: 'Implement AI-powered recommendations',
          status: 'not-started',
          dueDate: '2025-09-30',
          assignee: 'Data Team'
        }
      ],
      parentId: 'company-1',
      childrenIds: ['product-q2-1', 'product-individual-1', 'product-individual-2']
    },

    // Product Department - Q2 Level
    'product-q2-1': {
      id: 'product-q2-1',
      title: 'Đạt 82% user retention trong Q2',
      description: 'Milestone Q2 để đạt mục tiêu năm 2025',
      level: 'department',
      department: 'Product',
      owner: 'Product Director - Hoàng Văn H',
      progress: 60,
      sessionId: 'q2-2025',
      teamId: 'product-team',
      metrics: [
        {
          id: 'm15q2',
          name: 'Q2 User Retention Rate',
          current: 78,
          target: 82,
          unit: '%',
          progress: 95
        }
      ],
      actions: [
        {
          id: 'a15q2',
          title: 'Launch Q2 UX improvements',
          status: 'in-progress',
          dueDate: '2025-06-30',
          assignee: 'UX Team'
        }
      ],
      parentId: 'company-q2-1',
      childrenIds: ['product-individual-q2-1']
    },

    'product-individual-1': {
      id: 'product-individual-1',
      title: 'Giảm 70% thời gian onboarding năm 2025',
      description: 'Tối ưu hóa luồng onboarding để người dùng mới có thể sử dụng được sản phẩm trong 3 phút',
      level: 'individual',
      department: 'Product',
      owner: 'UX Designer - Trần Văn I',
      progress: 55,
      sessionId: 'year-2025',
      teamId: 'product-team',
      metrics: [
        {
          id: 'm17',
          name: 'Average Onboarding Time',
          current: 6,
          target: 3,
          unit: 'minutes',
          progress: 33
        },
        {
          id: 'm18',
          name: 'Onboarding Completion Rate',
          current: 88,
          target: 98,
          unit: '%',
          progress: 90
        }
      ],
      actions: [
        {
          id: 'a17',
          title: 'Complete onboarding flow redesign',
          status: 'in-progress',
          dueDate: '2025-12-31',
        },
        {
          id: 'a18',
          title: 'Conduct 100 user interviews',
          status: 'in-progress',
          dueDate: '2025-08-31',
        }
      ],
      parentId: 'product-1',
      childrenIds: []
    },

    'product-individual-q2-1': {
      id: 'product-individual-q2-1',
      title: 'Giảm onboarding time xuống 5 phút trong Q2',
      description: 'Milestone Q2 cho mục tiêu UX năm 2025',
      level: 'individual',
      department: 'Product',
      owner: 'UX Designer - Trần Văn I',
      progress: 75,
      sessionId: 'q2-2025',
      teamId: 'product-team',
      metrics: [
        {
          id: 'm17q2',
          name: 'Q2 Average Onboarding Time',
          current: 6.25,
          target: 5,
          unit: 'minutes',
          progress: 60
        }
      ],
      actions: [
        {
          id: 'a17q2',
          title: 'Implement Q2 onboarding improvements',
          status: 'in-progress',
          dueDate: '2025-06-30',
        }
      ],
      parentId: 'product-q2-1',
      childrenIds: []
    },

    'product-individual-2': {
      id: 'product-individual-2',
      title: 'Ship 10 major features theo user feedback năm 2025',
      description: 'Phát triển và release các tính năng quan trọng dựa trên phản hồi của người dùng',
      level: 'individual',
      department: 'Product',
      owner: 'Product Manager - Nguyễn Thị J',
      progress: 30,
      sessionId: 'year-2025',
      teamId: 'product-team',
      metrics: [
        {
          id: 'm19',
          name: 'Features Released',
          current: 3,
          target: 10,
          unit: 'features',
          progress: 30
        },
        {
          id: 'm20',
          name: 'Feature Adoption Rate',
          current: 72,
          target: 85,
          unit: '%',
          progress: 85
        }
      ],
      actions: [
        {
          id: 'a19',
          title: 'Complete feature roadmap planning',
          status: 'completed',
          dueDate: '2025-02-28',
        },
        {
          id: 'a20',
          title: 'Develop and release 7 remaining features',
          status: 'in-progress',
          dueDate: '2025-12-31',
        }
      ],
      parentId: 'product-1',
      childrenIds: []
    }
  },

  connections: [
    // Year to Quarters
    { from: 'year-2025', to: 'q1-2025' },
    { from: 'year-2025', to: 'q2-2025' },
    { from: 'year-2025', to: 'q3-2025' },
    { from: 'year-2025', to: 'q4-2025' },
    
    // Year Company to Departments
    { from: 'company-1', to: 'sales-1' },
    { from: 'company-1', to: 'marketing-1' },
    { from: 'company-1', to: 'product-1' },
    
    // Year Company to Quarter Company
    { from: 'company-1', to: 'company-q2-1' },
    
    // Quarter Company to Quarter Departments
    { from: 'company-q2-1', to: 'sales-q2-1' },
    { from: 'company-q2-1', to: 'marketing-q2-1' },
    { from: 'company-q2-1', to: 'product-q2-1' },
    
    // Year Departments to Individuals
    { from: 'sales-1', to: 'sales-individual-1' },
    { from: 'sales-1', to: 'sales-individual-2' },
    { from: 'marketing-1', to: 'marketing-individual-1' },
    { from: 'marketing-1', to: 'marketing-individual-2' },
    { from: 'product-1', to: 'product-individual-1' },
    { from: 'product-1', to: 'product-individual-2' },
    
    // Quarter Departments to Quarter Individuals
    { from: 'sales-q2-1', to: 'sales-individual-q2-1' },
    { from: 'marketing-q2-1', to: 'marketing-individual-q2-1' },
    { from: 'product-q2-1', to: 'product-individual-q2-1' }
  ]
};