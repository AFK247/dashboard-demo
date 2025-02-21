export const storeToken = (token: string) => {
  localStorage.setItem("token", token);

  // Store in HTTP-only cookie
  document.cookie = `token=${token}; path=/; max-age=604800;`;
};

export const clearToken = () => {
  localStorage.removeItem("token");

  // Clear cookie by setting expiry to past date
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
};
