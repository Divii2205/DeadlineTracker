import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <BrowserRouter>
          <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;
