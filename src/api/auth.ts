import { request } from '@/utils/request'

export interface LoginParam {
  loginType: number // 1: Password, 2: Email Code
  username?: string
  password?: string
  email?: string
  code?: string
}

export interface RegisterParam {
  username: string
  password: string
  email: string
  nickname?: string
  code: string
}

export interface SendCodeParam {
  email: string
  type: number // 1: Register, 2: Login
}

export interface AuthVO {
  token: string
  userId: number
  username: string
  avatar: string
}

/**
 * User Login API
 */
export function login(param: LoginParam) {
  return request<AuthVO>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(param)
  })
}

/**
 * User Registration API
 */
export function register(param: RegisterParam) {
  return request<AuthVO>('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(param)
  })
}

/**
 * Send Email Verification Code API
 */
export function sendCode(param: SendCodeParam) {
  return request<string>('/api/v1/auth/send-code', {
    method: 'POST',
    body: JSON.stringify(param)
  })
}

/**
 * Upload User Avatar API
 */
export function uploadAvatar(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  return request<string>('/api/v1/user/avatar', {
    method: 'POST',
    body: formData
  })
}

export interface UpdateUserInfoParam {
  avatar?: string
  username?: string
  password?: string
  email?: string
  code?: string
}

/**
 * Update User Info API
 */
export function updateUserInfo(param: UpdateUserInfoParam) {
  return request<void>('/api/v1/user/update', {
    method: 'POST',
    body: JSON.stringify(param)
  })
}
