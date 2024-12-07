import React from 'react';

export const EditorStyles: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <style>{`
        .ProseMirror {
          min-height: 300px;
          outline: none;
        }
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror code {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 0.25rem;
          padding: 0.2em 0.4em;
        }
        .ProseMirror pre {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 0.5rem;
          padding: 1em;
          margin: 1em 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid rgba(255, 255, 255, 0.2);
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
        }
      `}</style>
    </>
  );
};