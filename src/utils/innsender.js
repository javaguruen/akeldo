const DOMAIN_MAP = {
  'ambita.com':    'Ambita',
  'ambita.no':     'Ambita',
  'alice-bob.no':  'Alice & Bob',
  'tietoevry.com': 'Tietoevry',
  'evry.com':      'Tietoevry',
  'evry.cos':      'Tietoevry',
  'broker.no':     'Broker',
  'brokre.no':     'Broker',
  'visma.com':     'Broker',
  'nordea.no':     'Nordea',
  'propware.no':   'Propware',
}

const NAME_PATTERNS = [
  [/ambita/i,     'Ambita'],
  [/alice.*bob/i, 'Alice & Bob'],
  [/tieto|evry/i, 'Tietoevry'],
  [/broker/i,     'Broker'],
  [/nordea/i,     'Nordea'],
  [/propware/i,   'Propware'],
]

export function parseInnsender(raw) {
  if (!raw) return null
  const trimmed = raw.trim()
  const emailMatch = trimmed.match(/[\w.+'-]+@([\w.-]+\.[a-z]{2,})/i)
  if (emailMatch) {
    const canonical = DOMAIN_MAP[emailMatch[1].toLowerCase()]
    if (canonical) return canonical
  }
  for (const [pattern, canonical] of NAME_PATTERNS) {
    if (pattern.test(trimmed)) return canonical
  }
  return 'Ukjent'
}
