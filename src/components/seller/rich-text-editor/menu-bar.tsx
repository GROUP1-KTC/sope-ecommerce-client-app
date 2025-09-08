import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    List,
    ListOrdered,
    Strikethrough,
    Underline,
    Undo,
    Redo,
    ImagePlus
} from 'lucide-react';
import type { Editor } from '@tiptap/react';

export default function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null;
    }

    const emojiList = ['❤️', '😂', '😍', '👍', '🔥', '😢'];

    const Options = [
        {
            icon: <Heading1 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive('heading', { level: 1 }),
        },
        {
            icon: <Heading2 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive('heading', { level: 2 }),
        },
        {
            icon: <Heading3 className="size-4" />,
            onClick: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive('heading', { level: 3 }),
        },
        {
            icon: <Bold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive('bold'),
        },
        {
            icon: <Italic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive('italic'),
        },
        {
            icon: <Strikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive('strike'),
        },
        {
            icon: <AlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('left').run(),
            pressed: editor.isActive({ textAlign: 'left' }),
        },
        {
            icon: <AlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('center').run(),
            pressed: editor.isActive({ textAlign: 'center' }),
        },
        {
            icon: <AlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign('right').run(),
            pressed: editor.isActive({ textAlign: 'right' }),
        },
        {
            icon: <List className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive('bulletList'),
        },
        {
            icon: <ListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive('orderedList'),
        },
        {
            icon: <Highlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive('highlight'),
        },
        {
            icon: <Underline className="size-4" />,
            onClick: () => editor.chain().focus().toggleUnderline().run(),
            pressed: editor.isActive('underline'),
        },
        {
            icon: <Undo className="size-4" />,
            onClick: () => editor.chain().focus().undo().run(),
        },
        {
            icon: <Redo className="size-4" />,
            onClick: () => editor.chain().focus().redo().run(),
        },
        {
            icon: <ImagePlus className="size-4" />,
            onClick: () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = () => {
                    const file = input.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                        const src = reader.result as string;
                        editor.chain().focus().insertContent(`<img src="${src}" alt="image" />`).run();
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            },
            pressed: false,
        }
    ];

    const EmojiOptions = emojiList.map((emoji) => ({
        icon: <span>{emoji}</span>,
        onClick: () => editor.chain().focus().insertContent(emoji).run(),
        pressed: false,
    }));

    const AllOptions = [...Options, ...EmojiOptions];

    return (
        <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50 flex flex-wrap gap-1">
            {AllOptions.map((option, index) => (
                <button
                    key={index}
                    onClick={option.onClick}
                    className={`p-1 rounded-md border transition 
                  ${option.pressed ? 'bg-blue-100 text-blue-600 border-blue-300' : 'bg-white text-gray-700 border-gray-300'} 
                  hover:bg-blue-50 hover:border-blue-400`}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
}
