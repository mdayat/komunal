function formatISODateString(isoDateString) {
  const isoDate = new Date(isoDateString);
  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const date = String(isoDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${date}`;
  return formattedDate;
}

const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

export { formatISODateString, showFormattedDate };
