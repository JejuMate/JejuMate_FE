'use client';

import { useState, useRef, useEffect } from 'react';

interface ScheduleItem {
  id: string;
  time: string;
  name: string;
  category: string;
  description: string;
  location: string;
  image: string;
  duration: string;
  cost: string;
}

interface DaySchedule {
  day: number;
  date: string;
  items: ScheduleItem[];
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  scheduleUpdate?: DaySchedule[];
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  schedules: DaySchedule[];
  onUpdateSchedule: (schedules: DaySchedule[]) => void;
}

export default function ChatBot({ isOpen, onClose, schedules, onUpdateSchedule }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // 초기 인사 메시지
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `안녕하세요! 제주도 여행 일정을 추천해드렸습니다. 🌴

총 ${schedules.length}일 동안 ${schedules.reduce((total, day) => total + day.items.length, 0)}개의 멋진 장소를 방문하실 예정이에요!

일정에 대해 궁금한 점이 있거나 수정하고 싶은 부분이 있다면 언제든 말씀해주세요. 예를 들어:

• "Day 1에 카페 추가해줘"
• "성산일출봉 대신 다른 관광지로 바꿔줘"  
• "예산을 줄여서 다시 짜줘"
• "비 오는 날 대체 일정 알려줘"

어떤 도움이 필요하신가요?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, schedules]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue, schedules);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // 일정 업데이트가 있는 경우
      if (botResponse.scheduleUpdate) {
        onUpdateSchedule(botResponse.scheduleUpdate);
      }
    }, 1500);
  };

  const generateBotResponse = (userInput: string, currentSchedules: DaySchedule[]): Message => {
    const input = userInput.toLowerCase();
    
    // 장소 추가 요청
    if (input.includes('추가') || input.includes('넣어')) {
      if (input.includes('카페')) {
        const updatedSchedules = [...currentSchedules];
        const newCafe: ScheduleItem = {
          id: `new-${Date.now()}`,
          time: '14:30',
          name: '제주 감성 카페',
          category: '카페',
          description: '제주도의 아름다운 바다를 바라보며 커피를 즐길 수 있는 감성 카페',
          location: '제주시 애월읍',
          image: 'https://readdy.ai/api/search-image?query=Cozy%20seaside%20cafe%20in%20Jeju%20Island%20with%20ocean%20view%2C%20aesthetic%20interior%20design%2C%20coffee%20and%20desserts%2C%20peaceful%20atmosphere%2C%20Korean%20cafe%20culture&width=400&height=250&seq=7&orientation=landscape',
          duration: '1시간',
          cost: '15,000원'
        };
        
        if (updatedSchedules[0]) {
          updatedSchedules[0].items.push(newCafe);
        }

        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `좋은 아이디어네요! Day 1에 **제주 감성 카페**를 추가했습니다. ☕

📍 **제주 감성 카페** (14:30)
- 위치: 제주시 애월읍
- 소요시간: 1시간
- 예상비용: 15,000원

제주도의 아름다운 바다를 바라보며 여유로운 시간을 보내실 수 있어요. 다른 수정사항이 있으시면 말씀해주세요!`,
          timestamp: new Date(),
          scheduleUpdate: updatedSchedules
        };
      }
    }

    // 장소 교체 요청
    if (input.includes('바꿔') || input.includes('교체') || input.includes('대신')) {
      if (input.includes('성산일출봉')) {
        const updatedSchedules = [...currentSchedules];
        const newSpot: ScheduleItem = {
          id: '1-1-new',
          time: '09:00',
          name: '섭지코지',
          category: '관광지',
          description: '아름다운 해안절벽과 등대가 있는 제주도 대표 관광지',
          location: '서귀포시 성산읍',
          image: 'https://readdy.ai/api/search-image?query=Beautiful%20Seopjikoji%20coastal%20cliff%20in%20Jeju%20Island%20with%20lighthouse%2C%20dramatic%20ocean%20views%2C%20volcanic%20rock%20formations%2C%20scenic%20landscape%20photography&width=400&height=250&seq=8&orientation=landscape',
          duration: '2시간',
          cost: '무료'
        };

        if (updatedSchedules[0]) {
          updatedSchedules[0].items[0] = newSpot;
        }

        return {
          id: Date.now().toString(),
          type: 'bot',
          content: `성산일출봉을 **섭지코지**로 변경했습니다! 🌊

📍 **섭지코지** (09:00)
- 위치: 서귀포시 성산읍  
- 소요시간: 2시간
- 입장료: 무료

섭지코지는 아름다운 해안절벽과 등대로 유명한 곳이에요. 성산일출봉보다 한적하고 사진 찍기에도 좋답니다. 어떠신가요?`,
          timestamp: new Date(),
          scheduleUpdate: updatedSchedules
        };
      }
    }

    // 예산 관련 요청
    if (input.includes('예산') || input.includes('비용') || input.includes('저렴')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `현재 일정의 예상 총 비용을 확인해드릴게요! 💰

**Day 1**: 45,000원
- 성산일출봉: 5,000원
- 성산포 맛집: 25,000원  
- 우도: 15,000원

**Day 2**: 55,000원
- 한라산: 무료
- 흑돼지 맛집: 35,000원
- 동문시장: 20,000원

**총 예상 비용**: 100,000원 (1인 기준)

예산을 줄이고 싶으시다면 고급 레스토랑을 더 저렴한 맛집으로 바꾸거나, 무료 관광지 위주로 일정을 조정할 수 있어요. 어떻게 하시겠어요?`,
        timestamp: new Date()
      };
    }

    // 날씨 관련 질문
    if (input.includes('비') || input.includes('날씨') || input.includes('우천')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `비 오는 날을 대비한 실내 일정을 추천해드릴게요! 🌧️

**실내 대체 일정**:
- 성산일출봉 → **아쿠아플라넷 제주** (실내 수족관)
- 우도 → **제주 해녀박물관** (문화 체험)
- 한라산 → **제주 국립박물관** (역사 탐방)

**실내 카페 & 맛집**:
- 감성 카페에서 여유로운 시간
- 실내 맛집에서 제주 향토음식 체험

비 예보가 있으시면 미리 말씀해주세요. 날씨에 맞는 완벽한 대체 일정으로 바꿔드릴게요!`,
        timestamp: new Date()
      };
    }

    // 기본 응답
    const responses = [
      `말씀해주신 내용을 바탕으로 일정을 조정해드릴게요! 구체적으로 어떤 부분을 수정하고 싶으신지 알려주세요. 😊`,
      `좋은 아이디어네요! 더 자세히 설명해주시면 맞춤 일정으로 수정해드릴게요. 🌟`,
      `제주도 여행 전문가로서 최고의 일정을 만들어드리겠습니다! 어떤 변경을 원하시나요? ✨`
    ];

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date()
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-96 flex flex-col">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
              <i className="ri-robot-line text-sm"></i>
            </div>
            <div>
              <h3 className="font-semibold">제주여행 AI</h3>
              <p className="text-xs text-blue-100">일정 수정 도우미</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="일정 수정 요청을 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 flex items-center justify-center"
            >
              <i className="ri-send-plane-line text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


