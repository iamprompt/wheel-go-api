const WHEEL_GO_ACCEPTED_LANGUAGES = ['th', 'en']

export function getActiveLanguage(req: Request): string {
  const { headers } = req
  const headerLanguage = headers['x-wheel-go-language']?.toString()

  if (headerLanguage && WHEEL_GO_ACCEPTED_LANGUAGES.includes(headerLanguage)) {
    return headerLanguage
  }

  return 'th'
}
