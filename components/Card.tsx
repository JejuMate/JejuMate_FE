"use client";

import type { DaySchedule } from "@/types";

interface CardProps {
  daySchedule: DaySchedule;
}

export default function Card({ daySchedule }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
        <h2 className="text-xl font-bold text-white">
          Day {daySchedule.day}
        </h2>
        <p className="text-gray-300">{daySchedule.date}</p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {daySchedule.items.map((item, index) => (
            <div key={item.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-xs">
                    {item.time}
                  </span>
                </div>
                {index < daySchedule.items.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                )}
              </div>

              <div className="flex-1 bg-gray-50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {item.category}
                  </span>
                  <span>{item.duration}</span>
                  <span>{item.cost}</span>
                </div>
                <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <i className="ri-map-pin-line mr-1"></i>
                  {item.location}
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 rounded-lg object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}