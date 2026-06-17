export const formatDate = (dateString) => {
  if (!dateString) return '';
  // If it's already in DD-MM-YYYY format, return it
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    return dateString;
  }
  
  // Try to parse YYYY-MM-DD
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Also support DD-MM-YYYY format validation or parsing if needed, but standard input type="date" yields YYYY-MM-DD which can be formatted using this function.
export const parseDateForInput = (dateString) => {
    // If it's already YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
    // If it's DD-MM-YYYY, convert to YYYY-MM-DD
    if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    }
    return dateString;
}