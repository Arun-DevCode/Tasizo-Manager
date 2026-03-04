const getInitials = (name) => {
  if (!name) return "?";

  // 1. Trim whitespace and split by spaces
  const parts = name.trim().split(/\s+/);

  // 2. If only one word, return first letter
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  // 3. If multiple words, return first letter of first and last (or second) word
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

export default getInitials;
