import { OKRData } from '../types/okr';

export const okrData: OKRData = {
  objectives: {
    // Company Level
    'company-1': {
      id: 'company-1',
      title: 'Tăng trưởng người dùng 300% trong Q2',
      description: 'Mở rộng cơ sở người dùng từ 10,000 lên 30,000 người dùng hoạt động',
      level: 'company',
      owner: 'CEO - Nguyễn Văn A',
      progress: 65,
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
      childrenIds: ['sales-1', 'marketing-1', 'product-1']
    },

    // Sales Department
    'sales-1': {
      id: 'sales-1',
      title: 'Đạt 150% doanh thu so với Q1',
      description: 'Tăng doanh thu từ 500M lên 750M VNĐ thông qua việc mở rộng khách hàng doanh nghiệp',
      level: 'department',
      department: 'Sales',
      owner: 'Sales Director - Trần Thị B',
      progress: 70,
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
      parentId: 'company-1',
      childrenIds: ['sales-individual-1', 'sales-individual-2']
    },

    'sales-individual-1': {
      id: 'sales-individual-1',
      title: 'Đạt 120% quota bán hàng cá nhân',
      description: 'Hoàn thành 12M VNĐ doanh thu và chuyển đổi 15 lead thành khách hàng',
      level: 'individual',
      department: 'Sales',
      owner: 'Senior Sales - Lê Văn C',
      progress: 85,
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
      parentId: 'sales-1',
      childrenIds: []
    },

    'sales-individual-2': {
      id: 'sales-individual-2',
      title: 'Phát triển 5 đối tác chiến lược',
      description: 'Xây dựng mạng lưới đối tác để mở rộng kênh bán hàng gián tiếp',
      level: 'individual',
      department: 'Sales',
      owner: 'Partnership Manager - Phạm Thị D',
      progress: 60,
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
      parentId: 'sales-1',
      childrenIds: []
    },

    // Marketing Department
    'marketing-1': {
      id: 'marketing-1',
      title: 'Tăng 400% qualified leads từ digital channels',
      description: 'Từ 500 leads/tháng lên 2000 leads/tháng thông qua SEO, content marketing và paid ads',
      level: 'department',
      department: 'Marketing',
      owner: 'Marketing Director - Võ Thị E',
      progress: 75,
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
      parentId: 'company-1',
      childrenIds: ['marketing-individual-1', 'marketing-individual-2']
    },

    'marketing-individual-1': {
      id: 'marketing-individual-1',
      title: 'Tăng organic traffic 250%',
      description: 'Phát triển SEO và content marketing để đạt 50K visitors/tháng',
      level: 'individual',
      department: 'Marketing',
      owner: 'SEO Specialist - Nguyễn Văn F',
      progress: 80,
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
      parentId: 'marketing-1',
      childrenIds: []
    },

    'marketing-individual-2': {
      id: 'marketing-individual-2',
      title: 'Đạt 15% conversion rate từ paid ads',
      description: 'Tối ưu hóa các chiến dịch Google Ads và Facebook Ads để tăng conversion',
      level: 'individual',
      department: 'Marketing',
      owner: 'Paid Ads Manager - Lê Thị G',
      progress: 70,
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
      parentId: 'marketing-1',
      childrenIds: []
    },

    // Product Department
    'product-1': {
      id: 'product-1',
      title: 'Cải thiện user experience và retention',
      description: 'Nâng cao chất lượng sản phẩm để tăng user retention lên 85% và giảm churn rate',
      level: 'department',
      department: 'Product',
      owner: 'Product Director - Hoàng Văn H',
      progress: 60,
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
      parentId: 'company-1',
      childrenIds: ['product-individual-1', 'product-individual-2']
    },

    'product-individual-1': {
      id: 'product-individual-1',
      title: 'Giảm 50% thời gian onboarding',
      description: 'Tối ưu hóa luồng onboarding để người dùng mới có thể sử dụng được sản phẩm trong 5 phút',
      level: 'individual',
      department: 'Product',
      owner: 'UX Designer - Trần Văn I',
      progress: 75,
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
      parentId: 'product-1',
      childrenIds: []
    },

    'product-individual-2': {
      id: 'product-individual-2',
      title: 'Ship 3 major features theo user feedback',
      description: 'Phát triển và release các tính năng quan trọng dựa trên phản hồi của người dùng',
      level: 'individual',
      department: 'Product',
      owner: 'Product Manager - Nguyễn Thị J',
      progress: 45,
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
      parentId: 'product-1',
      childrenIds: []
    }
  },
  connections: [
    { from: 'company-1', to: 'sales-1' },
    { from: 'company-1', to: 'marketing-1' },
    { from: 'company-1', to: 'product-1' },
    { from: 'sales-1', to: 'sales-individual-1' },
    { from: 'sales-1', to: 'sales-individual-2' },
    { from: 'marketing-1', to: 'marketing-individual-1' },
    { from: 'marketing-1', to: 'marketing-individual-2' },
    { from: 'product-1', to: 'product-individual-1' },
    { from: 'product-1', to: 'product-individual-2' }
  ]
};