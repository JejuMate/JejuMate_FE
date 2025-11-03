interface LoadingProps {
  message?: string;
}

export default function Loading({ message = '로딩 중...' }: LoadingProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{message}</h2>
        <p className="text-gray-600">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}


