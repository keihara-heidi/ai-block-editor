import { BubbleMenu, Editor } from '@tiptap/react';
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react';
import { Button } from './ui/button';

const Bubble = ({ editor }: { editor: Editor | null }) => {
  return (
    <BubbleMenu editor={editor}>
      <div className="flex gap-2 p-1 bg-slate-700 rounded-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor?.chain().focus().toggleCode().run()}
        >
          <CodeIcon className="w-4 h-4" />
        </Button>
      </div>
    </BubbleMenu>
  );
};

export default Bubble;
