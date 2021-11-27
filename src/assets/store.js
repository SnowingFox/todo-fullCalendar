import storage from 'good-storage'

export function save(key, val) {
  storage.set(key, val)
}

export function load(key) {
  return storage.get(key, [])
}

export function clearAll(key) {
  storage.clear(key)
}
