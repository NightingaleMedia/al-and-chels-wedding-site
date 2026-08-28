const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i

export const isValidHexColor = (color: string): boolean => {
  return HEX_COLOR_REGEX.test(color)
}

export const normalizeHexColor = (color: string): string => {
  const trimmed = color.trim()
  if (isValidHexColor(trimmed)) {
    return trimmed.toUpperCase()
  }
  return '#000000'
}

export const formatHexColor = (color: string): string => {
  return normalizeHexColor(color)
}

export const parseHexColor = (color: string): string => {
  return normalizeHexColor(color)
}
