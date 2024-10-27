import { ICookie, TExpires } from '@/types/cookies'

class Cookie implements ICookie {
  set(key: string, value: string, expires: TExpires = 'month') {
    let time = 0
    switch (expires) {
      case 'day':
        time = 1000 * 60 * 60 * 24
        break
      case 'month':
        time = 1000 * 60 * 60 * 24 * 30
        break
      case 'year':
        time = 1000 * 60 * 60 * 24 * 30 * 365
        break
    }
    const exp = new Date(new Date().getTime() + time)
    document.cookie = key + '=' + value + '; path=/; expires=' + exp.toUTCString()
  }

  get(key: string) {
    const _key = key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
    const matches = document.cookie.match(new RegExp('(?:^|; )' + _key + '=([^;]*)'))
    if (matches && matches[1] && matches[1].length) {
      return matches[1]
    }
    return null
  }

  delete(key: string) {
    document.cookie = key + '=; path=/; expires=-1'
  }
}

export const cookie: ICookie = new Cookie();