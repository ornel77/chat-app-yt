export function extractTime(dateString) {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  
  const period = new Intl.DateTimeFormat('fr', {
    // weekday: 'short',
    year: '2-digit',
    month: 'short',
    day: '2-digit'
  }).format(date);
  return `${period} à ${hours}h${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, '0');
}
