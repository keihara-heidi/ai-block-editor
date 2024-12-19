import { Editor, EditorContent } from '@tiptap/react';
import 'katex/dist/katex.min.css';
import { useRef } from 'react';
import Bubble from './bubbleMenu';
import EditorHeader from './editorHeader';
import { Button } from './ui/button';

const Tiptap = ({ editor }: { editor: Editor }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-y-auto">
      <div>
        <EditorHeader editor={editor} />
        <Bubble editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button className="w-fit" onClick={() => inputRef.current?.click()}>
          Import
        </Button>
        <Button
          className="w-fit"
          onClick={() => editor?.chain().focus().export({ format: 'md' }).run()}
        >
          Export
        </Button>
        <Button
          onClick={() => {
            console.log(editor?.getHTML());
          }}
        >
          Log as HTML
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(editor?.getHTML() || '');
          }}
        >
          Copy as html
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.readText().then((text) => {
              editor?.commands.setContent(text);
            });
          }}
        >
          Paste as html
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(editor.storage.markdown.getMarkdown());
          }}
        >
          Copy as md
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.readText().then((text) => {
              editor?.commands.setContent(text);
            });
          }}
        >
          Paste as md
        </Button>
      </div>
      <input
        type="file"
        accept=".md"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            editor?.chain().focus().import({ file }).run();
          }
        }}
        ref={inputRef}
      />
    </div>
  );
};

export default Tiptap;
