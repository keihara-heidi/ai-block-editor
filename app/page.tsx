'use client';

import BlockQuote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Italic from '@tiptap/extension-italic';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import { useEditor } from '@tiptap/react';

import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import Export from '@tiptap-pro/extension-export';
import Import from '@tiptap-pro/extension-import';
import Mathematics from '@tiptap-pro/extension-mathematics';
import Color from '@tiptap/extension-color';
import Gapcursor from '@tiptap/extension-gapcursor';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';

import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function Home() {
  const editor1 = useEditor({
    extensions: [
      TextStyle,
      Bold,
      Italic,
      Strike,
      Document,
      BlockQuote,
      BulletList,
      OrderedList,
      Paragraph,
      ListItem,
      Gapcursor,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-slate-200',
        },
      }),
      Text,
      Code.configure({
        HTMLAttributes: {
          class: 'bg-slate-600 text-slate-200 p-1 rounded-md',
        },
      }),
      Emoji.configure({
        emojis: gitHubEmojis,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-blue-500',
        },
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Export.configure({
        appId: process.env.TIPTAP_APP_ID,
        token: process.env.TIPTAP_JWT,
      }),
      Import.configure({
        appId: process.env.TIPTAP_APP_ID,
        token: process.env.TIPTAP_JWT,
      }),
      Mathematics,
    ],
    content: String.raw`
      <p><span style="color: #dc2626">Question 1</span></p><h2 class="text-slate-200">Problem title: [title]</h2><h3 class="text-slate-200">Description: [description]</h3><table style="min-width: 50px"><colgroup><col><col></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>Base case</p></th><th colspan="1" rowspan="1"><p>Inductive Step</p></th></tr><tr><td colspan="1" rowspan="1"><p>[base case]</p></td><td colspan="1" rowspan="1"><p>[inductive step]</p></td></tr></tbody></table><p>Conclusion [conclusion]</p><p><span style="color: #2563eb">Question 2</span></p><h2 class="text-slate-200">Problem title: [title]</h2><h3 class="text-slate-200">Description: [description]</h3><table style="min-width: 50px"><colgroup><col><col></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>Cases 1</p></th><th colspan="1" rowspan="1"><p>case 2</p></th></tr><tr><td colspan="1" rowspan="1"><p>[case 1]</p></td><td colspan="1" rowspan="1"><p>[case 2]</p></td></tr></tbody></table><p>Conclusion [conclusion]</p><p></p>
    `,
    editorProps: {
      attributes: {
        class:
          'tiptap min-w-full h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-slate-800 text-slate-200 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  });

  const editor2 = useEditor({
    extensions: [
      TextStyle,
      Bold.configure({
        HTMLAttributes: {
          class: 'text-slate-200',
        },
      }),
      Italic,
      Strike,
      Document,
      BlockQuote,
      BulletList,
      OrderedList,
      Paragraph,
      ListItem,
      Gapcursor,
      Heading.configure({
        HTMLAttributes: {
          class: 'text-slate-200',
        },
      }),
      Text,
      Code.configure({
        HTMLAttributes: {
          class: 'bg-slate-600 text-slate-200 p-1 rounded-md',
        },
      }),
      Placeholder.configure({
        includeChildren: true,
        placeholder: ({ node }) => {
          if (node.type.name === 'detailsSummary') {
            return 'Summary';
          }

          return '';
        },
      }),
      Emoji.configure({
        emojis: gitHubEmojis,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'text-blue-500',
        },
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Color,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Export.configure({
        appId: process.env.TIPTAP_APP_ID,
        token: process.env.TIPTAP_JWT,
      }),
      Import.configure({
        appId: process.env.TIPTAP_APP_ID,
        token: process.env.TIPTAP_JWT,
      }),
      Mathematics,
    ],
    content: String.raw`<p>Prove that $1+5+...+5^{n-1}=\frac{5^n-1}{4}$</p><p></p><p>Prove that the equation $x^2-y^2=10$ has no solution (x, y) such that x and y are both positive integers</p>`,
    editorProps: {
      attributes: {
        class:
          'tiptap min-w-full h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-slate-800 text-slate-200 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  });

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/fillTemplate',
  });

  const onGenerate = () => {
    complete('', {
      body: {
        prompt: editor1?.getHTML(),
        template: editor2?.getHTML(),
      },
    });
  };

  useEffect(() => {
    if (completion) {
      console.log(completion);
      editor2?.commands.setContent(
        String.raw`${completion.replace('```html', '').replace('```', '')}`
      );
    }
  }, [completion]);

  if (!editor1 || !editor2) return null;

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <Tiptap editor={editor1} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} className="flex flex-col gap-2">
              <Tiptap editor={editor2} />
              <Button onClick={onGenerate} disabled={isLoading} className="w-fit">
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </div>
  );
}
