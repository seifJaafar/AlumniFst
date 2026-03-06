export const mockAlumni = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    promotion: 2015,
    company: "Tech Corp",
    position: "Senior Software Engineer",
    sector: "Technology",
    country: "USA",
    city: "San Francisco",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Passionate about building scalable systems and mentoring junior developers. I love solving complex technical challenges and contributing to open-source projects.",
    isMentor: true,
    linkedin: "https://linkedin.com/in/sarahjohnson",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "System Design",
      "Microservices",
    ],
    workExperience: [
      {
        id: "w1",
        company: "Tech Corp",
        position: "Senior Software Engineer",
        startDate: "2020-03",
        endDate: null,
        current: true,
        description:
          "Leading the development of cloud-native applications using microservices architecture. Mentoring junior developers and conducting technical interviews.",
        location: "San Francisco, CA",
      },
      {
        id: "w2",
        company: "StartupXYZ",
        position: "Software Engineer",
        startDate: "2017-06",
        endDate: "2020-02",
        current: false,
        description:
          "Built and maintained web applications using React and Node.js. Improved application performance by 40% through optimization efforts.",
        location: "San Francisco, CA",
      },
      {
        id: "w3",
        company: "Digital Solutions Inc",
        position: "Junior Developer",
        startDate: "2015-08",
        endDate: "2017-05",
        current: false,
        description:
          "Developed front-end features for enterprise applications. Collaborated with cross-functional teams to deliver projects on time.",
        location: "Remote",
      },
    ],
    education: [
      {
        id: "e1",
        institution: "University Name",
        degree: "Master of Science",
        field: "Computer Science",
        startDate: "2013",
        endDate: "2015",
        description:
          "Specialized in Distributed Systems and Machine Learning. GPA: 3.8/4.0",
      },
      {
        id: "e2",
        institution: "University Name",
        degree: "Bachelor of Science",
        field: "Information Technology",
        startDate: "2009",
        endDate: "2013",
        description:
          "Dean's List all semesters. President of Computer Science Club.",
      },
    ],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    promotion: 2018,
    company: "Finance Plus",
    position: "Data Analyst",
    sector: "Finance",
    country: "UK",
    city: "London",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Data enthusiast with a focus on financial modeling and analytics. Experienced in building data pipelines and creating actionable insights.",
    isMentor: true,
    linkedin: "https://linkedin.com/in/michaelchen",
    skills: [
      "Python",
      "SQL",
      "Tableau",
      "Power BI",
      "Financial Modeling",
      "Data Visualization",
    ],
    workExperience: [
      {
        id: "w1",
        company: "Finance Plus",
        position: "Senior Data Analyst",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Leading data analytics initiatives and building predictive models for financial forecasting. Managing a team of 3 analysts.",
        location: "London, UK",
      },
      {
        id: "w2",
        company: "Finance Plus",
        position: "Data Analyst",
        startDate: "2018-09",
        endDate: "2020-12",
        current: false,
        description:
          "Developed dashboards and reports for executive decision-making. Automated data collection processes reducing manual work by 60%.",
        location: "London, UK",
      },
    ],
    education: [
      {
        id: "e1",
        institution: "University Name",
        degree: "Bachelor of Science",
        field: "Economics and Statistics",
        startDate: "2014",
        endDate: "2018",
        description:
          "First Class Honours. Thesis on Machine Learning in Financial Markets.",
      },
    ],
  },
  {
    id: "3",
    name: "Emma Williams",
    email: "emma.w@example.com",
    promotion: 2020,
    company: "Design Studio",
    position: "UX Designer",
    sector: "Design",
    country: "Canada",
    city: "Toronto",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    bio: "Creating user-centered designs that make a difference. Passionate about accessibility and inclusive design practices.",
    isMentor: false,
    linkedin: "https://linkedin.com/in/emmawilliams",
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Accessibility",
    ],
    workExperience: [
      {
        id: "w1",
        company: "Design Studio",
        position: "UX Designer",
        startDate: "2020-07",
        endDate: null,
        current: true,
        description:
          "Designing user experiences for SaaS products. Conducting user research and usability testing to inform design decisions.",
        location: "Toronto, Canada",
      },
    ],
    education: [
      {
        id: "e1",
        institution: "University Name",
        degree: "Bachelor of Design",
        field: "Interaction Design",
        startDate: "2016",
        endDate: "2020",
        description:
          "Graduated with Distinction. Won Best Capstone Project Award.",
      },
    ],
  },
];

