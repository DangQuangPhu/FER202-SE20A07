export const validateLogin = (email, password) => {
  if (!email.trim() || !password.trim()) {
    return 'Email and password are required';
  }
  
  if (!email.includes('@')) {
    return 'Email must have "@" (e.g., student01@fpt.edu.vn)';
  }

  return null;
};
