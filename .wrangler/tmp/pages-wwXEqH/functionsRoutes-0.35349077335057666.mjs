import { onRequestGet as __api_geo_ts_onRequestGet } from "D:\\work\\GitHub\\tenantfig\\functions\\api\\geo.ts"

export const routes = [
    {
      routePath: "/api/geo",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_geo_ts_onRequestGet],
    },
  ]