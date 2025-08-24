// Data store for managing charity events and ratings
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataStore = defineStore('data', () => {
  const events = ref([
    {
      id: 1,
      title: 'Indigenous Australian Health Program',
      description:
        'Supporting Indigenous communities with comprehensive health services including mental health support, traditional medicine integration, and community wellness programs.',
      image: '/api/placeholder/400/300',
      category: 'Health',
      rating: 4.5,
      ratings: [5, 4, 5, 4, 4],
      location: 'Northern Territory',
      date: '2025-09-15',
      organizer: 'Indigenous Health Foundation',
      capacity: 150,
      registered: 89,
    },
    {
      id: 2,
      title: 'Community Wellness Event',
      description:
        'Join us for a community wellness event featuring health screenings, traditional healing workshops, and cultural activities for all ages.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.2,
      ratings: [4, 4, 5, 4, 3],
      location: 'Queensland',
      date: '2025-09-22',
      organizer: 'Community Care Network',
      capacity: 200,
      registered: 156,
    },
    {
      id: 3,
      title: 'Mental Health Support Workshop',
      description:
        'Professional mental health support sessions focusing on trauma recovery, counseling services, and peer support groups for Indigenous communities.',
      image: '/api/placeholder/400/300',
      category: 'Health',
      rating: 4.8,
      ratings: [5, 5, 4, 5, 5],
      location: 'Western Australia',
      date: '2025-10-05',
      organizer: 'Mental Health Australia',
      capacity: 80,
      registered: 67,
    },
    {
      id: 4,
      title: 'Cultural Heritage Festival',
      description:
        'Celebrating Indigenous culture through traditional dance, storytelling, art exhibitions, and community bonding activities.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.6,
      ratings: [5, 4, 5, 4, 5],
      location: 'South Australia',
      date: '2025-10-12',
      organizer: 'Cultural Heritage Society',
      capacity: 300,
      registered: 245,
    },
    {
      id: 5,
      title: 'Youth Education Program',
      description:
        'Educational workshops and mentorship programs designed to support Indigenous youth in academic achievement and career development.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.4,
      ratings: [4, 5, 4, 4, 4],
      location: 'Victoria',
      date: '2025-10-18',
      organizer: 'Youth Development Initiative',
      capacity: 120,
      registered: 98,
    },
    {
      id: 6,
      title: 'Traditional Medicine Workshop',
      description:
        'Learn about traditional Indigenous healing practices, bush medicine, and holistic health approaches from experienced practitioners.',
      image: '/api/placeholder/400/300',
      category: 'Health',
      rating: 4.7,
      ratings: [5, 4, 5, 5, 4],
      location: 'Tasmania',
      date: '2025-11-02',
      organizer: 'Traditional Healers Association',
      capacity: 60,
      registered: 52,
    },
    {
      id: 7,
      title: 'Community Garden Project',
      description:
        'Collaborative community gardening initiative promoting sustainable living, traditional food cultivation, and community cooperation.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.3,
      ratings: [4, 4, 5, 4, 4],
      location: 'New South Wales',
      date: '2025-11-09',
      organizer: 'Sustainable Communities Group',
      capacity: 100,
      registered: 78,
    },
    {
      id: 8,
      title: 'Elder Care Support Program',
      description:
        'Comprehensive care services for Indigenous elders including health monitoring, social activities, and cultural knowledge preservation.',
      image: '/api/placeholder/400/300',
      category: 'Health',
      rating: 4.9,
      ratings: [5, 5, 5, 4, 5],
      location: 'Australian Capital Territory',
      date: '2025-11-16',
      organizer: 'Elder Care Foundation',
      capacity: 90,
      registered: 85,
    },
    {
      id: 9,
      title: 'Art and Craft Workshop',
      description:
        'Creative workshops teaching traditional Indigenous art techniques, contemporary art forms, and cultural expression through various mediums.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.5,
      ratings: [4, 5, 4, 5, 4],
      location: 'Northern Territory',
      date: '2025-11-23',
      organizer: 'Indigenous Arts Council',
      capacity: 75,
      registered: 63,
    },
    {
      id: 10,
      title: 'Nutrition and Wellness Program',
      description:
        'Health education focusing on nutrition, cooking traditional foods, diabetes prevention, and maintaining healthy lifestyles.',
      image: '/api/placeholder/400/300',
      category: 'Health',
      rating: 4.6,
      ratings: [5, 4, 5, 4, 5],
      location: 'Queensland',
      date: '2025-11-30',
      organizer: 'Nutrition Health Network',
      capacity: 110,
      registered: 94,
    },
    {
      id: 11,
      title: 'Language Preservation Workshop',
      description:
        'Community initiative to preserve and teach Indigenous languages through interactive sessions, storytelling, and cultural immersion.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.8,
      ratings: [5, 5, 4, 5, 5],
      location: 'Western Australia',
      date: '2025-12-07',
      organizer: 'Language Heritage Foundation',
      capacity: 85,
      registered: 71,
    },
    {
      id: 12,
      title: 'Family Support Services',
      description:
        'Comprehensive family support including parenting workshops, family counseling, child care services, and community networking.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      rating: 4.4,
      ratings: [4, 4, 5, 4, 4],
      location: 'South Australia',
      date: '2025-12-14',
      organizer: 'Family Support Network',
      capacity: 140,
      registered: 118,
    },
  ])

  // Users data for demonstration
  const users = ref([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+61 412 345 678',
      role: 'Community Member',
      location: 'Sydney, NSW',
      joinDate: '2024-03-15',
      status: 'Active',
      eventsAttended: 5,
      lastLogin: '2025-01-15',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+61 423 456 789',
      role: 'Volunteer',
      location: 'Melbourne, VIC',
      joinDate: '2024-01-20',
      status: 'Active',
      eventsAttended: 12,
      lastLogin: '2025-01-14',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+61 434 567 890',
      role: 'Community Member',
      location: 'Brisbane, QLD',
      joinDate: '2024-06-10',
      status: 'Active',
      eventsAttended: 3,
      lastLogin: '2025-01-13',
    },
    {
      id: 4,
      name: 'David Aboriginal',
      email: 'david.aboriginal@email.com',
      phone: '+61 445 678 901',
      role: 'Community Leader',
      location: 'Alice Springs, NT',
      joinDate: '2023-11-05',
      status: 'Active',
      eventsAttended: 18,
      lastLogin: '2025-01-12',
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+61 456 789 012',
      role: 'Volunteer',
      location: 'Perth, WA',
      joinDate: '2024-02-28',
      status: 'Active',
      eventsAttended: 8,
      lastLogin: '2025-01-11',
    },
    {
      id: 6,
      name: 'James Rodriguez',
      email: 'james.rodriguez@email.com',
      phone: '+61 467 890 123',
      role: 'Community Member',
      location: 'Adelaide, SA',
      joinDate: '2024-04-12',
      status: 'Inactive',
      eventsAttended: 2,
      lastLogin: '2024-12-20',
    },
    {
      id: 7,
      name: 'Rachel Green',
      email: 'rachel.green@email.com',
      phone: '+61 478 901 234',
      role: 'Volunteer',
      location: 'Hobart, TAS',
      joinDate: '2024-05-18',
      status: 'Active',
      eventsAttended: 6,
      lastLogin: '2025-01-10',
    },
    {
      id: 8,
      name: 'Mark Indigenous',
      email: 'mark.indigenous@email.com',
      phone: '+61 489 012 345',
      role: 'Community Leader',
      location: 'Darwin, NT',
      joinDate: '2023-09-22',
      status: 'Active',
      eventsAttended: 25,
      lastLogin: '2025-01-09',
    },
    {
      id: 9,
      name: 'Sophie Martinez',
      email: 'sophie.martinez@email.com',
      phone: '+61 490 123 456',
      role: 'Community Member',
      location: 'Canberra, ACT',
      joinDate: '2024-07-03',
      status: 'Active',
      eventsAttended: 4,
      lastLogin: '2025-01-08',
    },
    {
      id: 10,
      name: 'Andrew Smith',
      email: 'andrew.smith@email.com',
      phone: '+61 401 234 567',
      role: 'Volunteer',
      location: 'Gold Coast, QLD',
      joinDate: '2024-08-15',
      status: 'Active',
      eventsAttended: 7,
      lastLogin: '2025-01-07',
    },
    {
      id: 11,
      name: 'Jennifer Lee',
      email: 'jennifer.lee@email.com',
      phone: '+61 412 345 678',
      role: 'Community Member',
      location: 'Newcastle, NSW',
      joinDate: '2024-09-01',
      status: 'Active',
      eventsAttended: 1,
      lastLogin: '2025-01-06',
    },
    {
      id: 12,
      name: 'Robert Traditional',
      email: 'robert.traditional@email.com',
      phone: '+61 423 456 789',
      role: 'Community Leader',
      location: 'Cairns, QLD',
      joinDate: '2023-12-10',
      status: 'Active',
      eventsAttended: 22,
      lastLogin: '2025-01-05',
    },
  ])

  const userRatings = ref(JSON.parse(localStorage.getItem('userRatings') || '{}'))

  const getAverageRating = computed(() => (eventId) => {
    const event = events.value.find((e) => e.id === eventId)
    if (!event || !event.ratings.length) return 0
    const sum = event.ratings.reduce((acc, rating) => acc + rating, 0)
    return (sum / event.ratings.length).toFixed(1)
  })

  const addRating = (eventId, rating) => {
    const event = events.value.find((e) => e.id === eventId)
    if (event) {
      event.ratings.push(rating)
      userRatings.value[eventId] = rating
      localStorage.setItem('userRatings', JSON.stringify(userRatings.value))
    }
  }

  const hasUserRated = (eventId) => {
    return Object.prototype.hasOwnProperty.call(userRatings.value, eventId)
  }

  const getUserRating = (eventId) => {
    return userRatings.value[eventId] || 0
  }

  const clearUserRatings = () => {
    userRatings.value = {}
    localStorage.removeItem('userRatings')
  }

  const reloadUserRatings = () => {
    userRatings.value = JSON.parse(localStorage.getItem('userRatings') || '{}')
  }

  return {
    events,
    users,
    userRatings,
    getAverageRating,
    addRating,
    hasUserRated,
    getUserRating,
    clearUserRatings,
    reloadUserRatings,
  }
})
