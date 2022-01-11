export const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT
export const backendDomain = process.env.NEXT_PUBLIC_BACKEND_DOMAIN
export const userStatusMap = new Map()
userStatusMap.set("enable", "有効")
userStatusMap.set("disable", "無効")
