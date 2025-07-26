import { defineStore } from 'pinia'
import { ref } from 'vue'
import usersData from './users.json'

export const useUserStore = defineStore('users', () => {
  const users = ref([])

  // Load users from both JSON file and localStorage
  const loadUsers = () => {
    try {
      const defaultUsers = [...usersData]

      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')

      const allUsers = [...defaultUsers]
      storedUsers.forEach((storedUser) => {
        if (!allUsers.find((user) => user.email === storedUser.email)) {
          allUsers.push(storedUser)
        }
      })

      users.value = allUsers
      console.log(
        'Users loaded:',
        users.value.length,
        'users (',
        defaultUsers.length,
        'default +',
        storedUsers.length,
        'registered)',
      )
    } catch (error) {
      console.error('Error loading users:', error)
      users.value = [...usersData] // Fallback to default users only
    }
  }

  // Save registered users to localStorage
  const saveRegisteredUsers = () => {
    try {
      // Get only the users that are not in the  JSON file
      const defaultEmails = usersData.map((user) => user.email)
      const registeredUsers = users.value.filter((user) => !defaultEmails.includes(user.email))

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
      console.log('Registered users saved to localStorage:', registeredUsers.length, 'users')
    } catch (error) {
      console.error('Error saving registered users:', error)
    }
  }

  const findUserByEmail = (email) => {
    return users.value.find((user) => user.email === email)
  }

  const findUserById = (id) => {
    return users.value.find((user) => user.id === id)
  }

  const addUser = (userData) => {
    const newId = users.value.length > 0 ? Math.max(...users.value.map((u) => u.id)) + 1 : 1

    const newUser = {
      id: newId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      password: userData.password,
    }

    users.value.push(newUser)

    saveRegisteredUsers()

    console.log('New user added and saved:', newUser)

    return newUser
  }

  const emailExists = (email) => {
    return users.value.some((user) => user.email === email)
  }

  // Authenticate user
  const authenticateUser = (email, password) => {
    const user = findUserByEmail(email)
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return null
  }

  // Get all users for admin purposes
  const getAllUsers = () => {
    return users.value.map((user) => {
      const { password: _, ...userWithoutPassword } = user
      return userWithoutPassword
    })
  }

  const clearRegisteredUsers = () => {
    localStorage.removeItem('registeredUsers')
    loadUsers() // Reload to show only default users
    console.log('All registered users cleared from localStorage')
  }

  // Initialize users on store creation
  loadUsers()

  return {
    users,
    loadUsers,
    findUserByEmail,
    findUserById,
    addUser,
    emailExists,
    authenticateUser,
    getAllUsers,
    saveRegisteredUsers,
    clearRegisteredUsers,
  }
})
