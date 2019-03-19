//const API_BASE = "https://api.douban.com/v2/book";
//const API_BASE = "https://douban.uieee.com/v2/book";
const API_BASE = "http://localhost:84/v2/book";

module.exports = {
  API_BOOK_SEARCH: API_BASE + "/search",
  API_BOOK_DETAIL: API_BASE + "/:id"
}
