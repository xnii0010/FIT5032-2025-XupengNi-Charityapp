import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './init.js'

/**
 * Register a new user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} name - User's display name
 * @param {string} phone - User's phone number
 * @returns {Promise<Object>} User object with additional info
 */
export const registerUser = async (email, password, name, phone) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: name
    })
    
    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: email,
      name: name,
      phone: phone,
      role: 'user', // Default role
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
    
    return {
      uid: user.uid,
      email: user.email,
      name: name,
      phone: phone,
      role: 'user'
    }
  } catch (error) {
    console.error('Registration error:', error)
    throw error
  }
}

/**
 * Sign in user with email and password
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} User object with additional info
 */
export const loginUser = async (email, password) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      return {
        uid: user.uid,
        email: user.email,
        name: userData.name || user.displayName,
        phone: userData.phone || '',
        role: userData.role || 'user'
      }
    } else {
      // If no Firestore document exists, return basic user info
      return {
        uid: user.uid,
        email: user.email,
        name: user.displayName || '',
        phone: '',
        role: 'user'
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

/**
 * Get current authenticated user
 * @returns {Object|null} Current user object or null
 */
export const getCurrentUser = () => {
  return auth.currentUser
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Callback function to handle auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, get additional data from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          callback({
            uid: user.uid,
            email: user.email,
            name: userData.name || user.displayName,
            phone: userData.phone || '',
            role: userData.role || 'user'
          })
        } else {
          callback({
            uid: user.uid,
            email: user.email,
            name: user.displayName || '',
            phone: '',
            role: 'user'
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        callback(null)
      }
    } else {
      // User is signed out
      callback(null)
    }
  })
}

/**
 * Error message mapping for better user experience
 * @param {string} errorCode - Firebase error code
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/email-already-in-use': 'This email address is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-not-found': 'No account found with this email address.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/invalid-credential': 'Invalid email or password.'
  }
  
  return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.'
}