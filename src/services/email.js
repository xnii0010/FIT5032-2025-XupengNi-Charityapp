import emailjs from '@emailjs/browser'

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: 'service_37aoegx',
  templateId: 'template_qn0jt2j',
  publicKey: 'X5OZ3X4zrjEap0vKn',
}

emailjs.init(EMAILJS_CONFIG.publicKey)

const ROLE_DISPLAY_NAMES = {
  user: 'Community Member',
  volunteer: 'Volunteer',
  admin: 'Admin',
}

/**
 * @param {string} userEmail
 * @param {string} userName
 * @param {string} userPhone
 * @param {string} userRole
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendWelcomeEmail(userEmail, userName, userPhone, userRole = 'user') {
  if (!['user', 'volunteer', 'admin'].includes(userRole)) {
    console.warn('Invalid user:', userRole, 'user')
    userRole = 'user'
  }

  const templateParams = {
    user_name: userName,
    user_email: userEmail,
    user_phone: userPhone,
    user_role: ROLE_DISPLAY_NAMES[userRole] || 'user',
    platform_url: window.location.origin,
    if_user_role_user: userRole === 'user',
    if_user_role_volunteer: userRole === 'volunteer',
    if_user_role_admin: userRole === 'admin',
  }

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
    )
    return {
      success: true,
      response,
      message: 'Welcome Email sent',
    }
  } catch (error) {
    return {
      success: false,
      error: error.text || error.message || 'Email Sent Failed',
      details: error,
    }
  }
}

export function getEmailServiceStatus() {
  const isConfigured =
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.serviceId !== 'service_37aoegx' &&
    EMAILJS_CONFIG.templateId !== 'template_qn0jt2j' &&
    EMAILJS_CONFIG.publicKey !== 'X5OZ3X4zrjEap0vKn'

  return {
    configured: isConfigured,
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.templateId,
    publicKeySet: !!EMAILJS_CONFIG.publicKey,
  }
}
