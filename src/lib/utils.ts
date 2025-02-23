/**
 * Xoa di ky tu '/' dau tien cua path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}
