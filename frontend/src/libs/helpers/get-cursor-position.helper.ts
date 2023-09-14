import {
  EMPTY_ARRAY_LENGTH,
  FIRST_ARRAY_INDEX,
} from '#libs/constants/constants.js';

const getCursorPosition = (
  element: HTMLDivElement | null,
  cursorPosition: React.MutableRefObject<number | null>,
): void => {
  if (element) {
    const range = document.createRange();
    const selection = window.getSelection() as Selection;

    let adjustedCursorPosition = cursorPosition.current;

    if (
      adjustedCursorPosition &&
      adjustedCursorPosition > (element.textContent as string).length
    ) {
      adjustedCursorPosition = (element.textContent as string).length;
    }

    if (adjustedCursorPosition) {
      if (element.firstChild) {
        range.setStart(element.firstChild, adjustedCursorPosition);
      }

      range.collapse(true);
      cursorPosition.current = null;
    } else {
      range.selectNodeContents(element);
      range.collapse(false);
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }
};

const changeCursorPosition = (
  cursorPosition: React.MutableRefObject<number | null>,
): void => {
  const selection = window.getSelection() as Selection;
  if (selection.rangeCount > EMPTY_ARRAY_LENGTH) {
    const range = selection.getRangeAt(FIRST_ARRAY_INDEX);
    cursorPosition.current = range.startOffset;
  }
};

export { changeCursorPosition, getCursorPosition };
