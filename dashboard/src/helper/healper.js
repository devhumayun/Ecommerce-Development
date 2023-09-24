/**
 * Create a time ago function
 */
export const timeago = (date) => {

    const timeUnits = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
      ];
    
      function formatTimeAgo(seconds, idx) {
        if (idx === timeUnits.length) {
          return 'Just now';
        }
    
        const { label, seconds: intervalSeconds } = timeUnits[idx];
        const intervalCount = Math.floor(seconds / intervalSeconds);
    
        if (intervalCount >= 1) {
          const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
          return rtf.format(-intervalCount, label);
        }
    
        return formatTimeAgo(seconds, idx + 1);
      }
    
      const seconds = Math.floor((Date.now() - date) / 1000);
      return formatTimeAgo(seconds, 0);

}


/**
 * Random Password 
 */
export const  generateRandomPassword = (length = 15) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
}