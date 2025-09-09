export const log = console.log;
export const formActionURL = "http://127.0.0.1:3000/api/form";
// Regular expression for email validation as per HTML specification
export const emailRegExp =
  /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;
export const phoneRegExp = /^[\+]?[(]?[0-9\s\-\(\)]{7,15}$/;
export const nameRegExp = /^[a-zA-Z0-9._-]{2,50}$/;

// Security checks for malicious content
export const maliciousPatterns = [
  /<[^>]*>/, // Any HTML tags
  /<script/i, // Script tags
  /<\/script>/i, // Closing script tags
  /javascript:/i, // JavaScript protocol
  /on\w+\s*=/i, // Event handlers (onclick, onload, etc.)
  /https?:\/\//i, // HTTP/HTTPS URLs
  /ftp:\/\//i, // FTP URLs
  /<iframe/i, // Iframe tags
  /<object/i, // Object tags
  /<embed/i, // Embed tags
  /<link/i, // Link tags
  /<meta/i, // Meta tags
  /data:/i, // Data URLs
  /vbscript:/i, // VBScript protocol
  /expression\s*\(/i, // CSS expression
  /url\s*\(/i, // CSS url()
  /@import/i, // CSS @import
  /&#/, // HTML entities (potential encoding attacks)
  /%[0-9a-f]{2}/i, // URL encoding
  /\\x[0-9a-f]{2}/i, // Hex encoding
  /\\u[0-9a-f]{4}/i, // Unicode encoding
];

export const componentList = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

export function isSecureUserName(name = "") {
  if (!nameRegExp.test(name)) return false;

  return !maliciousPatterns.some((pattern) => pattern.test(name));
}

export function validateUserName(name = "") {
  if (!name) {
    return { valid: false, message: "Name is required" };
  }

  if (name.length < 2) {
    return { valid: false, message: "Name must be at least 2 chars" };
  }

  if (name.length > 50) {
    return { valid: false, message: "Name can't exceed 50 chars" };
  }

  if (!nameRegExp.test(name)) {
    return {
      valid: false,
      message:
        "Name can only contain letters, numbers, dots, underscores, and hyphens",
    };
  }

  if (!isSecureUserName(name)) {
    return {
      valid: false,
      message: "Name contains potentially harmful content",
    };
  }

  return { valid: true, message: "Name is valid" };
}

export function isSecurePhoneNumber(phone = "") {
  if (!phoneRegExp.test(phone)) return false;
  return !maliciousPatterns.some((pattern) => pattern.test(phone));
}

export function validatePhoneNumber(phone = "") {
  if (!phone) {
    return { valid: false, message: "Phone number is required" };
  }

  // Check digits only for length validation
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length < 7) {
    return {
      valid: false,
      message: "Phone number must have at least 7 digits",
    };
  }

  if (digitsOnly.length > 15) {
    return { valid: false, message: "Phone number cannot exceed 15 digits" };
  }

  if (!phoneRegExp.test(phone)) {
    return {
      valid: false,
      message:
        "Phone number can only contain digits, spaces, dashes, dots, parentheses, and plus sign",
    };
  }

  if (!isSecurePhoneNumber(phone)) {
    return {
      valid: false,
      message: "Phone number contains potentially harmful content",
    };
  }

  return {
    valid: true,
    message: "Phone number is valid",
    formatted: phone, // Preserves original formatting
    digitsOnly: digitsOnly,
  };
}

export function isSecureUserEmail(email = "") {
  if (!emailRegExp.test(email)) return false;
  return !maliciousPatterns.some((pattern) => pattern.test());
}

// Main validation function
export function validateUserEmail(email = "") {
  if (!email) {
    return { valid: false, message: "Email is required" };
  }

  if (email.length < 5) {
    return {
      valid: false,
      message: "Email must be at least 5 characters (e.g., a@b.c)",
    };
  }

  if (email.length > 254) {
    return { valid: false, message: "Email cannot exceed 254 characters" };
  }

  if (!emailRegExp.test(email)) {
    return {
      valid: false,
      message: "Please enter a valid email address (e.g., your@email.com)",
    };
  }

  if (!isSecureUserEmail(email)) {
    return {
      valid: false,
      message: "Email contains invalid or potentially harmful content",
    };
  }

  // Additional email-specific validations
  const [localPart, domainPart] = email.split("@");

  if (localPart.length > 64) {
    return {
      valid: false,
      message: "Email username part cannot exceed 64 characters",
    };
  }

  if (domainPart.length > 253) {
    return {
      valid: false,
      message: "Email domain part cannot exceed 253 characters",
    };
  }

  // Check for valid domain structure
  const domainParts = domainPart.split(".");
  if (domainParts.some((part) => part.length === 0 || part.length > 63)) {
    return { valid: false, message: "Invalid domain format" };
  }

  return {
    valid: true,
    message: "Email is valid",
    email: email.toLowerCase(), // Normalize to lowercase
    localPart: localPart,
    domainPart: domainPart.toLowerCase(),
  };
}
