// src/lib/api.ts
export const authFetch = (url: string, options: RequestInit = {}) => {
  const stored = localStorage.getItem("user");
  const token = stored ? JSON.parse(stored).token : null;

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};
