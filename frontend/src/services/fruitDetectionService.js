/**
 * Fruit Detection Service
 * 
 * This service can be used to interact with the backend API
 * Currently using dummy data, will integrate with backend later
 */

const API_BASE_URL = 'http://localhost:8000' // Backend URL

/**
 * Upload image and get fruit detection results
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} Detection results
 */
export const detectFruits = async (imageFile) => {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch(`${API_BASE_URL}/api/detect`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to detect fruits')
    }

    return await response.json()
  } catch (error) {
    console.error('Error in fruit detection:', error)
    throw error
  }
}

/**
 * Get detection history
 * @returns {Promise<Array>} List of past detections
 */
export const getDetectionHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/history`)
    if (!response.ok) {
      throw new Error('Failed to fetch history')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching history:', error)
    throw error
  }
}

/**
 * Export results as PDF
 * @param {Object} resultData - The detection results to export
 */
export const exportResultAsPDF = async (resultData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    })

    if (!response.ok) {
      throw new Error('Failed to export PDF')
    }

    return await response.blob()
  } catch (error) {
    console.error('Error exporting PDF:', error)
    throw error
  }
}

/**
 * Export results as CSV
 * @param {Object} resultData - The detection results to export
 */
export const exportResultAsCSV = async (resultData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export/csv`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resultData),
    })

    if (!response.ok) {
      throw new Error('Failed to export CSV')
    }

    return await response.blob()
  } catch (error) {
    console.error('Error exporting CSV:', error)
    throw error
  }
}

export default {
  detectFruits,
  getDetectionHistory,
  exportResultAsPDF,
  exportResultAsCSV,
}
