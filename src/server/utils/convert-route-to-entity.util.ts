const mapping: Record<string, string> = {
  experiences: 'experience',
  portfolios: 'portfolio',
  projects: 'project',
  skills: 'skill',
  testimonials: 'testimonial',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
