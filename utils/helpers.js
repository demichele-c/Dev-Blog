module.exports = {
    // Helper function to format a date as MM/DD/YYYY
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(
        date
      ).getDate()}/${new Date(date).getFullYear()}`;
    },
  
    // Helper function to format a word based on quantity
    format_plural: (word, amount) => {
      if (amount !== 1) {
        // If amount is not 1, return the plural form of the word
        return `${word}s`;
      }
      // If amount is 1, return the singular form of the word
      return word;
    },
  };
  