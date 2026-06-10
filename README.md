# Library Book Borrowing Rules — Unit Tests

## Requirements Tested

All 5 requirements are covered:

1. **Active Membership** — borrowing requires active membership; inactive members are rejected
2. **Book Availability** — borrowing requires the book to be available; unavailable books are rejected
3. **Maximum Borrowed Books** — a member can borrow at most 3 books; tests cover 0, 1, 2, and 3 currently borrowed
4. **Successful Borrowing** — borrowing succeeds only when all three conditions (active, available, under limit) are met
5. **Borrowing Result Message** — the system returns one of four messages: `Borrowing allowed`, `Membership is not active`, `Book is not available`, `Borrowing limit reached`

The 6 suggested test cases from the spec are included as a dedicated `Suggested Test Cases` describe block.

## Testing Framework

**Jest v30** — installed as a dev dependency.

Run with:

```
npm test
```

or

```
npx jest
```

from the `library/` directory.

## Assumptions

- The borrowing logic is a pure function `canBorrowBook(member, book)` returning `{ allowed: boolean, message: string }`
- Factory helpers (`createMember`, `createBook`) are provided to construct test data without coupling to real implementation
- When multiple rejection reasons could apply, the implementation may choose any valid message — each test only verifies its own condition in isolation
- `borrowedCount` represents the number of books the member currently has checked out
- The test conditions (active/inactive, available/unavailable, borrowed count) are independent; no implicit priority order is assumed for rejection messages
