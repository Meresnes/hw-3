export const PaginationFilter = (
  curentPage: number,
  totalRes: number,
  ricepsOnPage: number
) => {
  const fullArr = [
    ...Array.from(
      { length: Math.ceil(totalRes / ricepsOnPage) },
      (_, index) => index + 1
    ),
  ];
  let visibleArr: (number | string)[] = [];
  visibleArr = fullArr.filter((page: number | string) => {
    return page >= curentPage - 2 && page <= curentPage + 2;
  });

  if (visibleArr[0] !== fullArr[0]) {
    visibleArr.unshift(1, "...");
  }

  if (visibleArr[visibleArr.length - 1] !== fullArr[fullArr.length - 1]) {
    visibleArr.push("...", fullArr.length);
  }
  return visibleArr;
};
