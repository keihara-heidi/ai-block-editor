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

import Details from '@tiptap-pro/extension-details';
import DetailsContent from '@tiptap-pro/extension-details-content';
import DetailsSummary from '@tiptap-pro/extension-details-summary';
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
import { useState } from 'react';

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
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsContent,
      DetailsSummary,
      DetailsContent,
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
    content: `
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
      Details.configure({
        persist: true,
        HTMLAttributes: {
          class: 'details',
        },
      }),
      DetailsContent,
      DetailsSummary,
      DetailsContent,
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
    content:
      '<p>Prove that $1+5+...+5^{n-1}=\frac{5^n-1}{4}$</p><p></p><p>Prove that the equation $x^2-y^2=10$ has no solution (x, y) such that x and y are both positive integers</p>',
    editorProps: {
      attributes: {
        class:
          'tiptap min-w-full h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-slate-800 text-slate-200 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const onGenerate = async () => {
    setIsLoading(true);
    const template = editor1?.getHTML() || '';

    try {
      const response = await fetch('/api/fillTemplate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: editor2?.getHTML(),
          template,
        }),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        content += decoder.decode(value, { stream: true });
        editor2?.commands.setContent(content, false); // Stream content update
      }

      // Final update after stream ends
      editor2?.commands.setContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
      editor2?.commands.setContent('Error generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
