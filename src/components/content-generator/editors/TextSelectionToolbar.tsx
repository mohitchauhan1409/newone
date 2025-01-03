import React, { useEffect, useState } from 'react';
import { FiZap } from 'react-icons/fi';

interface TextSelectionToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onAIEdit: () => void;
}

export const TextSelectionToolbar: React.FC<TextSelectionToolbarProps> = ({
  onAIEdit,
}) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setPosition(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      if (rect.width > 0) {
        setPosition({
          top: rect.top - 200,
          left: rect.left + (rect.width / 2) - 250
        });
      } else {
        setPosition(null);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  if (!position) return null;

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-indigo-100 p-1 flex items-center space-x-1 animate-fadeIn"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <button
        onClick={onAIEdit}
        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors flex items-center space-x-2"
      >
        <FiZap className="w-4 h-4 text-indigo-600" />
        <span className="text-sm text-indigo-900">Edit with AI</span>
      </button>
    </div>
  );
};