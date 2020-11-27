import { useLocation } from '@reach/router'

export const useSlug = (): string => {
  const { pathname } = useLocation()
  return pathname.replace(/^\//, '').replace(/\/$/, '')
}
