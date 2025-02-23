import http from '@/lib/http'

const homeApiRequest = {
  allPages: (lang: 'en' | 'fr') => http.get(`/pages?lang=${lang}`),
}

export default homeApiRequest
