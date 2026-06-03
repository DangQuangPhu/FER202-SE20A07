// src/utils/authHelpers.js
import USERS from '../data/users'

export function findUser(username, password) {
  // Trả về object user nếu tìm thấy, null nếu không
    return USERS.find(u => u.username === username && u.password === password) || null
}