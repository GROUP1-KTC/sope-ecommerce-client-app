'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import MenuBar from './menu-bar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';

interface RichTextEditorProps {
    content: string;
    onChangeDescription: (content: string) => void;
}
export default function RichTextEditor({
    content,
    onChangeDescription,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3',
                    },
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Underline,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Image.configure({
                inline: false,
                allowBase64: true,
            }),
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3',
            },
        },
        onUpdate: ({ editor }) => {
            onChangeDescription(editor.getHTML());
        },
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
