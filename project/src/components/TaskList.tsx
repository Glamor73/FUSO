import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Task, Subject } from '../types';
import { Check, Trash, Edit } from 'lucide-react';

interface TaskListProps {
  date: Date;
  tasks: Task[];
  subjects: Subject[];
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  date, 
  tasks, 
  subjects, 
  onToggleComplete, 
  onDeleteTask,
  onEditTask
}) => {
  const formattedDate = format(date, 'EEEE, d MMMM yyyy', { locale: es });
  const formattedDateValue = format(date, 'yyyy-MM-dd');
  const dayTasks = tasks.filter(task => task.date === formattedDateValue);
  
  const getSubjectName = (subjectId?: string) => {
    if (!subjectId) return null;
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : null;
  };
  
  const getSubjectColor = (subjectId?: string) => {
    if (!subjectId) return null;
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.color : null;
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4 capitalize">{formattedDate}</h2>
      
      {dayTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No tasks for this day</p>
      ) : (
        <ul className="space-y-2">
          {dayTasks.map(task => (
            <li 
              key={task.id} 
              className={`p-3 border rounded-md ${task.completed ? 'bg-gray-50' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <button 
                    onClick={() => onToggleComplete(task.id)}
                    className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                      task.completed 
                        ? 'bg-black border-black text-white flex items-center justify-center' 
                        : 'border-gray-300'
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>
                  
                  <div>
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-black'}`}>
                      {task.title}
                    </h3>
                    
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    )}
                    
                    {task.subject_id && (
                      <div 
                        className="mt-2 text-xs inline-block px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: getSubjectColor(task.subject_id) || '#e5e5e5',
                          color: '#fff'
                        }}
                      >
                        {getSubjectName(task.subject_id)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onEditTask(task)}
                    className="text-gray-500 hover:text-black p-1"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => onDeleteTask(task.id)}
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

export default TaskList;