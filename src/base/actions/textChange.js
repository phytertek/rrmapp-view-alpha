export default (state, value) => {
  const newFieldState = { value };
  return { ...state, ...newFieldState };
};
