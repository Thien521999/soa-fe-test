/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect } from 'next/navigation'
import { normalizePath } from './utils'

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
  locale?: string
}

type EntityErrorPayload = {
  message: string
  errors: {
    field: string
    message: string
  }[]
}

const AUTHENTICATION_ERROR_STATUS = 401
const ENTITY_ERROR_STATUS = 422

export class HttpError extends Error {
  status: number
  payload: {
    message: string
    [key: string]: any
  }
  constructor({
    status,
    payload,
    message = 'Lỗi HTTP',
  }: {
    status: number
    payload: any
    message?: string
  }) {
    super(message)

    this.status = status
    this.payload = payload
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS
  payload: EntityErrorPayload
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS
    payload: EntityErrorPayload
  }) {
    super({ status, payload, message: 'Lỗi thực thể' })
    this.status = status
    this.payload = payload
  }
}

export const isClient = typeof window !== 'undefined'

let clientLogoutRequest: null | Promise<any> = null

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
) => {
  let body: FormData | string | undefined = undefined
  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body) {
    body = JSON.stringify(options.body)
  }

  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
        }

  if (isClient) {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      baseHeaders.Authorization = `Bearer ${accessToken}`
    }
  }

  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}` : options.baseUrl

  const fullUrl = `${baseUrl}/${normalizePath(url)}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  })

  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload,
  }

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422
          payload: EntityErrorPayload
        },
      )
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        // clientLogoutRequest: xu ly loi call logout 2 lan
        // client
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: null, // Logout sẽ cho phep luon luon thanh cong nen ko can body
            headers: {
              ...baseHeaders,
            },
          })
        }
        try {
          await clientLogoutRequest
        } catch (error) {
          console.log({ error })
        } finally {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          clientLogoutRequest = null
          console.log('chuyen trang full reload')
          location.href = '/login' // chuyen trang full reload
        }
      } else {
        // case 1: Tự động logout khi API bị lỗi 401 ở server component
        // Đây là trường hợp khi chúng ta vẫn còn accessToken(còn hạn)
        // và chúng gọi API ở Next.js server (Route handler, Server component) đến server Beckend
        const accessToken = (options?.headers as any).Authorization.split('Bearer ')[1]
        redirect(`/logout?accessToken=${accessToken}`)
      }
    } else {
      throw new HttpError(data)
    }
  }

  // xu ly interceptor nhu ben axios
  // chi chay o phia client(browser)
  if (isClient) {
    const normalizeUrl = normalizePath(url)

    if ([`api/auth/login`].some((item) => item === normalizeUrl)) {
      const { access_token, refresh_token } = (payload as any)?.result
      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('refreshToken', refresh_token)
    } else if (normalizeUrl === 'api/auth/logout') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }

  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body })
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body })
  },
  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, options)
  },
}

export default http
