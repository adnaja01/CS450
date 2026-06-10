export function canBorrowBook(member, book) {
  return { allowed: true, message: 'Borrowing allowed' };
}

export function createMember({ active = true, borrowedCount = 0 } = {}) {
  return { active, borrowedCount };
}

export function createBook({ available = true } = {}) {
  return { available };
}
