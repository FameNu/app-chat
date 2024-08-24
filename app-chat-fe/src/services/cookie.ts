const setCookie = (name: string, value: string, days: number = 1) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  const cookies: string[] = document.cookie.split(';')

  for (const cookie of cookies) {
    if (cookie.trim().startsWith(name + '=')) {
      return decodeURIComponent(cookie.trim().substring(name.length + 1))
    }
  }

  return null
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

export { setCookie, getCookie, deleteCookie }