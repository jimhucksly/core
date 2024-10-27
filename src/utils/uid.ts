export function uniqueID(len: number, format: string) {
  let result = ''
  let dic = ''
  switch (format) {
    case 'a-z':
      dic = 'abcdefghijklmnopqrstuvwxyz'
      break
    case 'A-Z':
      dic = 'ABCDEFGHIJKLMNOPQRSTUWVXYZ'
      break
    case '0-9':
      dic = '1234567890'
      break
    case 'a-zA-Z':
      dic = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ'
      break
    case 'a-z0-9':
      dic = 'abcdefghijklmnopqrstuvwxyz1234567890'
      break
    case 'A-Z0-9':
      dic = 'ABCDEFGHIJKLMNOPQRSTUWVXYZ1234567890'
      break
    default:
      dic = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWVXYZ1234567890'
  }

  for (let i = 0; i < len; i++) {
    result += dic.charAt(Math.floor(Math.random() * dic.length))
  }

  if (format === '0-9') {
    return Number(result)
  }
  return result
}
