export default (arr, el) => {
  const temp = [...arr];
  if (temp.includes(el)) {
    temp.splice(temp.indexOf(el), 1);
  } else temp.push(el);
  return temp;
};
