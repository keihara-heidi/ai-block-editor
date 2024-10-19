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
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  useEffect(() => {
    console.log(process.env.TIPTAP_APP_ID);
    console.log(process.env.TIPTAP_JWT);
  }, []);

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
      Hello world
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
    content: '<p>Hello World</p>',
    editorProps: {
      attributes: {
        class:
          'tiptap min-w-full h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none bg-slate-800 text-slate-200 p-2 rounded-md',
      },
    },
    immediatelyRender: false,
  });

  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const onGenerate = async () => {
    setIsLoading(true);
    const template = editor1?.getHTML() || '';

    try {
      const response = await axios.post(
        '/api/fillTemplate',
        { prompt, template },
        {
          responseType: 'stream',
          onDownloadProgress: (progressEvent) => {
            const chunk = progressEvent.event.target.response;
            editor2?.commands.setContent(chunk, false);
          },
        }
      );

      // Final update after stream ends
      editor2?.commands.setContent(response.data);
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
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} className="w-full h-full flex items-center">
          <div className="w-full h-full p-2">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-full bg-slate-800 text-slate-200"
            />
          </div>
          <Button onClick={onGenerate} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
