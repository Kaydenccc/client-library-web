// PASSWORD MATCH
export const isMatch = (password, cf_password) => {
  if (password === cf_password) return true;
  return false;
};

// LENGTH PASSWORD
export const isLength = (password) => {
  if (password.length < 6) return true;
  return false;
};

// VALUE EMPTY
export const isEmpty = (value) => {
  if (!value) return true;
  return false;
};

// FORMAT EMAIL
export const isEmail = (email) => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};
