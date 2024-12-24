import { useState } from 'react'
import InteractiveToolbar from './InteractiveToolbar';
import './App.css'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {


  return (
    <>
      <DndProvider backend={HTML5Backend}>
    <InteractiveToolbar/>
    </DndProvider>
    </>
  )
}

export default App
