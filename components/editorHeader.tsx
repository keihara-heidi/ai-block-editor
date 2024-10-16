import { Editor } from '@tiptap/react';
import { Button } from './ui/button';

const EditorHeader = ({ editor }: { editor: Editor | null }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert table
        </Button>
        <Button onClick={() => editor?.chain().focus().addColumnBefore().run()}>
          Add column before
        </Button>
        <Button onClick={() => editor?.chain().focus().addColumnAfter().run()}>
          Add column after
        </Button>
        <Button onClick={() => editor?.chain().focus().deleteColumn().run()}>
          Delete column
        </Button>
        <Button onClick={() => editor?.chain().focus().addRowBefore().run()}>
          Add row before
        </Button>
        <Button onClick={() => editor?.chain().focus().addRowAfter().run()}>
          Add row after
        </Button>
        <Button onClick={() => editor?.chain().focus().deleteRow().run()}>
          Delete row
        </Button>
        <Button onClick={() => editor?.chain().focus().deleteTable().run()}>
          Delete table
        </Button>
        <Button onClick={() => editor?.chain().focus().mergeCells().run()}>
          Merge cells
        </Button>
        <Button onClick={() => editor?.chain().focus().splitCell().run()}>
          Split cell
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}>
          Toggle header column
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleHeaderRow().run()}>
          Toggle header row
        </Button>
        <Button onClick={() => editor?.chain().focus().toggleHeaderCell().run()}>
          Toggle header cell
        </Button>
        <Button onClick={() => editor?.chain().focus().mergeOrSplit().run()}>
          Merge or split
        </Button>
        <Button
          onClick={() => editor?.chain().focus().setCellAttribute('colspan', 2).run()}
        >
          Set cell attribute
        </Button>
        <Button onClick={() => editor?.chain().focus().fixTables().run()}>
          Fix tables
        </Button>
        <Button onClick={() => editor?.chain().focus().goToNextCell().run()}>
          Go to next cell
        </Button>
        <Button onClick={() => editor?.chain().focus().goToPreviousCell().run()}>
          Go to previous cell
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
