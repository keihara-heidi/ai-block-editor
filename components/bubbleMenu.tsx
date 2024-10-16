import { BubbleMenu, Editor } from '@tiptap/react';
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react';
import { Button } from './ui/button';

const Bubble = ({ editor }: { editor: Editor | null }) => {
  return (
    <BubbleMenu editor={editor}>
      <div className="h-full flex gap-1 p-1 rounded-md bg-slate-600 items-center w-fit">
        <Button
          className="min-w-9"
          size="icon"
          variant={'secondary'}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>

        <Button
          className="min-w-9"
          size="icon"
          variant={'secondary'}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>

        <Button
          className="min-w-9"
          size="icon"
          variant={'secondary'}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="w-4 h-4" />
        </Button>

        <Button
          className="min-w-9"
          size="icon"
          variant={'secondary'}
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <CodeIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setColor('#000000').run()}
          variant="secondary"
          className="bg-black hover:bg-slate-800"
        >
          Black
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setColor('#dc2626').run()}
          variant="secondary"
          className="bg-red-500 hover:bg-red-600"
        >
          Red
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setColor('#2563eb').run()}
          variant="secondary"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Blue
        </Button>
        <Button
          onClick={() => editor?.chain().focus().unsetColor().run()}
          variant="secondary"
          className="bg-slate-200 hover:bg-slate-300 text-slate-800"
        >
          White
        </Button>
      </div>
    </BubbleMenu>
  );
};

export default Bubble;
