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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

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
        appId: 'pkroq07k',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjkwODI0MjAsIm5iZiI6MTcyOTA4MjQyMCwiZXhwIjoxNzI5MTY4ODIwLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJhNmRkYzQ4My1mM2U3LTRhMTQtOTk4NC1mNDAwOWZjYjc5YWQifQ.XLb7dyrRawJcMTP4bEsDkUKQleiqrqBsKrZkHCHwKRA',
      }),
      Import.configure({
        appId: 'pkroq07k',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjkwODI0MjAsIm5iZiI6MTcyOTA4MjQyMCwiZXhwIjoxNzI5MTY4ODIwLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJhNmRkYzQ4My1mM2U3LTRhMTQtOTk4NC1mNDAwOWZjYjc5YWQifQ.XLb7dyrRawJcMTP4bEsDkUKQleiqrqBsKrZkHCHwKRA',
      }),
      Mathematics,
    ],
    content: `
      <span style="color: #dc2626">Question 1</span>
## Problem title: \[title\]

### Description: \[description\]

<table style="minWidth: 50px">
<tbody>
<tr class="header">
<th><p>Base case</p></th>
<th><p>Inductive Step</p></th>
</tr>
&#10;<tr class="odd">
<td><p>[base case]</p></td>
<td><p>[inductive step]</p></td>
</tr>
</tbody>
</table>

Conclusion \[conclusion\]

<span style="color: #2563eb">Question 2</span>

## Problem title: \[title\]

### Description: \[description\]

"prove using cases insert more column/row if necessary"

<table style="minWidth: 50px">
<tbody>
<tr class="header">
<th><p>Cases 1</p></th>
<th><p>case 2</p></th>
</tr>
&#10;<tr class="odd">
<td><p>[case 1]</p></td>
<td><p>[case 2]</p></td>
</tr>
</tbody>
</table>

Conclusion \[conclusion\]
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
        appId: 'pkroq07k',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjkwODI0MjAsIm5iZiI6MTcyOTA4MjQyMCwiZXhwIjoxNzI5MTY4ODIwLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJhNmRkYzQ4My1mM2U3LTRhMTQtOTk4NC1mNDAwOWZjYjc5YWQifQ.XLb7dyrRawJcMTP4bEsDkUKQleiqrqBsKrZkHCHwKRA',
      }),
      Import.configure({
        appId: 'pkroq07k',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjkwODI0MjAsIm5iZiI6MTcyOTA4MjQyMCwiZXhwIjoxNzI5MTY4ODIwLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJhNmRkYzQ4My1mM2U3LTRhMTQtOTk4NC1mNDAwOWZjYjc5YWQifQ.XLb7dyrRawJcMTP4bEsDkUKQleiqrqBsKrZkHCHwKRA',
      }),
      Mathematics,
    ],
    content: '<p>Hello World</p>',
    editorProps: {
      attributes: {
        class:
          'tiptap min-w-full h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-slate-800 text-slate-200 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  });

  if (!editor1 || !editor2) return null;

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <Tiptap editor={editor1} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Tiptap editor={editor2} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
