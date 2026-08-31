export type FormStorageValue<T> = {
  step: number
  formData: T
  timestamp: number
}

const STORAGE_PREFIX = 'rsvp-form-'

export const formStorage = {
  save: <T,>(key: string, data: FormStorageValue<T>): void => {
    if (!formStorage.isAvailable()) return

    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error)
    }
  },

  load: <T,>(key: string): FormStorageValue<T> | null => {
    if (!formStorage.isAvailable()) return null

    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`)
      return item ? (JSON.parse(item) as FormStorageValue<T>) : null
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error)
      return null
    }
  },

  clear: (key: string): void => {
    if (!formStorage.isAvailable()) return

    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`)
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
