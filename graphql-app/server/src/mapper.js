

export const mapBookToGraphQL = book => {

    const mappedBook = {
      ...book,
      qty: book.quantity,
    };

    delete mappedBook.quantity;

    return mappedBook;

};