export function paginateData(list, currentPage, pageSize) {

    let totalPages = 0;
    let content = [];
    const contentLength = list.length;

    content = list.splice(currentPage, pageSize)
    const pages = Math.floor(contentLength / pageSize);
    if (contentLength % pageSize === 0) {
        totalPages = pages;
    } else {
        totalPages = pages + 1;
    }
    return { totalPages, content, currentPage };
}