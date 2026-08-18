export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return {
    date: date.toLocaleDateString("uk-UA"),
    time: date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};
