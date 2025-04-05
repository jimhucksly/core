import { base64 } from '@/utils/base64'

describe('Base64', () => {
  it('Корректно создает base64-строку', () => {
    const value = base64.encode('Hello World')
    expect(base64.isValid(value)).toBeTruthy()
    const result = base64.decode(value)
    expect(result).toEqual('Hello World')
  })
})