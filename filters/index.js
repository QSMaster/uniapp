import {qff,dateFormat} from "../utils/index.js"

export {
  qff,
  dateFormat
}

// 手机号加密
export function formatPhone(value) {
  if (!value)return value;
  const start = value.substr(0, 3)
  const end = value.substr(-4)
  return start + '***' + end
}

export function encryption(value) {
  if (!value)return value;
  const start = value.substr(0, 10)
  const end = value.substr(-10)
  return start + '……' + end
}

export function eye(value, iseye) {

  if(iseye) return '******'

  return qff(value,2)
}
