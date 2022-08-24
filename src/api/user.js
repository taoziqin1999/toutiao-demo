import request from '@/utils/request'

// 验证用户登录
export const loginUser = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
