module.exports = (data, config) => {
  const totalCount = data.length;
  const numberOfPages = Math.ceil(totalCount / config.entriesPerPage);

  const pages = [];
  for (let currentPage = 0; currentPage < numberOfPages; currentPage++) {
    const start = currentPage * config.entriesPerPage;
    const end = start + config.entriesPerPage;
    const res = {
      totalCount,
      numberOfPages,
      currentPage,
      data: data.slice(start, end)
    };
    pages.push(res);
  }
  return pages;
}
