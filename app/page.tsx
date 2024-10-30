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

import Tiptap from '@/components/tiptap';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
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
import { useCompletion } from 'ai/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export type models =
  | 'gpt-4o'
  | 'gpt-4o-2024-05-13'
  | 'gpt-4o-2024-08-06'
  | 'gpt-4o-audio-preview'
  | 'gpt-4o-audio-preview-2024-10-01'
  | 'gpt-4o-mini'
  | 'gpt-4o-mini-2024-07-18'
  | 'gpt-4-turbo'
  | 'gpt-4-turbo-2024-04-09'
  | 'gpt-4-turbo-preview'
  | 'gpt-4-0125-preview'
  | 'gpt-4-1106-preview'
  | 'gpt-4'
  | 'gpt-4-0613'
  | 'gpt-3.5-turbo-0125'
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-1106'
  | 'claude-3-5-sonnet-latest'
  | 'claude-3-5-sonnet-20241022'
  | 'claude-3-5-sonnet-20240620'
  | 'claude-3-opus-latest'
  | 'claude-3-opus-20240229'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-haiku-20240307';

export const modelsList: models[] = [
  'gpt-4o',
  'gpt-4o-2024-05-13',
  'gpt-4o-2024-08-06',
  'gpt-4o-audio-preview',
  'gpt-4o-audio-preview-2024-10-01',
  'gpt-4o-mini',
  'gpt-4o-mini-2024-07-18',
  'gpt-4-turbo',
  'gpt-4-turbo-2024-04-09',
  'gpt-4-turbo-preview',
  'gpt-4-0125-preview',
  'gpt-4-1106-preview',
  'gpt-4',
  'gpt-4-0613',
  'gpt-3.5-turbo-0125',
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-1106',
  'claude-3-5-sonnet-latest',
  'claude-3-5-sonnet-20241022',
  'claude-3-5-sonnet-20240620',
  'claude-3-opus-latest',
  'claude-3-opus-20240229',
  'claude-3-sonnet-20240229',
  'claude-3-haiku-20240307',
];

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
    <h1 class="text-slate-200"><strong>Clinical Note Template</strong></h1><h3 class="text-slate-200">Subjective</h3><ul><li><p>[Mention reasons for visit, chief complaints such as requests, symptoms etc] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Mention Duration/timing/location/quality/severity/context of complaint] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Mention List anything that worsens or alleviates the symptoms, including self-treatment attempts and their effectiveness] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Progression: Mention describe how the symptoms have changed or evolved over time] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Previous episodes: Mention detail any past occurrences of similar symptoms, including when they occurred, how they were managed, and the outcomes] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Mention Impact on daily activities: explain how the symptoms affect the patient's daily life, work, and activities.] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li><li><p>[Associated symptoms: Mention any other symptoms (focal and systemic) that accompany the reasons for visit &amp; chief complaints] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></li></ul><h3 class="text-slate-200">Past Medical History</h3><table style="min-width: 50px"><colgroup><col><col></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>Section</p></th><th colspan="1" rowspan="1"><p>Details</p></th></tr><tr><td colspan="1" rowspan="1"><p>Contributing factors</p></td><td colspan="1" rowspan="1"><p>[Mention Contributing factors including past medical and surgical history, investigations, treatments, relevant to the reasons for visit and chief complaints]</p></td></tr><tr><td colspan="1" rowspan="1"><p>Social history</p></td><td colspan="1" rowspan="1"><p>[Mention Social history that may be relevant to the reasons for visit and chief complaints.] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Family history</p></td><td colspan="1" rowspan="1"><p>[Mention Family history that may be relevant to the reasons for visit and chief complaints.] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Exposure history</p></td><td colspan="1" rowspan="1"><p>[Mention Exposure history] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Immunization history &amp; status</p></td><td colspan="1" rowspan="1"><p>[Mention Immunization history &amp; status] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></td></tr><tr><td colspan="1" rowspan="1"><p>Other</p></td><td colspan="1" rowspan="1"><p>[Other: Mention Any other relevant subjective information] (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)</p></td></tr></tbody></table><h3 class="text-slate-200">Objective</h3><ul><li><p>[Vitals signs (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li><li><p>[Physical or mental state examination findings, including system specific examination(s) (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li><li><p>[Investigations with results] (you must only include completed investigations and the results of these investigations have been explicitly mentioned in the transcript, contextual notes or clinical note, otherwise you must leave investigations with results blank. All planned or ordered investigations must not be included under Objective; instead all planned or ordered investigations must be included under Plan.)</p></li></ul><h3 class="text-slate-200">Assessment</h3><ul><li><p>[Likely diagnosis (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li><li><p>[Differential diagnosis (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li></ul><h3 class="text-slate-200">Plan</h3><ul><li><p>[Investigations planned (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li><li><p>[Treatment planned (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li><li><p>[Relevant other actions such as counselling, referrals etc (only include if explicitly mentioned in the transcript, contextual notes or clinical note, otherwise leave blank)]</p></li></ul><p>(Never come up with your own patient details, assessment, plan, interventions, evaluation, and plan for continuing care - use only the transcript, contextual notes or clinical note as a reference for the information included in your note.)</p>
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
    content: `First and foremost, what would be helpful for me is what you hope to get out of our conversation today. Right. I'm not really sure. I've thought about that. I was like, I really don't know. Like, Ravi asked me to do this, and I, like, I told her yes, but it wasn't like I really had an agenda. You know what I mean? Mhmm. So and then Ravi was like, well, why? Why are you doing this? I was like, because you asked me to. Like, before, I don't I mean, I don't know. I don't really have, like, anything that I would hope to get out of it other than, I want people to be able to feel like they can relate to me when they watch this, and then maybe they can feel like there's, you know, that there's other people out there like them. So what I thought might be helpful is for me to get a a picture from your perspective, about how life has sort of developed for you over time Mhmm. Starting back from as far back as as you think is relevant. Mhmm. And I might pop in a little question, you know, a couple of questions here and there just so I get a picture not only of what's happened in your life, but, where it's led you right now and then what's actively going on right now. Okay. Maybe ask me, like, a few more questions because that's gonna be like It's a very big question. It's a huge question. Yeah. So let's just say you were to start with a new therapist. Right. If I were to see you for the first time, what would you tell me about your problems, about what you can do for yourself? How they always start off. It's like, tell me what's going on. Yeah. You know what I mean? I was on and I thought about that too, and I really don't have anything to tell you about what's going on. I I feel like if we're, I mean, if we're gonna go in the direction of, like, a personality disorder, like, I feel like things are a lot better than they used to be. In New York, I was a comp like, not that I'm not a disaster, but I was I was just, like, an overt disaster. Like, you just had to look at me to know that there was something wrong. Whereas now I, I'm not trying to kill myself every other day or, like, pretending to try to kill myself or talking about killing myself or cutting myself open or any of those things. I think, you know, I think I'm much more capable now of you know, before, I I would describe myself as a turtle without a shell. Mhmm. So that's how I felt. Like, very raw. And now I would say that I have a shell. So I would say that that's it's nice to know that there's an improvement there, because, you know, it doesn't feel like that's gonna happen. And for a long time, it didn't feel like that was gonna happen. For a long time, I just wanted to die, and I don't have that anymore. So that's I'm sure. Yeah. It's probably very relieving. I mean Sometimes? I don't know. It's not that it's, like, one thing or the other. It's just like It just is. It just is. Yeah. So you've been you said before. What what was before? When are you referring to? So my I think, like okay. So my dad died in 2,010 at the end of 2,010. And then, in 2,011, I was just sort of, like, just like, there's this book, The Year of Magical Thinking by Joan Didion, and she talks about how she doesn't dream and she doesn't feel anything and just sort of, like, that's sort of how that was. And then by the holidays of 2,011, I just I I'm not gonna say I had, like, a psychotic break, but, like, it seemed like it was it was in that direction. Like, my handwriting got really sloppy, and, like, I wrote down in my journal, like, I'm afraid that if I had a baby, I would kill it. Like, that's pretty dramatic. And then I told my boss that I did that. So, like, it was just like there was And then I told my boss that I did that. So, like, it was just like, there was no, like, rational functioning there. You know what I mean? Can you imagine what my boss thought, like, to tell him something like that? I was, like, cutting my wrist open, and, like, I had my own office at the I was working in finance as an I had my own office there. And so I would I would sit at my desk, and I would just, like, cut my wrist. It was it was traumatic to say the least. And, yeah, so and that went on for probably 2,012. I was hospitalized, like, no less than 6 times, like, no less than that. And it was, like, every month for, like, at least 2 weeks. And then, 2,013, I think I was a little bit more chill, but super depressed. And then 2,014, a little bit I don't I mean, honestly, when I got to LA, things got a little bit better. I don't know why. So maybe because there's it's, like, less people. You know, bit better. I don't know why. So maybe because there's it's, like, less people. You know, in New York, it's just, like, people on top of people on top of people. And then I, you know, I had, you know, friends that, you know, we were all drinking a lot, so that probably didn't help. And when when I got to LA, like, I had so many other things that I had to focus on, like, that I I guess I just got out of my head. It was, like, really the first time that I wasn't always just thinking about how, like, I just, like I I guess I just got out of my head. It was, like, the first time I really wasn't thinking about when awful you know, just all that stuff. And that was in 2,015? I got to LA in 2,000 and, yeah, 2,000 15. Yeah. 2,015. Okay. To rewind a second, you were feeling psychotic, depressed, cutting. How do you understand that? What do you mean? Do you have any theories about why that was happening? I mean, we've read about it. So, like, I guess it when you're cutting, it releases, endorphins. Am I wrong? I mean, for some people, it it does. Yeah. People have all sorts of reasons why they might might be cutting, why they might feel depressed, why they might have what you're describing is whether it's psychotic or not, but thinking that feels really, not in line Yeah. With your typical cognitions. Right. Do you have any theories about for you what forget about what you've read Yeah. About why that was happening at that point. I it was like this it was the only thing that made me feel better. And, like, I would it took a long time for me to just stop fantasizing about cutting myself. And the only reason I did stop initially, if you were to look at my arms, like, it's it's like this it's just cuts everywhere, and that's hard to hide. So I could only wear, like, long sleeve shirts. Sometimes people hide their cuts Yeah. You know, by cutting on their upper thigh Right. Or other places. It's I think I just wanted it's I know I know that when I would think about stuff like that, like, well, why don't I just try to hide this better? It was a way of, like, punishing myself too. So and I this is a, like, conscious a conscious, like, decision where it was sort of like, it makes me feel better, and I'm doing it on my arms because I I it's like it's just this way of, like, punishing myself. But at the same time, it just felt better. I felt so much better when I would cut myself. Sometimes when people cut their arms, there's also a way in which they can relay information to other people that they can't do whatever they say. Right. Right. And I'm not sure if that matches your experience at all. There might have been. Yeah. There might have been. Because I would do, like, sick things, and I would just like yeah. I was yeah. There's probably and when I say probably, definitely an element of that. But that's, like, embarrassing to think about, and I hate that I that I would do that. And I wouldn't do that now, but I definitely it was sort of like, look what you've done to me. Look what you've made me do to myself. You know? And the look what you made me do to myself would be geared towards Boyfriends, things like that. You know? So were were boyfriends at that point in and out of your life or a boy? Yeah. I would say so. I don't the guy that I started dating right after my dad died, like, I feel terrible for him because he had to go through that whole situation. And, that's when I was diagnosed with borderline personality disorder, and nobody really what it was. I mean, people know what it but, like, I wasn't aware of what it was too much, and he definitely wasn't. And, it was just a lot for him to have to go through. And I I guess because my father had died, I sort of latched on to him a little bit. And then and he was so, so, so, so, so great about, like, everything, but he's just sick. Like, the whole thing was just so sick. So Like, sick, like and there's, like and it like, I was, like, mentally ill, not, like, sick in a good way. I guess people say that. You know what I mean? Like, I don't mean it that way. I mean, they're mentally ill. Totally understand. Yes. What's this guy's name? Thomas. Okay. Yeah. When did you meet him? 2 1011. Yeah. So your dad passed in 2,010. At the end of 2010. Right? Okay. And were you dating anyone at that point? No. No. So is Thomas the first serious boyfriend? No. I've had no. There's probably, like, 5 or 6 serious boyfriends. I don't know. Prior to that point? Or Let's have to think for a second. Definitely the first serious boyfriend in New York. Oh, no. Yeah. No. No. The, like, the serious boyfriend before that was Vijay, but, like, he was, like, my best friend afterward for, like, quite a while. In fact, I, like, talked about him in the, like, the last session. So, we dated for a long, long, long time. Like, we knew each other in high school, and then, we started dating when I lived in Austin. And then we went to Japan, and we were living in Japan together. And then, I moved to New York while he was still in Japan, and then we broke up. So When did you break up? What year? 2009. So right before your dad passed? I wouldn't say right before. I wouldn't say right before. I, like, I was still in New York, and he was in Japan. And I don't think he really gave enough credit to the, like, the time difference. It's, like, 12 hours, 13 hours, and then depending on, like, where you are with, daylight saving daylight savings time. So but he was he was super special to me. So, he was there for me, like, when my when my dad died to a certain extent. So I don't know. That's I don't know what to say about that. Yeah. Before 2010 when your dad passed away, were you having any other Yeah. Every holiday. This is where you're like, those kind of things, right, where, like, I wanna hurt myself or, like, I'm acting out, like, every holiday. You did a great job of finishing my son. Sorry. You did a great job of doing it. Well, I mean, I figured you were going there. I didn't think you were gonna ask me to go shopping. You know, but it's helpful to get a picture of how life has sort of gone for you and the trajectory of how things have gone. Mhmm. So it sounds like there's a long history of self harm or cutting. During the holidays. Yeah. Definitely during the holidays. Do you remember when it started? Yeah. Actually, it was it was my mom used to, be pretty pretty aggressive with me. And so, yeah, she was like, she would she would, like, hit me and stuff, and then I wrote about it in this thing that I believe your predecessor actually published. So John Gunderson? Yeah. Yeah. Yeah. So she would she would, like, scream it. She would, you know, just, like, typical, like, you know, not, you know, not just not healthy stuff. And so I would be in my room, and I would, like, grab my, my arms. And then, like, after she was done screaming and she would leave, like, I would, like, look at my arms, and, like, I would hope that there would be, like, a deep enough indention from my nails that I could have made myself bleed. So that's definitely how it started. And then after that, like, when I was in my twenties, like, the holidays were always really hard, and I would just that's when I that's when it really started. Mhmm. So Do you know what Mhmm. So Do you know what prompted the initial that transition from scratching yourself to cutting? I just remember it was, like, the holidays. It was always the holidays aren't my What's hard about the holidays? Well, because people have families, and, I feel like I it's kind of, like, self pityous of me to, like, go into this whole thing or whatever, but I guess I've always wanted to have, like, a family, like, a real family, you know, like, the kind that people don't actually have, but, like, you envision. You know? Like, the kind that's, like, in the TV shows and stuff. Like, I've always wanted that. And, never had it, obviously. And then so and then people, I mean, it's a generalization here, but most people aren't, like, super happy around the holidays anyway. You know what I mean? It's stressful, and there's all this other stuff that's going on and people, you know, with their own family stuff. But, like, in my mind, like, it's just this time where I'm being reminded that I don't have those things. Like, I don't have, yeah, I just don't have those things, and it's hard for me. I've gotten better about it. Mhmm. I mean, like, even with, like, my boyfriend now, I was like, you need to know that I'm gonna turn into a raging bitch for the next month. So maybe we should break up. Maybe we should just do this right now and get back together on January 2nd. That's actually literally something I said to him. What happens now on the holidays for you? I I mean, it's not so bad right now. I don't know why. Maybe because I'm not quite as crazy as I used to be, but it's Shayan now. I feel so bad. I wish we had, like, honey for her or something. I feel so bad. She probably is gonna, like, beat herself up about this too. Nah. She'll be she'll be I'll just Okay. 2 seconds. Yeah. Sorry. Yeah. Sorry about that. No. You're fine. No. You're fine. It's like the little things. Right? Really to wait outside. You said you're not so crazy. You by the way, you're very judgmental about yourself. I'm sure. I'm with the first person who was who was so funny. Yeah. It's like a DBT thing. Like, don't judge. Like, don't judge yourself. Right? Yeah. But I I mean, I'm just being I mean, it was a little some of the things I did were a little out there, so I wouldn't do those things now. So I can look back and be like, I'm not gonna say that it was crazy because that's a derogatory term, and it doesn't really help any of us that have been diagnosed with this because there is this stigma. I'm sorry if you guys hear my stomach. I'm so sorry. There's a stigma attached to it, and I I don't like it when people use the word crazy, so I shouldn't use it with myself. I'm just being casual right now. But yeah. If if we back up just a second, though, to get a picture of your family, you said I wanted that, you know, family you see on. I don't know if it's necessarily The Brady Bunch that that was a merged family. Right. Right. So yeah. So But the concept? Right. Who was in your family growing up? It was my dad and my mother and myself. My dad was married before my mom, and he had 3 children with that marriage, but, like, they were older than my mother. Mhmm. So and they didn't like each other at all. That means my dad had cheated on his first wife with my mom, and then his first wife had died, and then he married my mom. So I was like, not only was there, like, that involved, but then, like, of course, his, like, initial three children were kind of like, oh, great. Like and then they had me, and that wasn't, you know, like, my dad was 55, I think, when I was born, and my mom was 26. So there was, like, an age difference there. Mhmm. And, I don't think she should have had children, honestly. I don't. Because? Well, because, like, she's she wasn't a good mother for first of all. I don't she didn't wanna have a child. She wanted to have, like, this advocate or this ally or this best friend or something. She definitely didn't know that having a child is, like, I don't know, about nurturing something. You know what I mean? Like, these things that some people just sort of, like, take for granted she doesn't know how to do, and she still doesn't know how to do it. And my dad probably just gave her a child just to, like, as a consolation prize or something. I don't know. But, like, I can tell you this that I am concerned about myself having a child if that ever were to happen because I would hate to pass, like, what I went through onto a living creature. Because there were times where, like, I would I would, like, just scream out loud and just, like, scream out loud just like, why was I born? You know what I mean? Like, why? Like, why? Why? This is not this is not okay. Mhmm. Like, they shouldn't have done that. Nobody should do that to another human being. Yeah. So Yeah. Were you close with your dad? Mhmm. What was he like? He was nice. Yeah. He was nice. I think, in retrospect, should have probably protected me a little bit more from what my mom was doing, but he was just sort of, I don't know why he didn't, honestly. But that's something that I've only come to realize, like, in the past, like, 2 or 3 years. You know? So you were how old when he passed away? 29. Was it sudden? Well, he was older. So I I got that. Yeah. I mean, it was sudden and so much that I he had gotten sick, and he had gone in for a surgery. And I was, in New York, and my mom and I hadn't been talking, honestly. And then I get this, like, email saying that, like, my dad's gonna die or whatever. And I was like, okay. So I get, like, on the first flight to Texas, and thank god he got through that one. And I thought because he was able to get through that surgery that he would live for, like, at least another five years. Mhmm. And I told that to one of my friends. I was like, oh, no. He's gonna be alive for another 5 years. 2 months later, he's dead. And that was like that sucked because after that last second to last surgery Do you mind if I grab the tissues? No. It's okay. It's okay. I have, like, so much eye makeup on. I'm never gonna allow this to, like, just, like, spider down my face. Well, you know, it's always helpful to have one. Yeah. Okay. Thank you. You would love to. After I didn't he he couldn't all of after that with the anesthesia, and he was older, so he he wasn't even supposed to live through it. So the fact that he bounced like, didn't bounce back, but sort of bounced back but was able to live. So he, he couldn't really hear, and he couldn't, like, walk, and he couldn't, like it was just sort of like this, and I would call him. And this is the part where, like, I really started to beat myself up. This is actually probably like, I didn't I wanted to die for a lot of reasons, but the main reason I wanted to die was because I wanted to see my dad again, and I wanted to apologize. Like, I had told him I would call him. And I was in the back of a taxi, and I was like I was just like I just told him I would call him, and I was like, I'll call you next Tuesday. And I didn't call him that next Tuesday, and I didn't call him the Tuesday after that. I didn't call him the Tuesday after that. And then he died. So, like, when I say, like, when I got to LA, like, that's what I stopped beating myself up about because I had other things I had to think about. So that was that was, like, That was hard. But that's my own fault. Like, I did that. Like, I shouldn't have done that. I should have called him. But I just didn't I didn't know. Like, I'd never really lost anybody before. I mean, I had like, I lost people, but I didn't give a fuck about them, honestly. Like, my half sister had died. I don't care. Like, my grandmother had died. I don't Like, my half sister had died. I don't care. Like, I don't. Like but, like, I did care about my dad, and I should have treated him better, and I didn't. Because I didn't know. Like, I just didn't know. And now I know. Now I know. So, like, I'm a lot more careful now when I tell people I'm gonna call them. I definitely call them, or I'm more careful about, like, saying, like, I love you a lot or just being more appreciative of, like, the experiences that I'm having. I think it's really hard to confront emotional situations, especially given how important your dad was for you. And avoidance is pretty powerful. Yeah. How am I avoiding it, though? Not No. Tell me. Tell me because I need to know. Like, I don't No. I'm not I'm not suggesting you're avoiding now, but I think there's a way our minds allow us not to address painful things. So if you found yourself not calling him and you're sort of kicking your own ass for that for whatever reason, avoidance is one of these ways to protect ourselves from dealing with painful things like the fact that your dad was really sick. It was I mean, he couldn't hear me when I would call, and so I was it was just hard. You're right. I mean, it's not that I didn't think about calling like I did. I thought about it all the time, but it just he couldn't hear me. He'd be like, what? What? What? So I had bought these postcards, and I was just gonna send him postcards every week. But and so I was in my office, and, like, they were just, like, New York postcards, and I sent 1. And then I had another one ready to get sent, and I think I sent that one, but he wouldn't have gotten it on time. He probably he wouldn't have. I don't know. I just wish I'd been a better daughter. Like, I really, really wish I'd been a better daughter. It sounds like you did the best that you could at that time. Right. And I know that that's, I know that that's something that we all say to each other and especially in therapy, but, like, I should have been better. And I don't that's a judgment. Right? But, like, it should have. And aren't we all doing the best that we can do at any potential time? Like, aren't we? If we're being honest, like, aren't we? Like I would I I would hope so. Yeah. But regardless of whether it's a therapy thing or not, it sounds like you actually did do the best that you could do. You were trying to communicate with with him with postcards in a way that you could tolerate and that he could, connect with you around. Yeah. I mean, I again, I should have done better, but, yeah, you're right. You're really, hell bent on self condemnation. Maybe. Yeah. I guess. Right? I don't know. Maybe. Yeah. You don't let yourself off much easily. Yeah. I guess that's what I was told in the last one of these. But what do you make of that? I mean, it's interesting. I wonder what other people are like with themselves. Like, honestly, like, what is it like to be other people? Like, I feel like I'm not, like, being, like, super hard on myself. I'm just being honest. You know? Mhmm. Like, I don't know what it's like for other people. Like, do they just, like, pat themselves on the back when they, like, get out of bed in the morning? Sorry. Well Although yesterday, the number patting myself on the back. The number of possibilities that might exist in between the two are remarkable, but I'm not sure you even allow yourself to think about them. I hope that I learn to them. I don't mean to be I don't mean to be, like, sarcastic. I do hope that No. I I take it as sarcastic. But, you know, there's it feels like there are sort of segments of your life, your, you know, early life where you had this Disruptive. Challenging family dynamic, where you felt very, I think, closer certainly to your dad than your mom, but then lost your dad at a pretty critical developmental stage. You know, it's usually when people start developing their own identity in their late teens, in their early twenties, and that loss was pretty significant. It doesn't mark the the first time that you were self harming or suicidal, but it sounds like it just escalated everything that was preexisting and you felt pretty out of control. Definitely. Definitely. Yeah. So if he passed in 2,010, you moved to LA in 2015, and what you keep saying is in the last few years, I've been a lot better. Mhmm. What do you what do you mean by a lot better? I was I mean, not being in New York probably helped because there was just sort of this chaotic situation. And, but when I moved to LA, like, everything was everything was a mess. Like, I I didn't have the ability to to regurgitate in my brain everything that I had done wrong. I just had to, like, move forward. And so and probably, like, the new environment as well, like, the new studying and just not knowing anybody and, just having to get back on my feet again and literally and figuratively and just sort of, like, trying to, you know, just trying to get ahead against, I guess, I didn't have the opportunity to feel sorry for myself or to think about everything that had happened or I would fantasize. I've I said this before. Like, I would fantasize about things that I would do differently. Like, that was something that I would just, like it made me feel better. Like, I would be in bed at night and it but it wouldn't have been with, like, my father. It would have been, like, like, early on. Like, I would be if I could be who I am right now and just be, like, a baby. You know what I mean? And just be, like, this adult and, like, this baby's body. And I would I just would have, like, just gotten through everything when I was a kid, and I just would have done as well as I possibly could have in school, and I just would have gotten the fuck away from my mom as soon as I possibly could. And I would have, like I would have known to, like, communicate with my father better and all of these things. So that would, like I would fantasize about that. But, again, I've stopped doing that, so that's good. That's progress. I agree with you. Why do you think it's progress? Well, this is so silly that I read this, but it was basically, like, if you keep not you, but if a person doesn't forgive themselves, which up until I read that, I would have been like, forgive yourself. You know what I mean? It's just like so hoity. Hoity, hoity, hoity. You better Especially when you like to condemn yourself. Yeah. I know. Usually, it's a very awkward thing to do is to forgive yourself. Yeah. And I felt like it was just so, like, whatever. But then I was like, but the idea of, like, dooming myself to repeat the same, you know, the same mistakes, I was like, oh god. No. Like, I'll forgive myself. Like, we'll do this. Like, I'm gonna make a little shrine to myself, like a little thing, a little cathedral, and I'll forgive myself. To myself, like, a little thing, a little cathedral, and I'll forgive myself. And I, like, mentally said that to myself. Like, it's okay. You know what I mean? I just said it was okay. Like, it's okay. And, magically, I've stopped fantasizing about how I'm gonna do everything over again. So You know, if I was purely thinking in DBT, that would be called acceptance. Oh, yeah. We could do this. We can talk in DBT. We can talk in that language. I'm sure you could. Yeah. No. We could talk in DBT. DBT was helpful actually. Like, the self soothing, like, that kind of stuff. Like, that really helped, like, getting that into my brain. You know what I mean? Like like, touching, like, comfy thing. Like, you have that blanket out there. I was like, oh my Like, that's it's like soft and cuddly. Yeah. Exactly. Like, I can pet it. Yeah. Like, taking baths, lighting candles, the whole thing, which was just, like, you know, a novel concept to me at those points. It's called being kind to yourself. That's part of DBT. Yeah. I mean, that's nice. Right? It's a thing. It's a thing. It's a thing. It's a thing. Apparently, it works. So you did do DBT. Mhmm. I did do it. And it did help. Yes. Okay. What about the last several years? Well seeing a therapist? No. I no. No. And, you know, my friend the other night, was like, you should see a therapist. And I was like, I am sorry. But, like, I've had so much therapy. I've had so much. You can talk the talk, that's for sure. Yeah. It's so much therapy. And it's not to say that I wouldn't, like, appreciate it, but, like, I mean, I was like, what what am I sorry. I was he I used to tell him. I used to advocate for therapy. I'd be like, Eric, you should do this. You should have a therapist. Like, it's gonna help you so much. And so he's, like like, giving me that whole thing the other night at dinner. Like, no. You should do it. And I was like, what what are they gonna tell me that I don't already know? Like, seriously. Mhmm. I get I'd say, sorry. I don't mean to be, like, you know Well, what made him suggest it in the first place? I don't know. I because we were talking about how he doesn't have like, he has an online therapist or something like that. And so I hear people do that every night. I was like, wow. What's that like? Is it, like, talking to Siri and telling her what your problems are? Like, hi, Siri. This is what's going on today. But he said I mean, he said he likes it. It seems kind of I don't know. It seems kinda weird. But So he's talking about his therapy. Why would he make that suggestion for you? Because I had just, like, been so 100%, like, you need to get a therapist, Eric. Like and now I mean, so he was I don't know why he made that. Maybe Is he just suggesting that for to everybody he has? Have no idea. I don't know what. Maybe something at dinner like that. Maybe he thought that I was, like, unhinged. I'm not sure. Maybe the fact that I went and got super drunk. I don't know. What happened? I got super drunk. I got super drunk. You just got super drunk. I went home and super drunk. To sleep? Yeah. I got super, super drunk. We were, we were at this place called Upstate, which I like, and I used to go there a lot when I was living in New York. And then I was just, like, downing the wine, and he had said, like, I have a problem with blacking out. It's a pretty big problem. Okay. And he was like he said something about how it's, like, directly correlational to how fast I drink, you know, something like that. And I was like, yeah. I know. But, like, I I had a hard day, and don't really remember too much after, like, we left upstate. And then we ended up at a strip club Mhmm. At this which I don't frequent. So it was kind of like, I don't even know how we got there. And then I, like, I came to not to say I came to, but, like, I was in a blackout. Right? So I don't really know what's going on. And then all of a sudden, like, I'm like, I realized that I'm in a changing room, you know, like, in the back somewhere, and I don't have my wallet, and I don't have my phone, I don't have my purse, and I have no idea how I got there. And I was like, this is why I shouldn't drink. I remember having that that moment. Like, you know what I mean? I was, like, thinking that, like, this is why I shouldn't drink. This is why people tell people not to drink. And then 2 bouncers came up, and they were like, are you Charlotte? And I was like, yes. And then they took me out of that area and And I was like, yes. And then they took me out of that area, and I saw Eric, and he was, like, sitting there at the bar with, like, my purse and everything. And I was like, oh, yay. Probably drank more. I don't know. And then got back to the apartment that I'm staying at and, don't really remember too much of that either. So So as you're telling me this story, lots of smiles. Because it's awful. It's awful, so we should laugh about it. Yeah. Exactly. It's awful, and I'm just thinking about, like, how terrible yesterday was. Like, first, I I woke up, like, for Rebbe, like, banging on the door because I'd accidentally locked it. Mhmm. Like, padlocked it. And then, like, I had to call my boyfriend to make sure he wasn't mad at me because, like, blacking out is not what boyfriend's like from their girlfriend. You know what I mean? Like, I had to call him and be like, hey. Are you mad at me? He's like, no. You handled yourself really well last night. And I was like, oh, thank god. And then threw up. Couldn't, like I was like, there's no way makeup was going on. Like, basically, like, didn't even wash my face. It was just horrific. It was a truly horrific day yesterday. Rebbe had to put up with it and, like, it was like, oh, it was so awful. It was so awful. It was, like, young, like like, I'm 18, and I've never had anything to drink before. Like, that's basically what it was like. Now you said your a therapist because of that. I mean, I don't know. I'm I was just maybe. Maybe. Maybe. Yeah. But what do you think? I think he was just trying to be helpful. I don't know. I mean Do you see this as a problem? The drinking? Mhmm. I think it depends on what I'm not saying I have a problem. I'm saying there is a problem. I'm just kidding. That's something that I like to say. What's the difference for for No. It's a joke. It's a joke. Trust me. It's like I said that to someone once, and he was like, I'm not saying I have a problem. I'm saying there is a problem. I honestly don't know if I would, I think, you know, when I'm just, like, with my with my boyfriend now, like, when we're drinking, like, at his apartment, like, I don't blackout, or I don't, like, drink excessively, and I don't I don't have a problem stopping. But, like, when I'm with, when I'm out and I'm with people that I don't necessarily know very well or I haven't seen in a while or, like, I, I drink a lot to make myself feel more comfortable. Mhmm. So and it is fun. Like, I have fun until I don't. And then, so I don't know what you would call that. I've been to a lot of AA meetings and stuff because, you know, I just try to figure it out. Like, where am I in this? Like, am I an alcoholic? Like, some of my stories are not out of line with the stories that you hear in there. You know? Like, they're not. But I also have no problem at all not drinking for a long period of time. Mhmm. So, I mean So why not continue with that trend? Well, I'd have fun when I'm drinking most of the time. It sounds like it was a lot of fun. It I mean, I it's just stupid. Like, it's just stupid. I know. Right. How's that working out for me? Well, no. No. No. But who knows if it was fun or not? Because I I don't know how much you actually Yeah. No. I mean remember of the night, which might sometimes scares people. Yeah. I know. It's it should be scary. It's it should be scary. Is it scary for you? It was definitely scary when I was in that room, and I didn't know how I got there. Yeah. I'm sure. Yeah. I would have probably felt exactly the same way. It was horrifying. I was just like, this is a real I didn't know I couldn't even tell you what city I was in. I was just like, this is really, really bad. Your theory is that when you see new people I definitely have your social yeah. I have social anxiety, so, like, it it helps me. Like, that's from day 1 with alcohol. It's never been, like, I like the taste, or I like to just, like, get, like, a buzz. It's like, I I definitely don't drink by myself. Like, there's nothing and I don't like how it has calories, and I don't like I definitely don't like the hangover. But, like, when I'm around other people, I get so nervous. Like the hangover, but, like, when I'm around other people, I get so nervous. Mhmm. And it's like, especially if it's a lot of people. And so it helps me feel better. And I think that's a lot of people's experience with alcohol, though, especially if they have social anxiety, but they probably don't block out all the time. How much do you think you know, I mentioned avoidance earlier on. How much do you think about avoiding this? How much do you think avoidance is a problem for you? I think it would depend on, like, the situation. Do tell me. I mean, if it's, like, avoidance, like like reading a book or some, something completely benign. Like, if it's, like, homework or something, I don't really avoid it. But, yeah, maybe, like, I my mom and I don't really like, we don't really have a relationship. Right? But, like, the other day, I reached out, and I was like because my dad was an AA, and I was like, so was he like, what was it that, like, prefaced the whole AA thing? Like, was he really an alcoholic? Because, I mean, from what I've heard from other people, he wasn't. Mhmm. And she basically agreed with me and said that the only reason my dad went into AA was because he liked to have the social aspect of it and because my mom made him stop drinking because he was cheating on my mom all the time. So, that was just, like, his way of, you know, like, okay. If I wanna stop drinking, I'm gonna and my mom never let she's very controlling. She never let my dad have a, like, a life outside of her. So just, like, she never let me have a life outside of her. So, like and she eventually made him stop going to AA because, god forbid, he have a life outside of her. Mhmm. And Is she still alive? Mhmm. And she's not she's much better now, but, like, still I mean, we never really had that ability to connect with each other because we never had that bond to begin with. But, anyway, so she sent me this email, and I was like and then I I had been like, well, did he have, like, anger issues? You know? Like, just like like, no. Like, I was like, did he blackout? No. That'd be scary. Do you would it matter to you either way if he was an alcoholic or not? I would feel like there might be something, like, biological there where it's, like, making me like, I would probably be like, okay. You know what? Maybe there's something there. Mhmm. But, like, I I mean, my mom's dad was an alcoholic, and I guess maybe. But, like, my mom's not an alcoholic. And if my dad wasn't an alcoholic, then I don't know where I would've. And is I mean, is blacking out like, is that indicative of alcoholism? Like, this is a real question. It's part of the criteria. So I don't know if you looked at substance use disorder criteria. You have. I mean, I've this isn't the first time I've had this conversation with people. Yeah. And what have what have you learned? Well, my therapist that I really appreciated a lot, Diane, she told me, like, okay. There's 2 situations. Like, one, you're drinking all the time and you can't stop. And I was like, oh, it's not me. And she's like, 2, when you do drink, you have a hard time stopping. And I was like, that might be me sometimes. Mhmm. But sometimes, not all the time. So, definitely, if I'm, like, in a social situation. Definitely. So if you were cutting some of the time but not all of the time, would you consider yourself self harming? That's a really that was a really nice way to put that. Yes. I would. Okay. Yeah. So the difference for you, there seems to be a difference. I feel like I'm gonna have to think about that for a little while. Okay. Give it some thought. That was very that was a very astute observation, and thank you for making that analogy for me. Well, I have one other question for you about this. If you don't have any biological strain of alcoholism, like, for sure in your family, would that mean that you would, eliminate that as a possibility in terms of a problem for you? No. I mean, I think my I never I only had one grandparent that I met, but, I mean, if my mom's dad, like, literally killed himself with alcohol, like, literally Mhmm. Literally, I wouldn't I can't say that I don't have that, that it's not in there somewhere, like, if that so, I mean, that's a fact that that happened. Yeah. It sounds like that there's something pretty powerful about learning about your father's alcoholism specifically. What do you mean? In thinking more about whether you might struggle with the same kinds of things. I mean, I thought I wanted to know if there's a connection there. You know? Like, because I know my mother doesn't really drink. And so I was like, well, maybe maybe that's what was going on with my dad. Like, maybe that's I mean, I was pretty sure that wasn't what was going on. But, I mean, if that was the case, then I would feel like a little bit more confident in being like, maybe I belong in AA, you know, something like that. Or maybe I should just go to Europe where AA doesn't really it's just like life. It doesn't exist. Just like life. No. I'm just kidding. I know it exists everywhere. But, I mean, maybe it's not maybe the labels are a little bit more blurred. Do you wanna stop drinking? Not right now. No. How come? I mean, I have fun with it. Mhmm. When I do have I mean, I know that some I just it's I mean, I definitely I mean, I it's it's I don't know how I would have relationships with people, honestly. Like, I don't know. Like, I sorry, but I honestly. Like, I don't know. Like, I sorry, but I cannot stand being around people because I have so much anxiety. So, like, even if it's, like, a friend, like, a really good friend, I'm like, I get so nervous. I'm like, I feel like I need to make them feel better or I need to make them, like, more comfortable or just and if I'm drinking, I don't have to feel that way. It sounds like you don't have to overthink and you don't have to feel. Yeah. Exactly. Yeah. So you remember at the beginning of when we sat down to talk and I asked you about avoidance? Mhmm. You're like a master avoider. I don't even know if you realize how good you are at this. I guess not because I never thought of myself as that. That's amazing. You know, what you're doing, which is actually really impressive, is you're stepping back and thinking about some of the functions of why you do things, like drinking. I asked you about drinking. You said, well, I'm really socially anxious. And you don't wanna stop. I get it. Because if you stopped, you'd feel a lot of anxiety. A lot. I'm sure. Yeah. A ton. It's a in your mind, I think, a lot easier to drink. It facilitates connection, socialization, makes you feel more comfortable, except there's, like, a big price that you're paying. Right. The least of which, which may sound a little bit backwards, are these longer term, effects of the alcohol, although they obviously can be very serious as what happened with your grandfather. Mhmm. People die from alcoholism. Mhmm. But you have a long history with borderline, and interpersonal relationships actually are like the backbone of borderline problems. So you have learned to forgive yourself to some degree, and you've learned to, like, move forward. Maybe not perfectly. No one's perfect though. Yeah. But underlying all of this, you have some real challenges with the relationship still, which my guess are you sort of scratched the surface as to you wanna address them, and it's probably really scary to open Pandora's box. Mhmm. Especially if you're really good at talking the talk, being in therapy. My guess is, there's a lot underneath that you haven't necessarily looked at, especially if substances are still functioning to enable you to connect with people. Right. Yeah. I mean, with interpersonal stuff, it's not nearly as bad as it used to be, but it's still I mean, with all borderlines, it's it's a problem. Right? It's like this crippling issue where, like, I can have, like, a really great relationship with anybody. Right? It doesn't add, like, any kind of interpersonal relationship, and then it just, like, falls apart. How do you understand that? I think for me personally, like, I think it's not as bad as it used to be. It's definitely not as bad as it used to be. That I got. Yeah. I mean I get it. No. Sorry. It's just like It's so much better. I, like, I mean, I know that you're saying, like, I'm hard on myself, but, seriously, like, it used to be so bad. Like, so, so bad. Like, like, I really couldn't even feel like I could get attached to someone because I would just be like, well, they're gonna be gone at some point. So and now, I mean, I don't know. I'm also, like, more when I went to go to when I got to LA, I was like, I'm not gonna have any friends. I don't want to have any friends anymore. Like, I don't ever want to have friends again. And then I kinda got over that. So but now I'm much more cautious about, like, who I let into my life. And that's how I feel. I think so. Would you have kids? I don't know. Remember, I don't know. I don't know. Like, last night, like, my boyfriend was being super sweet, and he was like, I wanna, like, have a life with you and have a family. And that was really sweet, and that made me smile. Mhmm. But at the same time, I'm like, I don't wanna bring a demon child into this world. And I know that that's a mean thing to say about, like, borderlines or myself, but, like, I I know how much pain I used to have to go through, and I know how much I blamed my mother. Mhmm. And it's not like, it's not her fault for wanting to have a child. But if she knew I mean, I'm assuming she I mean, she's just knowing her from, like, how I knew her when I was, you know, living with her. Like, just I mean, maybe she didn't think she could pass that on. I don't know. I don't know. But I would never want to put, like, a child into that situation. Are you worried you're like her? Sometimes. Yeah. Have you ever talked about that? I don't think I'm like her, but I my boyfriend the other day was like, when I get really drunk, he was like, you get really mean. He's like, that's probably what your mom is like. And I was like, fuck. I'm sorry. I was like, that's all you need to say. And, like, basically, I'll I'll be the nicest person ever. You know, I don't wanna ever be like her. You'll be the nicest person ever, but you won't stop drinking. Honestly, that would make me stop drinking. But it's not. It hasn't well, because I don't think it's I mean, I don't really remember being that mean, but, like Yeah. Yeah. No. I don't. It's a real con I mean, maybe it's even I'm not sure it's quite a conflict yet. I mean, it has been. I don't wanna be mean. I don't ever wanna be mean, like, ever. And I don't ever wanna be mad. I don't wanna be that way. I don't wanna be that way. Wrong with being mad? Because I I think for other people, like, they can get mad and they can do that emotional regulation thing. But when I get mad, it's not like that at all. It's not like that. And I really have, like I will I will do, like, gymnastics to rageful. I don't wanna be that way. What? I don't wanna be that way. It's like it's just it's not it's so impossible to put something back together once I've been mad. Like, you know, one of the things I said to my father, and it wasn't even like it's just like he made this innocent mistake, and I was like, oh, father, and it wasn't even like it's just like he made this innocent mistake, and I was like, I'm gonna let you rot. I'm gonna let you die. And this is, like, right before that that last second to last surgery. That was where the last words I said to him before he had the second to last surgery. So, of course, I was on the first plane back to Texas. Like and I was praying, like, on the in the back of the plane, like, praying, like, please, God, let me get there before he dies so I don't have to have those in my last words. Can you imagine? Like, I mean, like, the last words I have with him right now are like, I love you. I'm gonna call you, and I didn't call. But, like, I'm gonna let you rot. I'm gonna let you die. And then he, like, goes into surgery. Like, that was awful. That was so awful. Or, like, god. Like, once, like, my mom, like, did something, and I just I broke everything in the house. Everything. Everything. Everything that was on the walls, all the clocks, like, all the antiques. Like, I threw them on the ground. Like Did it feel good? It did for a second, and then it felt awful. And my dad was just like he was I could feel it in his voice. He was just like this is after I'd moved out. Like, you know, like, it just he was like, I've never seen anything like that before. So do you think the anger just went away? No. I think it's still there. I think I'm just better at, like, at, it's not as bad as it used to be. You're better at controlling it, shoving it down. I think I know what the repercussions are to such an extent that I can I'll I I will pretty much do anything to keep myself from getting mad. Like, pretty much anything. So I I mean, I know we have a a timing thing, but this is the reason I'm I'm kinda on hold there is because if Lois can pick up somewhere near this, this would be really helpful because anger is a normal emotion. I know it is. I know. I know. You know. Yeah. It's clear you understand that. Yeah. And your solution to having a normal emotion is to control the heck out of it. The problem is is that trying to control or over control just makes it actually get worse over time. I think so too. I will say this, though. Like, before, like, my knee jerk response was just like that really, really visceral anger. But now somehow, like, you know, anger is pain. Right? Like, that's what it is. Like, it's like sadness or some sort of pain. Like, that's how it is, and it just sort of, like, manifests itself as anger or, like, or just materializes as anger. And so now I mean, at least now, like, I can feel sadness. Before, it was, like, anger. And then, like, after I've, like, killed everything, then it was sadness. Mhmm. Whereas now, like, I can feel the sadness first. So I do think that that's an improvement. But, yeah, you're right. Like, there's no way in hell I will ever allow myself to feel anger because that's like, it's terrifying to me. Terrifying. Terrifying. I'm sure. Yeah. And for, I'm sure, just the beginnings of the reasons that you shared. But as I said, these mass you know, I'm simplifying, I think, a very complicated situation when I talk about avoidance. Because when you avoid, you avoid any emotion that's not aligned with what you think you can tolerate, which means about 90% of emotions probably don't even register. Maybe. Yeah. Probably. And yet you have them. Yeah. But I just don't feel them. Well, you maybe feel them, but you do a really good job of I won't allow myself to do that. Mental gymnastics and a lot of other things, substances being one of probably many Yeah. To not address issues that are that that cause these emotions to emerge. And I think the thing that your friend may be picking up is that without confronting them Yeah. Not avoiding them through some avenue, therapy being one of them, those little demons have a way of continuing to grow. And it's like you're inadvertently feeding them. Yeah. It makes sense. But you understand where I'm coming from. Right? Like, you can understand why I would want to avoid those things. Absolutely. Yeah. And while on the one hand, I don't blame you, on the other hand, you have all these things that you want in life. Right. And it's, like, metastasizing inside of me and, like, not helping me be, like, who I should be. Now you're I mean I can imagine if you even are considering motherhood, it's gonna be really hard to wanna embrace that if you're so scared that you're gonna be your mom. Yeah. That's true. Yeah. I don't wanna be that way. Yeah. So I I wanna just in case Yeah. You because you wanted to do some debriefing. Wanted to debrief. Yeah. Okay. So I guess it? Charlie, how are are you moving? Good. Thank you. Yeah. Are you holding up okay? Yeah. Thank you. Okay. Let's just record a little room tone so everybody just stay silent for 10, 20 seconds here. This is room tone. Great. Thank you very much. Charlie, thank you. Thank you. I'll come and say goodbye.`,
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

  const [ai, setAi] = useState<models>('gpt-4o');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onGenerate = () => {
    complete('', {
      body: {
        template: editor1?.getHTML(),
        prompt: editor2?.getHTML(),
        model: ai,
      },
    });
  };

  useEffect(() => {
    if (completion) {
      console.log(completion);
      editor2?.commands.setContent(completion);
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
              <div className="flex gap-2 p-2 pt-0">
                <Button onClick={onGenerate} disabled={isLoading} className="w-fit">
                  {isLoading ? 'Generating...' : 'Generate'}
                </Button>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isPopoverOpen}
                      className="w-64 justify-between"
                    >
                      {ai ?? 'Select model...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 max-w-sm p-0">
                    <Command>
                      <CommandInput placeholder="Search ai model..." />
                      <CommandList>
                        <CommandEmpty>No model found.</CommandEmpty>
                        <CommandGroup>
                          {modelsList.map((model) => (
                            <CommandItem
                              key={model}
                              value={model}
                              onSelect={(currentValue) => {
                                setAi(currentValue as models);
                                setIsPopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  ai === model ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {model}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
      </ResizablePanelGroup>
    </div>
  );
}
