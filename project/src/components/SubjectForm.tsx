import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SubjectFormProps {
  onSubmit: (subject: { name: string; color: string }) => void;
  onClose: () => void;
  initialData?: { id: string; name: string; color: string };
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [color, setColor] = useState(initialData?.color || '#000000');
  
  const colors = [
    '#000000', // Black
    '#2563EB', // Blue
    '#10B981', // Green
    '#EF4444', // Red
    '#F59E0B', // Yellow
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#6B7280', // Gray
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    onSubmit({
      name,
      color
    });
    
    setName('');
    setColor('#000000');
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Subject' : 'Add Subject'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Subject name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`w-8 h-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              {initialData ? 'Update' : 'Add Subject'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;