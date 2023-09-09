import sanitizeHtml from 'sanitize-html';

import { useCallback, useEffect, useRef, useState } from '#libs/hooks/hooks.js';

import styles from './styles.module.scss';

const sanitizeConfig = {
  allowedTags: ['b', 'i', 'a', 'p'],
  allowedAttributes: { a: ['href'] },
};

const Note: React.FC = () => {
  const [title, setTitle] = useState('Type your title here');
  const [text, setText] = useState('Type your text here');

  const titleReference = useRef<HTMLDivElement | null>(null);
  const textReference = useRef<HTMLDivElement | null>(null);

  const handleCursorPosition = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      const range = document.createRange();
      const selection = window.getSelection() as Selection;
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleTitleChange = useCallback(
    (event_: React.ChangeEvent<HTMLDivElement>): void => {
      setTitle(sanitizeHtml(event_.currentTarget.innerHTML, sanitizeConfig));
    },
    [],
  );

  const handleTextChange = useCallback(
    (event_: React.ChangeEvent<HTMLDivElement>): void => {
      setText(sanitizeHtml(event_.currentTarget.innerHTML, sanitizeConfig));
    },
    [],
  );

  useEffect(() => {
    handleCursorPosition(titleReference.current);
  }, [handleCursorPosition, title]);

  useEffect(() => {
    handleCursorPosition(textReference.current);
  }, [handleCursorPosition, text]);

  return (
    <div className={styles['wrapper']}>
      <div
        contentEditable
        onInput={handleTitleChange}
        dangerouslySetInnerHTML={{ __html: title }}
        className={styles['title']}
        ref={titleReference}
      />
      <div
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: text }}
        className={styles['text']}
        ref={textReference}
      />
    </div>
  );
};

export { Note };
