/**
 * Utility functions for encoding and decoding visitor data
 * Used for passing data through URL parameters in QR codes
 */

/**
 * Encodes visitor data object to base64-encoded string
 * Excludes large image data to keep URL short for QR codes
 * @param {Object} data - Visitor data object
 * @returns {string} Base64-encoded string
 */
export const encodeVisitorData = (data) => {
  try {
    // Create a copy without image data and empty fields to reduce size
    const dataToEncode = {};
    
    // Only include non-empty fields to minimize URL length
    if (data.companyName) dataToEncode.c = data.companyName;
    if (data.employeeName) dataToEncode.n = data.employeeName;
    if (data.title) dataToEncode.t = data.title;
    if (data.phone1) dataToEncode.p1 = data.phone1;
    if (data.phone2) dataToEncode.p2 = data.phone2;
    if (data.email) dataToEncode.e = data.email;
    if (data.website) dataToEncode.w = data.website;
    if (data.address) dataToEncode.a = data.address;
    if (data.department) dataToEncode.d = data.department;
    
    const jsonString = JSON.stringify(dataToEncode);
    const base64String = btoa(encodeURIComponent(jsonString));
    return base64String;
  } catch (error) {
    console.error('Error encoding visitor data:', error);
    return null;
  }
};

/**
 * Decodes base64 string back to visitor data object
 * @param {string} encoded - Base64-encoded string
 * @returns {Object|null} Decoded visitor data object or null if error
 */
export const decodeVisitorData = (encoded) => {
  try {
    if (!encoded) return null;
    const jsonString = decodeURIComponent(atob(encoded));
    const compressedData = JSON.parse(jsonString);
    
    // Expand compressed keys back to full names
    const data = {
      companyName: compressedData.c || '',
      employeeName: compressedData.n || '',
      title: compressedData.t || '',
      phone1: compressedData.p1 || '',
      phone2: compressedData.p2 || '',
      email: compressedData.e || '',
      website: compressedData.w || '',
      address: compressedData.a || '',
      department: compressedData.d || ''
    };
    
    return data;
  } catch (error) {
    console.error('Error decoding visitor data:', error);
    return null;
  }
};

