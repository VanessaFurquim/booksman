import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database/database";

export async function getBooks() {
  const allBooks = await prisma.books.findMany();
  return allBooks;
}

export async function getBook(id: number) {
  const singleBook = await prisma.books.findFirst({
    where: { id }
  });
  return singleBook;
}

export async function createBook(book: CreateBook) {
  const newBook = await prisma.books.create({
    data: book
  });

  return newBook;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;

  const finishBook = await prisma.books.update({
    where: {
      id: bookId,
    },
    data: {
      grade,
      review,
      read: true,
    },
  });

  return finishBook;
}