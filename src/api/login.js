import request from '@/utils/request'
export const getCode = () => {
  return request.get('/captcha/image')
}

export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: { captchaCode, captchaKey, mobile } // 当属性名和变量名相同时可以简写
  })
}

export const login = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: { isParty: false, partyData: {}, mobile, smsCode } // 当属性名和变量名相同时可以简写
  })
}
