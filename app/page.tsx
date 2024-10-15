'use client';

import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50}>
              <Tiptap />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <Tiptap />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} className="flex items-center gap-2 p-2">
          <Textarea
            className="w-full h-full"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button>Generate</Button>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
