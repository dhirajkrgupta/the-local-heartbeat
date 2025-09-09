
let routes = [
  {
    path: "/",
    lazy: {
      Component: async () => (await import("../pages/TownSquare")).default,
    },
  },
  {
    path: "/bulletin",
    lazy: {
      Component: async () => (await import("../pages/BulletinBoard")).default,
    },
  },
  {
    path: "/lostfound",
    lazy: {
      Component: async () => (await import("../pages/LostFound")).default,
    },
  },
  {
    path: "/helpdesk",
    lazy: {
      Component: async () => (await import("../pages/HelpDesk")).default,
    },
  },
  {
    path: "/events",
    lazy:{
        Component: async () => (await import("../pages/Events")).default,
    }
  },
  {
    path: "*",
    lazy: {
      Component: async () => (await import("../components/PostEditor")).default,
    },
  },
];

export default routes;
