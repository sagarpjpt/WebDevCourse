import { useState, useRef } from 'react';

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const containerRef = useRef(null);
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const newWidth = e.clientX - containerLeft;
    if (newWidth > 100 && newWidth < 600) {
      setSidebarWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  return (
    <div
      className="app"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <header className="header">Header</header>
      <div className="content" ref={containerRef}>
        <div className="sidebar" style={{ width: sidebarWidth }}>
          Sidebar Width: {sidebarWidth}px
        </div>
        <div className="resizer" onMouseDown={handleMouseDown} />
        <div className="main" style={{ width: `calc(100% - ${sidebarWidth + 5}px)` }}>
          Main Width: {`calc(100% - ${sidebarWidth + 5}px)`}
        </div>
      </div>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
