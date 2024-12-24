import React, { useState } from 'react';
import { Camera, Mic, Music, Pencil, StickyNote, X, Save, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const InteractiveToolbar = () => {
  const [elements, setElements] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeColor, setActiveColor] = useState('#FFB6C1');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const colors = [
    '#FFB6C1', // Light pink
    '#98FB98', // Pale green
    '#87CEFA', // Light blue
    '#DDA0DD', // Plum
    '#F0E68C', // Khaki
    '#FFE4B5'  // Moccasin
  ];

  const handleDragStart = (e, type) => {
    setIsDragging(true);
    e.dataTransfer.setData('elementType', type);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const type = e.dataTransfer.getData('elementType');
    const newElement = {
      id: Date.now(),
      type,
      x: e.clientX,
      y: e.clientY,
      color: activeColor,
    };
    
    setElements([...elements, newElement]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const deleteElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const handlePhotoUpload = async () => {
    // In a real implementation, this would open the device camera or file picker
    const alert = (
      <Alert className="mb-4">
        <AlertDescription>
          Camera/Photo upload functionality would open here
        </AlertDescription>
      </Alert>
    );
    setElements([...elements, { id: Date.now(), type: 'photo', content: alert }]);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would handle audio recording
    if (!isRecording) {
      const alert = (
        <Alert className="mb-4">
          <AlertDescription>
            Recording started... (This would capture actual audio in a real implementation)
          </AlertDescription>
        </Alert>
      );
      setElements([...elements, { id: Date.now(), type: 'audio', content: alert }]);
    }
  };

  const addSpotifyTrack = () => {
    const trackUrl = prompt('Enter Spotify track URL:');
    if (trackUrl) {
      const alert = (
        <Alert className="mb-4">
          <AlertDescription>
            Spotify track would be embedded here: {trackUrl}
          </AlertDescription>
        </Alert>
      );
      setElements([...elements, { id: Date.now(), type: 'spotify', content: alert }]);
    }
  };

  return (
    <div className="h-screen w-full relative bg-gray-100">
      {/* Main content area */}
      <div 
        className="h-[calc(100vh-80px)] w-full overflow-auto p-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute p-2 cursor-move"
            style={{ left: element.x, top: element.y }}
          >
            <div className="relative group">
              <div 
                className="p-4 rounded shadow-lg bg-white"
                style={{ backgroundColor: element.color }}
              >
                {element.content || element.type}
                <button
                  onClick={() => deleteElement(element.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg p-2">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={handlePhotoUpload}
            draggable
            onDragStart={(e) => handleDragStart(e, 'photo')}
          >
            <Camera className="w-6 h-6 text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, 'note')}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            <StickyNote className="w-6 h-6 text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleRecord}
          >
            <Mic className={`w-6 h-6 ${isRecording ? 'text-red-500' : 'text-gray-600'}`} />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={addSpotifyTrack}
          >
            <Music className="w-6 h-6 text-gray-600" />
          </button>

          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            draggable
            onDragStart={(e) => handleDragStart(e, 'doodle')}
          >
            <Pencil className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Color picker popup */}
        {showColorPicker && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2">
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded-full border-2 border-white hover:border-gray-300 transition-colors"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setActiveColor(color);
                    setShowColorPicker(false);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveToolbar;