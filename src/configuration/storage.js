export function getFromStorage(key) {
    return localStorage.getItem(key)
}


export function writeToStorage(key, value) {
    localStorage.setItem(key, value)
}


export function deleteFromStorage(key) {
    localStorage.removeItem(key)
}

export function clearStorage() {
    localStorage.clear()
}