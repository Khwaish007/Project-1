import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  BoldIcon, ItalicIcon, StrikethroughIcon, CodeIcon, ListIcon, ListOrderedIcon, 
  Heading1Icon, Heading2Icon, PilcrowIcon, QuoteIcon, SaveIcon, XIcon, SendIcon, FileTextIcon
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const menuItems = [
    { action: () => editor.chain().focus().toggleBold().run(), icon: BoldIcon, isActive: editor.isActive('bold') },
    { action: () => editor.chain().focus().toggleItalic().run(), icon: ItalicIcon, isActive: editor.isActive('italic') },
    { action: () => editor.chain().focus().toggleStrike().run(), icon: StrikethroughIcon, isActive: editor.isActive('strike') },
    { action: () => editor.chain().focus().toggleCode().run(), icon: CodeIcon, isActive: editor.isActive('code') },
    { action: () => editor.chain().focus().setParagraph().run(), icon: PilcrowIcon, isActive: editor.isActive('paragraph') },
    { action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), icon: Heading1Icon, isActive: editor.isActive('heading', { level: 1 }) },
    { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: Heading2Icon, isActive: editor.isActive('heading', { level: 2 }) },
    { action: () => editor.chain().focus().toggleBulletList().run(), icon: ListIcon, isActive: editor.isActive('bulletList') },
    { action: () => editor.chain().focus().toggleOrderedList().run(), icon: ListOrderedIcon, isActive: editor.isActive('orderedList') },
    { action: () => editor.chain().focus().toggleBlockquote().run(), icon: QuoteIcon, isActive: editor.isActive('blockquote') },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-800 border border-gray-700 rounded-t-lg">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`p-2 rounded-md transition-colors ${item.isActive ? 'bg-indigo-500 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
        >
          <item.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

const BlogEditor = ({ post, onSave, onClose }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [category, setCategory] = useState(post?.category || 'Technology');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState(post?.status || 'draft');

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none p-4 min-h-[300px] bg-gray-900 border border-gray-700 rounded-b-lg',
      },
    },
  });

  const handleSave = (newStatus) => {
    if (!editor) return;
    const content = editor.getHTML();
    onSave({
      ...post,
      title,
      content,
      imageUrl,
      category,
      excerpt,
      status: newStatus || status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FileTextIcon className="w-6 h-6 mr-3 text-indigo-400" />
            {post?._id ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><XIcon /></button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-semibold"
          />
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cover Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <textarea
            placeholder="Excerpt (A short summary for the post card)"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength="300"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white resize-none"
            rows="3"
          />
          <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 p-4 mt-auto border-t border-gray-700">
          <div className="flex items-center mr-auto">
            <span className="text-gray-400 mr-2">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
              {status}
            </span>
          </div>
          <button onClick={() => handleSave('draft')} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">
            <SaveIcon className="w-5 h-5" /> Save as Draft
          </button>
          <button onClick={() => handleSave('published')} className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
            <SendIcon className="w-5 h-5" /> {status === 'published' ? 'Update Post' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;