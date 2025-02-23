import { useQuery } from '@tanstack/react-query'
import homeApiRequest from '../apiRequests/home'

export const useAllPages = (lang: 'en' | 'fr') => {
  return useQuery({
    queryKey: ['all-pages', lang],
    queryFn: () => homeApiRequest.allPages(lang),
    // staleTime: 60 * 1000,
    // gcTime: 5 * 1000,
  })
}
