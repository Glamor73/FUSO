import React from 'react';
import { Subject } from '../types';
import { Edit, Trash } from 'lucide-react';

interface SubjectListProps {
  subjects: Subject[];
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ 
  subjects, 
  onEditSubject, 
  onDeleteSubject 
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Your Subjects</h2>
      
      {subjects.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No subjects added yet</p>
      ) : (
        <ul className="space-y-2">
          {subjects.map(subject => (
            <li 
              key={subject.id} 
              className="p-3 border rounded-md bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="font-medium">{subject.name}</span>
                </div>
                
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onEditSubject(subject)}
                    className="text-gray-500 hover:text-black p-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => onDeleteSubject(subject.id)}
                    className="text-gray-500 hover:text-red-500 p-1"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectList;