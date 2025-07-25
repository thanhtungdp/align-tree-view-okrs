import { OKRData, QuarterlyOKRData } from '../types/okr';

// Q1 2025 Data
const q1Data: QuarterlyOKRData = {
  quarter: 1,
  year: 2025,
  objectives: {
    // Company Level - Annual Objective
    'annual-2025': {
      id: 'annual-2025',
      title: 'Tăng trưởng bền vững và mở rộng thị trường 2025',
      description: 'Mục tiêu tổng thể năm 2025: Tăng trưởng 400% người dùng, mở rộng 3 thị trường mới',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 25,
      timeframe: {
        type: 'annual',
        year: 2025,
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      },
      metrics: [
        {
          id: 'am1',
          name: 'Annual Revenue Growth',
          current: 25,
          target: 400,
          unit: '%',
          progress: 6
        },
        {
          id: 'am2',
          name: 'Market Expansion',
          current: 0,
          target: 3,
          unit: 'markets',
          progress: 0
        }
      ],
      actions: [
        {
          id: 'aa1',
          title: 'Xây dựng strategic roadmap 2025',
          status: 'completed',
          dueDate: '2025-01-31',
          assignee: 'Strategy Team'
        }
      ],
      childrenIds: ['company-q1-2025'],
      historicalProgress: []
    },

    // Company Level - Q1 Objective
    'company-q1-2025': {
      id: 'company-q1-2025',
      title: 'Tăng trưởng người dùng 300% trong Q1',
      description: 'Mở rộng cơ sở người dùng từ 10,000 lên 30,000 người dùng hoạt động trong Q1',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 65,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      parentObjectiveId: 'annual-2025',
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
          dueDate: '2025-03-15',
          assignee: 'Marketing Team'
        },
        {
          id: 'a2',
          title: 'Cải thiện product-market fit',
          status: 'in-progress',
          dueDate: '2025-02-28',
          assignee: 'Product Team'
        }
      ],
      parentId: 'annual-2025',
      childrenIds: ['sales-q1-2025', 'marketing-q1-2025', 'product-q1-2025'],
      historicalProgress: []
    },

    // Sales Department - Q1
    'sales-q1-2025': {
      id: 'sales-q1-2025',
      title: 'Đạt 150% doanh thu so với Q4 2024',
      description: 'Tăng doanh thu từ 500M lên 750M VNĐ thông qua việc mở rộng khách hàng doanh nghiệp',
      level: 'department',
      department: 'Sales',
      owner: 'Sales Director - Trần Thị B',
      progress: 70,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      parentObjectiveId: 'annual-2025',
      metrics: [
        {
          id: 'm3',
          name: 'Monthly Recurring Revenue',
          current: 525,
          target: 750,
          unit: 'M VNĐ',
          progress: 70
        },
        {
          id: 'm4',
          name: 'Enterprise Customers',
          current: 45,
          target: 80,
          unit: 'customers',
          progress: 56
        }
      ],
      actions: [
        {
          id: 'a3',
          title: 'Triển khai sales automation',
          status: 'completed',
          dueDate: '2025-01-31',
          assignee: 'Sales Ops'
        },
        {
          id: 'a4',
          title: 'Tuyển dụng 5 sales executive',
          status: 'in-progress',
          dueDate: '2025-02-15',
          assignee: 'HR & Sales'
        }
      ],
      parentId: 'company-q1-2025',
      childrenIds: ['sales-individual-1-q1-2025', 'sales-individual-2-q1-2025'],
      historicalProgress: []
    },

    'sales-individual-1-q1-2025': {
      id: 'sales-individual-1-q1-2025',
      title: 'Đạt 120% quota bán hàng cá nhân Q1',
      description: 'Hoàn thành 12M VNĐ doanh thu và chuyển đổi 15 lead thành khách hàng trong Q1',
      level: 'individual',
      department: 'Sales',
      owner: 'Senior Sales - Lê Văn C',
      progress: 85,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm5',
          name: 'Personal Revenue',
          current: 10.2,
          target: 12,
          unit: 'M VNĐ',
          progress: 85
        },
        {
          id: 'm6',
          name: 'Lead Conversion',
          current: 12,
          target: 15,
          unit: 'customers',
          progress: 80
        }
      ],
      actions: [
        {
          id: 'a5',
          title: 'Hoàn thành course "Advanced Sales Techniques"',
          status: 'completed',
          dueDate: '2025-01-15',
        },
        {
          id: 'a6',
          title: 'Tham gia 20 sales call mỗi tuần',
          status: 'in-progress',
          dueDate: '2025-03-31',
        }
      ],
      parentId: 'sales-q1-2025',
      childrenIds: [],
      historicalProgress: []
    },

    'sales-individual-2-q1-2025': {
      id: 'sales-individual-2-q1-2025',
      title: 'Phát triển 5 đối tác chiến lược Q1',
      description: 'Xây dựng mạng lưới đối tác để mở rộng kênh bán hàng gián tiếp trong Q1',
      level: 'individual',
      department: 'Sales',
      owner: 'Partnership Manager - Phạm Thị D',
      progress: 60,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm7',
          name: 'Strategic Partners',
          current: 3,
          target: 5,
          unit: 'partners',
          progress: 60
        },
        {
          id: 'm8',
          name: 'Partner Revenue',
          current: 45,
          target: 100,
          unit: 'M VNĐ',
          progress: 45
        }
      ],
      actions: [
        {
          id: 'a7',
          title: 'Ký kết hợp đồng với 2 đối tác lớn',
          status: 'in-progress',
          dueDate: '2025-02-28',
        },
        {
          id: 'a8',
          title: 'Tổ chức partner training program',
          status: 'not-started',
          dueDate: '2025-03-15',
        }
      ],
      parentId: 'sales-q1-2025',
      childrenIds: [],
      historicalProgress: []
    },

    // Marketing Department - Q1
    'marketing-q1-2025': {
      id: 'marketing-q1-2025',
      title: 'Tăng 400% qualified leads từ digital channels Q1',
      description: 'Từ 500 leads/tháng lên 2000 leads/tháng thông qua SEO, content marketing và paid ads',
      level: 'department',
      department: 'Marketing',
      owner: 'Marketing Director - Võ Thị E',
      progress: 75,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      parentObjectiveId: 'annual-2025',
      metrics: [
        {
          id: 'm9',
          name: 'Monthly Qualified Leads',
          current: 1500,
          target: 2000,
          unit: 'leads',
          progress: 75
        },
        {
          id: 'm10',
          name: 'Cost per Lead',
          current: 85,
          target: 70,
          unit: 'K VNĐ',
          progress: 60
        }
      ],
      actions: [
        {
          id: 'a9',
          title: 'Launch content marketing strategy',
          status: 'completed',
          dueDate: '2025-01-15',
          assignee: 'Content Team'
        },
        {
          id: 'a10',
          title: 'Optimize paid advertising campaigns',
          status: 'in-progress',
          dueDate: '2025-02-28',
          assignee: 'Performance Marketing'
        }
      ],
      parentId: 'company-q1-2025',
      childrenIds: ['marketing-individual-1-q1-2025', 'marketing-individual-2-q1-2025'],
      historicalProgress: []
    },

    'marketing-individual-1-q1-2025': {
      id: 'marketing-individual-1-q1-2025',
      title: 'Tăng organic traffic 250% Q1',
      description: 'Phát triển SEO và content marketing để đạt 50K visitors/tháng trong Q1',
      level: 'individual',
      department: 'Marketing',
      owner: 'SEO Specialist - Nguyễn Văn F',
      progress: 80,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm11',
          name: 'Organic Traffic',
          current: 40000,
          target: 50000,
          unit: 'visitors',
          progress: 80
        },
        {
          id: 'm12',
          name: 'Keyword Rankings',
          current: 125,
          target: 150,
          unit: 'keywords',
          progress: 83
        }
      ],
      actions: [
        {
          id: 'a11',
          title: 'Publish 20 high-quality blog posts',
          status: 'in-progress',
          dueDate: '2025-03-31',
        },
        {
          id: 'a12',
          title: 'Optimize 50 landing pages',
          status: 'in-progress',
          dueDate: '2025-02-28',
        }
      ],
      parentId: 'marketing-q1-2025',
      childrenIds: [],
      historicalProgress: []
    },

    'marketing-individual-2-q1-2025': {
      id: 'marketing-individual-2-q1-2025',
      title: 'Đạt 15% conversion rate từ paid ads Q1',
      description: 'Tối ưu hóa các chiến dịch Google Ads và Facebook Ads để tăng conversion trong Q1',
      level: 'individual',
      department: 'Marketing',
      owner: 'Paid Ads Manager - Lê Thị G',
      progress: 70,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm13',
          name: 'Ad Conversion Rate',
          current: 12,
          target: 15,
          unit: '%',
          progress: 80
        },
        {
          id: 'm14',
          name: 'ROAS',
          current: 3.2,
          target: 4.0,
          unit: 'x',
          progress: 80
        }
      ],
      actions: [
        {
          id: 'a13',
          title: 'A/B test 10 ad creatives',
          status: 'completed',
          dueDate: '2025-01-31',
        },
        {
          id: 'a14',
          title: 'Implement conversion tracking',
          status: 'in-progress',
          dueDate: '2025-02-15',
        }
      ],
      parentId: 'marketing-q1-2025',
      childrenIds: [],
      historicalProgress: []
    },

    // Product Department - Q1
    'product-q1-2025': {
      id: 'product-q1-2025',
      title: 'Cải thiện user experience và retention Q1',
      description: 'Nâng cao chất lượng sản phẩm để tăng user retention lên 85% và giảm churn rate trong Q1',
      level: 'department',
      department: 'Product',
      owner: 'Product Director - Hoàng Văn H',
      progress: 60,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      parentObjectiveId: 'annual-2025',
      metrics: [
        {
          id: 'm15',
          name: 'User Retention Rate',
          current: 78,
          target: 85,
          unit: '%',
          progress: 92
        },
        {
          id: 'm16',
          name: 'Churn Rate',
          current: 8,
          target: 5,
          unit: '%',
          progress: 40
        }
      ],
      actions: [
        {
          id: 'a15',
          title: 'Launch user onboarding redesign',
          status: 'in-progress',
          dueDate: '2025-02-28',
          assignee: 'UX Team'
        },
        {
          id: 'a16',
          title: 'Implement advanced analytics',
          status: 'not-started',
          dueDate: '2025-03-15',
          assignee: 'Data Team'
        }
      ],
      parentId: 'company-q1-2025',
      childrenIds: ['product-individual-1-q1-2025', 'product-individual-2-q1-2025'],
      historicalProgress: []
    },

    'product-individual-1-q1-2025': {
      id: 'product-individual-1-q1-2025',
      title: 'Giảm 50% thời gian onboarding Q1',
      description: 'Tối ưu hóa luồng onboarding để người dùng mới có thể sử dụng được sản phẩm trong 5 phút',
      level: 'individual',
      department: 'Product',
      owner: 'UX Designer - Trần Văn I',
      progress: 75,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm17',
          name: 'Average Onboarding Time',
          current: 7,
          target: 5,
          unit: 'minutes',
          progress: 60
        },
        {
          id: 'm18',
          name: 'Onboarding Completion Rate',
          current: 85,
          target: 95,
          unit: '%',
          progress: 89
        }
      ],
      actions: [
        {
          id: 'a17',
          title: 'Redesign onboarding flow',
          status: 'in-progress',
          dueDate: '2025-02-28',
        },
        {
          id: 'a18',
          title: 'Conduct 20 user interviews',
          status: 'completed',
          dueDate: '2025-01-31',
        }
      ],
      parentId: 'product-q1-2025',
      childrenIds: [],
      historicalProgress: []
    },

    'product-individual-2-q1-2025': {
      id: 'product-individual-2-q1-2025',
      title: 'Ship 3 major features theo user feedback Q1',
      description: 'Phát triển và release các tính năng quan trọng dựa trên phản hồi của người dùng trong Q1',
      level: 'individual',
      department: 'Product',
      owner: 'Product Manager - Nguyễn Thị J',
      progress: 45,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 1,
        startDate: '2025-01-01',
        endDate: '2025-03-31'
      },
      metrics: [
        {
          id: 'm19',
          name: 'Features Released',
          current: 1,
          target: 3,
          unit: 'features',
          progress: 33
        },
        {
          id: 'm20',
          name: 'Feature Adoption Rate',
          current: 65,
          target: 80,
          unit: '%',
          progress: 81
        }
      ],
      actions: [
        {
          id: 'a19',
          title: 'Complete feature 1: Advanced Dashboard',
          status: 'completed',
          dueDate: '2025-01-31',
        },
        {
          id: 'a20',
          title: 'Develop feature 2: Team Collaboration',
          status: 'in-progress',
          dueDate: '2025-02-28',
        }
      ],
      parentId: 'product-q1-2025',
      childrenIds: [],
      historicalProgress: []
    }
  },
  connections: [
    { from: 'annual-2025', to: 'company-q1-2025' },
    { from: 'company-q1-2025', to: 'sales-q1-2025' },
    { from: 'company-q1-2025', to: 'marketing-q1-2025' },
    { from: 'company-q1-2025', to: 'product-q1-2025' },
    { from: 'sales-q1-2025', to: 'sales-individual-1-q1-2025' },
    { from: 'sales-q1-2025', to: 'sales-individual-2-q1-2025' },
    { from: 'marketing-q1-2025', to: 'marketing-individual-1-q1-2025' },
    { from: 'marketing-q1-2025', to: 'marketing-individual-2-q1-2025' },
    { from: 'product-q1-2025', to: 'product-individual-1-q1-2025' },
    { from: 'product-q1-2025', to: 'product-individual-2-q1-2025' }
  ]
};

// Q2 2025 Data (Sample - showing progression)
const q2Data: QuarterlyOKRData = {
  quarter: 2,
  year: 2025,
  objectives: {
    'annual-2025': {
      id: 'annual-2025',
      title: 'Tăng trưởng bền vững và mở rộng thị trường 2025',
      description: 'Mục tiêu tổng thể năm 2025: Tăng trưởng 400% người dùng, mở rộng 3 thị trường mới',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 45,
      timeframe: {
        type: 'annual',
        year: 2025,
        startDate: '2025-01-01',
        endDate: '2025-12-31'
      },
      metrics: [
        {
          id: 'am1',
          name: 'Annual Revenue Growth',
          current: 180,
          target: 400,
          unit: '%',
          progress: 45
        },
        {
          id: 'am2',
          name: 'Market Expansion',
          current: 1,
          target: 3,
          unit: 'markets',
          progress: 33
        }
      ],
      actions: [
        {
          id: 'aa1',
          title: 'Xây dựng strategic roadmap 2025',
          status: 'completed',
          dueDate: '2025-01-31',
          assignee: 'Strategy Team'
        },
        {
          id: 'aa2',
          title: 'Launch international expansion',
          status: 'in-progress',
          dueDate: '2025-06-30',
          assignee: 'Business Development'
        }
      ],
      childrenIds: ['company-q2-2025'],
      historicalProgress: [
        {
          quarter: 1,
          year: 2025,
          progress: 25,
          metrics: [
            { id: 'am1', name: 'Annual Revenue Growth', current: 25, target: 400, unit: '%', progress: 6 },
            { id: 'am2', name: 'Market Expansion', current: 0, target: 3, unit: 'markets', progress: 0 }
          ],
          completedActions: 1,
          totalActions: 1
        }
      ]
    },

    'company-q2-2025': {
      id: 'company-q2-2025',
      title: 'Consolidate Q1 gains và mở rộng thị trường mới',
      description: 'Duy trì momentum từ Q1 và bắt đầu expansion sang thị trường Singapore',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 35,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 2,
        startDate: '2025-04-01',
        endDate: '2025-06-30'
      },
      parentObjectiveId: 'annual-2025',
      continuationOf: 'company-q1-2025',
      metrics: [
        {
          id: 'm1-q2',
          name: 'Monthly Active Users',
          current: 35000,
          target: 50000,
          unit: 'users',
          progress: 70
        },
        {
          id: 'm2-q2',
          name: 'International Users',
          current: 500,
          target: 2000,
          unit: 'users',
          progress: 25
        }
      ],
      actions: [
        {
          id: 'a1-q2',
          title: 'Launch Singapore market entry',
          status: 'in-progress',
          dueDate: '2025-05-31',
          assignee: 'International Team'
        }
      ],
      parentId: 'annual-2025',
      childrenIds: ['sales-q2-2025', 'marketing-q2-2025', 'product-q2-2025'],
      historicalProgress: [
        {
          quarter: 1,
          year: 2025,
          progress: 65,
          metrics: [
            { id: 'm1', name: 'Monthly Active Users', current: 19500, target: 30000, unit: 'users', progress: 65 },
            { id: 'm2', name: 'User Retention Rate', current: 72, target: 80, unit: '%', progress: 90 }
          ],
          completedActions: 0,
          totalActions: 2
        }
      ]
    },

    // Simplified Q2 objectives for demo
    'sales-q2-2025': {
      id: 'sales-q2-2025',
      title: 'Scale international sales và enterprise focus',
      description: 'Mở rộng sales sang Singapore và tập trung vào enterprise customers',
      level: 'department',
      department: 'Sales',
      owner: 'Sales Director - Trần Thị B',
      progress: 25,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 2,
        startDate: '2025-04-01',
        endDate: '2025-06-30'
      },
      continuationOf: 'sales-q1-2025',
      metrics: [
        {
          id: 'm3-q2',
          name: 'International Revenue',
          current: 50,
          target: 200,
          unit: 'M VNĐ',
          progress: 25
        }
      ],
      actions: [
        {
          id: 'a3-q2',
          title: 'Hire Singapore sales team',
          status: 'in-progress',
          dueDate: '2025-05-15',
        }
      ],
      parentId: 'company-q2-2025',
      childrenIds: [],
      historicalProgress: [
        {
          quarter: 1,
          year: 2025,
          progress: 70,
          metrics: [
            { id: 'm3', name: 'Monthly Recurring Revenue', current: 525, target: 750, unit: 'M VNĐ', progress: 70 },
            { id: 'm4', name: 'Enterprise Customers', current: 45, target: 80, unit: 'customers', progress: 56 }
          ],
          completedActions: 1,
          totalActions: 2
        }
      ]
    },

    'marketing-q2-2025': {
      id: 'marketing-q2-2025',
      title: 'International marketing và brand awareness',
      description: 'Xây dựng brand presence tại Singapore và optimize conversion',
      level: 'department',
      department: 'Marketing',
      owner: 'Marketing Director - Võ Thị E',
      progress: 30,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 2,
        startDate: '2025-04-01',
        endDate: '2025-06-30'
      },
      continuationOf: 'marketing-q1-2025',
      metrics: [
        {
          id: 'm9-q2',
          name: 'International Leads',
          current: 150,
          target: 500,
          unit: 'leads',
          progress: 30
        }
      ],
      actions: [
        {
          id: 'a9-q2',
          title: 'Launch Singapore marketing campaigns',
          status: 'not-started',
          dueDate: '2025-05-01',
        }
      ],
      parentId: 'company-q2-2025',
      childrenIds: [],
      historicalProgress: [
        {
          quarter: 1,
          year: 2025,
          progress: 75,
          metrics: [
            { id: 'm9', name: 'Monthly Qualified Leads', current: 1500, target: 2000, unit: 'leads', progress: 75 },
            { id: 'm10', name: 'Cost per Lead', current: 85, target: 70, unit: 'K VNĐ', progress: 60 }
          ],
          completedActions: 1,
          totalActions: 2
        }
      ]
    },

    'product-q2-2025': {
      id: 'product-q2-2025',
      title: 'Localization và advanced features',
      description: 'Localize product cho thị trường Singapore và ship advanced features',
      level: 'department',
      department: 'Product',
      owner: 'Product Director - Hoàng Văn H',
      progress: 20,
      timeframe: {
        type: 'quarterly',
        year: 2025,
        quarter: 2,
        startDate: '2025-04-01',
        endDate: '2025-06-30'
      },
      continuationOf: 'product-q1-2025',
      metrics: [
        {
          id: 'm15-q2',
          name: 'Localization Coverage',
          current: 20,
          target: 100,
          unit: '%',
          progress: 20
        }
      ],
      actions: [
        {
          id: 'a15-q2',
          title: 'Complete Singapore localization',
          status: 'not-started',
          dueDate: '2025-05-31',
        }
      ],
      parentId: 'company-q2-2025',
      childrenIds: [],
      historicalProgress: [
        {
          quarter: 1,
          year: 2025,
          progress: 60,
          metrics: [
            { id: 'm15', name: 'User Retention Rate', current: 78, target: 85, unit: '%', progress: 92 },
            { id: 'm16', name: 'Churn Rate', current: 8, target: 5, unit: '%', progress: 40 }
          ],
          completedActions: 0,
          totalActions: 2
        }
      ]
    }
  },
  connections: [
    { from: 'annual-2025', to: 'company-q2-2025' },
    { from: 'company-q2-2025', to: 'sales-q2-2025' },
    { from: 'company-q2-2025', to: 'marketing-q2-2025' },
    { from: 'company-q2-2025', to: 'product-q2-2025' }
  ]
};

export const okrData: OKRData = {
  currentQuarter: 1,
  currentYear: 2025,
  quarters: {
    '2025-Q1': q1Data,
    '2025-Q2': q2Data
  }
};