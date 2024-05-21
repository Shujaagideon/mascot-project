function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

export { isLoggedIn };
