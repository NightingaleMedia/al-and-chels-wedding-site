export type FormStorageValue = {
  step: number
  formData: any
  timestamp: number
}

const STORAGE_PREFIX = 'rsvp-form-'

export const formStorage = {
  save: (key: string, data: FormStorageValue): void => {
    if (!formStorage.isAvailable()) return

    try {
      const fullKey = `${STORAGE_PREFIX}${key}`
      localStorage.setItem(fullKey, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error)
    }
  },

  load: (key: string): FormStorageValue | null => {
    if (!formStorage.isAvailable()) return null

    try {
      const fullKey = `${STORAGE_PREFIX}${key}`
      const item = localStorage.getItem(fullKey)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error)
      return null
    }
  },

  clear: (key: string): void => {
    if (!formStorage.isAvailable()) return

    try {
      const fullKey = `${STORAGE_PREFIX}${key}`
      localStorage.removeItem(fullKey)
    } catch (error) {
      console.error('Failed to clear form data from localStorage:', error)
    }
  },

  isAvailable: (): boolean => {
    if (typeof window === 'undefined') return false

    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  },
}
