'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type Props = {
    value: string;
    onChange: (val: string) => void;
};

const CustomEditor: React.FC<Props> = ({ value, onChange }) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image',
    ];

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            placeholder="Nhập mô tả sản phẩm..."
            modules={modules}
            formats={formats}
            className="bg-white min-h-[200px] rounded border"
        />
    );
};

export default CustomEditor;
