import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Task } from '../types';

interface CalendarProps {
  tasks: Task[];
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEEEE';
    
    const startDate = startOfWeek(currentMonth);
    
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-medium text-sm text-gray-500 uppercase">
          {format(addDays(startDate, i), dateFormat, { locale: es })}
        </div>
      );
    }
    
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const dayTasks = tasks.filter(task => task.date === formattedDate);
        
        days.push(
          <div
            key={day.toString()}
            className={`min-h-[80px] p-1 border border-gray-200 ${
              !isSameMonth(day, monthStart) ? 'bg-gray-100 text-gray-400' : 'bg-white'
            } ${isSameDay(day, new Date()) ? 'bg-gray-100' : ''}`}
            onClick={() => onDateClick(day)}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm ${!isSameMonth(day, monthStart) ? 'text-gray-400' : ''}`}>
                {format(day, 'd')}
              </span>
              {isSameMonth(day, monthStart) && (
                <button className="text-gray-500 hover:text-black">
                  <Plus size={16} />
                </button>
              )}
            </div>
            <div className="mt-1 space-y-1">
              {dayTasks.slice(0, 3).map(task => (
                <div 
                  key={task.id} 
                  className={`text-xs p-1 rounded truncate ${task.completed ? 'line-through text-gray-400' : 'bg-black text-white'}`}
                >
                  {task.title}
                </div>
              ))}
              {dayTasks.length > 3 && (
                <div className="text-xs text-gray-500">+{dayTasks.length - 3} more</div>
              )}
            </div>
          </div>
        );
        
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      
      days = [];
    }
    
    return <div className="mb-4">{rows}</div>;
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;