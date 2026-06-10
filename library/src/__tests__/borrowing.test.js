import { canBorrowBook, createMember, createBook } from '../borrowing';

describe('Library Book Borrowing Rules', () => {
  describe('Requirement 1 – Active Membership', () => {
    it('allows borrowing when membership is active', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('rejects borrowing when membership is inactive', () => {
      const member = createMember({ active: false, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Membership is not active');
    });
  });

  describe('Requirement 2 – Book Availability', () => {
    it('allows borrowing when book is available', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('rejects borrowing when book is unavailable', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: false });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Book is not available');
    });
  });

  describe('Requirement 3 – Maximum Number of Borrowed Books', () => {
    it('rejects borrowing when member already has 3 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 3 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Borrowing limit reached');
    });

    it('allows borrowing when member has 2 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 2 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('allows borrowing when member has 1 borrowed book', () => {
      const member = createMember({ active: true, borrowedCount: 1 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('allows borrowing when member has 0 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });
  });

  describe('Requirement 4 – Successful Borrowing (all conditions met)', () => {
    it('allows borrowing when membership is active, book is available, and member has fewer than 3 books', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });
  });

  describe('Requirement 5 – Borrowing Result Message', () => {
    it('returns "Borrowing allowed" when borrowing succeeds', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('returns "Membership is not active" when membership is inactive', () => {
      const member = createMember({ active: false, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.message).toBe('Membership is not active');
    });

    it('returns "Book is not available" when book is unavailable', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: false });
      const result = canBorrowBook(member, book);
      expect(result.message).toBe('Book is not available');
    });

    it('returns "Borrowing limit reached" when member has 3 books', () => {
      const member = createMember({ active: true, borrowedCount: 3 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.message).toBe('Borrowing limit reached');
    });
  });

  describe('Suggested Test Cases', () => {
    it('Test 1: Active member, available book, 0 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('Test 2: Inactive member, available book, 0 borrowed books', () => {
      const member = createMember({ active: false, borrowedCount: 0 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Membership is not active');
    });

    it('Test 3: Active member, unavailable book, 0 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 0 });
      const book = createBook({ available: false });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Book is not available');
    });

    it('Test 4: Active member, available book, 3 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 3 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(false);
      expect(result.message).toBe('Borrowing limit reached');
    });

    it('Test 5: Active member, available book, 2 borrowed books', () => {
      const member = createMember({ active: true, borrowedCount: 2 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });

    it('Test 6: Active member, available book, 1 borrowed book', () => {
      const member = createMember({ active: true, borrowedCount: 1 });
      const book = createBook({ available: true });
      const result = canBorrowBook(member, book);
      expect(result.allowed).toBe(true);
      expect(result.message).toBe('Borrowing allowed');
    });
  });
});