export const mockEvents = [
  {
    id: "1",
    title: "Annual Alumni Reunion 2024",
    description: "Join us for our annual reunion gathering with fellow alumni.",
    fullDescription:
      "We are excited to invite you to our Annual Alumni Reunion 2024! This is a wonderful opportunity to reconnect with old friends, make new connections, and celebrate our shared experiences at the university.\n\nThe event will feature keynote speeches from distinguished alumni, networking sessions, campus tours, and a gala dinner. We will also be launching our new mentorship program and showcasing success stories from our alumni community.\n\nDon't miss this chance to be part of something special and contribute to the growing legacy of our alumni network.",
    category: "Reunion",
    date: "2024-06-15",
    time: "18:00",
    location: "University Campus, Main Hall",
    imageUrl:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    organizer: "Alumni Association",
    organizerEmail: "alumni@university.edu",
    capacity: 200,
    registered: 156,
    isOnline: false,
    agenda: [
      { time: "18:00", activity: "Registration & Welcome Reception" },
      { time: "19:00", activity: "Keynote Speech by Distinguished Alumni" },
      { time: "20:00", activity: "Networking Dinner" },
      { time: "21:30", activity: "Campus Night Tour" },
      { time: "22:30", activity: "Closing Remarks" },
    ],
    speakers: [
      {
        name: "Dr. Robert Smith",
        role: "CEO, Innovation Labs",
        topic: "The Future of Technology",
      },
      {
        name: "Prof. Maria Garcia",
        role: "Dean of Engineering",
        topic: "Alumni Impact Stories",
      },
    ],
  },
  {
    id: "2",
    title: "Tech Career Workshop",
    description:
      "Learn about the latest trends in technology and career opportunities.",
    fullDescription:
      "Join us for an interactive workshop focused on advancing your tech career. This session is designed for both current students and alumni looking to break into or advance in the technology sector.\n\nYou'll learn from industry experts about the latest trends in software development, data science, artificial intelligence, and cybersecurity. We'll cover resume building, interview preparation, and networking strategies that have proven successful for our alumni.\n\nThe workshop includes hands-on activities, mock interviews, and one-on-one mentoring sessions with experienced professionals.",
    category: "Workshop",
    date: "2024-05-20",
    time: "14:00",
    location: "Online",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    organizer: "Career Services",
    organizerEmail: "careers@university.edu",
    capacity: 100,
    registered: 78,
    isOnline: true,
    agenda: [
      { time: "14:00", activity: "Introduction & Industry Overview" },
      { time: "14:30", activity: "Panel Discussion: Tech Leaders" },
      { time: "15:30", activity: "Breakout Sessions by Track" },
      { time: "16:30", activity: "Mock Interviews & Feedback" },
      { time: "17:30", activity: "Networking & Q&A" },
    ],
    speakers: [
      {
        name: "Sarah Johnson",
        role: "Senior Software Engineer, Tech Corp",
        topic: "Breaking into Tech",
      },
      {
        name: "Michael Chen",
        role: "Data Analyst, Finance Plus",
        topic: "Data Science Careers",
      },
    ],
  },
  {
    id: "3",
    title: "Networking Mixer",
    description:
      "Connect with alumni from various industries in an informal setting.",
    fullDescription:
      "Our quarterly networking mixer brings together alumni from all industries and graduation years in a relaxed, informal environment. This is your chance to expand your professional network, discover new opportunities, and reconnect with old friends.\n\nThe evening will feature drinks, appetizers, and plenty of time for meaningful conversations. Whether you're looking for career advice, exploring new ventures, or simply want to catch up with fellow alumni, this event is for you.\n\nBusiness casual attire recommended. Bring plenty of business cards!",
    category: "Networking",
    date: "2024-05-10",
    time: "19:00",
    location: "Downtown Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
    organizer: "Alumni Network",
    organizerEmail: "network@university.edu",
    capacity: 150,
    registered: 142,
    isOnline: false,
    agenda: [
      { time: "19:00", activity: "Check-in & Welcome Drinks" },
      { time: "19:30", activity: "Speed Networking Sessions" },
      { time: "20:30", activity: "Open Networking" },
      { time: "21:30", activity: "Closing & Prize Draw" },
    ],
    speakers: [],
  },
];

export const mockOpportunities = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $150k",
    description:
      "We are looking for an experienced frontend developer to join our team.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Leadership skills",
    ],
    postedBy: "Sarah Johnson",
    postedDate: "2024-04-15",
    deadline: "2024-05-15",
    sector: "Technology",
  },
  {
    id: "2",
    title: "Marketing Manager",
    company: "Brand Solutions",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $110k",
    description: "Lead our marketing initiatives and grow our brand presence.",
    requirements: [
      "3+ years marketing experience",
      "Digital marketing expertise",
      "Team management",
    ],
    postedBy: "Alumni Network",
    postedDate: "2024-04-10",
    deadline: "2024-05-10",
    sector: "Marketing",
  },
];

export const mockStats = {
  totalAlumni: 2847,
  totalEvents: 48,
  activeJobs: 127,
  activeMentorships: 89,
  alumniByYear: [
    { year: 2020, count: 450 },
    { year: 2021, count: 420 },
    { year: 2022, count: 480 },
    { year: 2023, count: 510 },
    { year: 2024, count: 145 },
  ],
  alumniByCountry: [
    { country: "USA", count: 850 },
    { country: "UK", count: 420 },
    { country: "Canada", count: 380 },
    { country: "Germany", count: 290 },
    { country: "France", count: 250 },
  ],
  alumniByIndustry: [
    { sector: "Technology", count: 980 },
    { sector: "Finance", count: 650 },
    { sector: "Healthcare", count: 420 },
    { sector: "Education", count: 380 },
    { sector: "Other", count: 417 },
  ],
};

export const mockTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    company: "Tech Corp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "The alumni network has been instrumental in my career growth. I found my current job through a connection I made at one of the networking events!",
    year: "2015",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Data Analyst",
    company: "Finance Plus",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content:
      "Being a mentor in this program has been incredibly rewarding. It's amazing to give back and help the next generation of professionals.",
    year: "2018",
  },
  {
    id: "3",
    name: "Emma Williams",
    role: "UX Designer",
    company: "Design Studio",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    content:
      "The events and opportunities shared through the network helped me transition into my dream career in design. Grateful for this community!",
    year: "2020",
  },
];
