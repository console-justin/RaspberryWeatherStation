
export const capitalizeFirstLetter = (string) => {
  if (string && typeof string === "string") {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {      
    return string;
  }
};
