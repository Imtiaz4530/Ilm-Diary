const useLimitText = () => {
  const limitText = (text, limit) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + " ...";
  };

  return { limitText };
};

export default useLimitText;
