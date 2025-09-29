const WelcomeMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fadeIn">
      <div className="text-6xl mb-4">🎉</div>
      <p className="text-2xl font-medium text-gray-600 mb-2">All caught up!</p>
      <p className="text-gray-500">Time to add some new tasks</p>
    </div>
  );
};

export default WelcomeMessage;
