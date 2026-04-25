// Centralised query key factory.
// Import and use these everywhere — never write bare string arrays.

export const profileKeys = {
  all: ["profile"] as const,

  // GET /api/users/profile — own full profile
  me: () => [...profileKeys.all, "me"] as const,

  // GET /api/users/:id — public profile of any user
  public: (userId: number) => [...profileKeys.all, "public", userId] as const,

  // Lazy-loaded sections — keyed by userId so own + public share the cache
  experiences: (userId: number) =>
    [...profileKeys.all, userId, "experiences"] as const,
  education: (userId: number) =>
    [...profileKeys.all, userId, "education"] as const,
  skills: (userId: number) => [...profileKeys.all, userId, "skills"] as const,
};
