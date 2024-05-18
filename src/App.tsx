import React from 'react';
import './App.css';
import { Customers, SideBar, TopBar } from './components';

function App() {
  return (
    <div className="App h-screen flex">
      <div className="w-64  text-white h-full flex-shrink-0 fixed">
        <SideBar />
      </div>
      <div className="flex flex-col w-full h-full ml-64">
        <div className="bg-gray-100 w-full shadow">
          <TopBar />
        </div>
        <div className=" flex-grow overflow-auto">
          <Customers />
        </div>
      </div>
    </div>
  );
}

export default App;
