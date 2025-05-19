"use client";

import { useState } from "react";
import CreateQuizForm from "../CreateQuizForm";
import { NewQuiz } from "@/types/questions";


type Props = {};

const Navbar = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex justify-between items-center p-4 text-blue-500">
        <div className="text-lg font-bold">
          <h1>QuizApp</h1>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-500 px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          สร้าง Quiz
        </button>
      </nav>

      {/* Modal Overlay + Form */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">สร้าง Quiz</h2>
            <CreateQuizForm
              onSubmit={(quiz: NewQuiz) => {
                console.log("Quiz ที่สร้าง:", quiz);
                setIsOpen(false);
              }}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
