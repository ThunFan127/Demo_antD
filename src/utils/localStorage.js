// Utility functions để thao tác với localStorage

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('vi-VN')
}

// CRUD operations cho localStorage
export class LocalStorageService {
  constructor(key) {
    this.key = key
  }

  // Lấy tất cả items
  getAll() {
    try {
      const items = localStorage.getItem(this.key)
      return items ? JSON.parse(items) : []
    } catch (error) {
      console.error(`Error getting items from ${this.key}:`, error)
      return []
    }
  }

  // Lấy item theo id
  getById(id) {
    const items = this.getAll()
    return items.find(item => item.id === id)
  }

  // Thêm item mới
  create(item) {
    const items = this.getAll()
    const newItem = { ...item, id: generateId(), createdAt: new Date().toISOString() }
    items.push(newItem)
    this.setAll(items)
    return newItem
  }

  // Cập nhật item
  update(id, updatedItem) {
    const items = this.getAll()
    const index = items.findIndex(item => item.id === id)
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem, updatedAt: new Date().toISOString() }
      this.setAll(items)
      return items[index]
    }
    return null
  }

  // Xóa item
  delete(id) {
    const items = this.getAll()
    const filteredItems = items.filter(item => item.id !== id)
    this.setAll(filteredItems)
    return filteredItems.length < items.length
  }

  // Lưu tất cả items
  setAll(items) {
    try {
      localStorage.setItem(this.key, JSON.stringify(items))
    } catch (error) {
      console.error(`Error setting items to ${this.key}:`, error)
    }
  }

  // Xóa tất cả items
  clear() {
    localStorage.removeItem(this.key)
  }
}