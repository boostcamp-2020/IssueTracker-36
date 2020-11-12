export default (arr, el) => {
  let temp = [...arr];
  if (temp.includes(el)) {
    temp = temp.filter((item) => item !== el);
  } else {
    temp = [...temp, el];
  }
  return temp;
};
