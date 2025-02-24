// src/utils/phoneUtils.js

/**
 * Formats a phone number to a specific format.
 * @param {string} phone - The phone number to format.
 * @returns {string} - The formatted phone number or the original if invalid.
 */
export function formatPhoneNumber(phone) {
  // Remove all non-digit characters except the leading '+'
  const cleaned = phone.replace(/(?!^\+)\D/g, '')

  // Match the cleaned number to the desired format
  const match = cleaned.match(/^\+(\d{1,3})(\d{3})(\d{3})(\d{3})$/)

  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`
  }

  return phone // Return the original if it doesn't match
}
