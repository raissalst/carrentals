const titleStringUtil = (stringTitle: string): string => {
  let arrayOfTitle = stringTitle
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase());
  const newTitle = arrayOfTitle.join(' ');
  return newTitle;
};

export default titleStringUtil;
