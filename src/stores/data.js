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
      date: '2025-07-25',
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
      date: '2025-07-20',
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
    userRatings,
    getAverageRating,
    addRating,
    hasUserRated,
    getUserRating,
    clearUserRatings,
    reloadUserRatings,
  }
})
