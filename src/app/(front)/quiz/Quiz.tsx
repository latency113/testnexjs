"use client";

import { useEffect, useState } from "react";
import { Quiz } from "@/types/questions";
import { api } from "@/services/api";

const QuizPage = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [id: string]: number }>({});
  const [checkedQuestions, setCheckedQuestions] = useState<{
    [id: string]: boolean;
  }>({});

  useEffect(() => {
    api.get("/questions").then((res) => {
      setQuiz(res.data);
    });
  }, []);

  const handleSelect = (questionId: string, selectedIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  };

  const handleSubmit = (questionId: string) => {
    if (userAnswers[questionId] === undefined) {
      alert("กรุณาเลือกคำตอบก่อนตรวจ");
      return;
    }
    setCheckedQuestions((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

const handleDelete = (questionId: string) => {
  const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบคำถามนี้?");
  if (!confirmDelete) return;

  api.delete(`/questions/${questionId}`).then(() => {
    setQuiz((prev) => prev.filter((q) => q.id !== questionId));
  });
};


  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl text-center font-bold mb-6">แบบทดสอบ</h1>

      <div className="grid gap-6">
        {quiz.map((q) => {
          const userSelected = userAnswers[q.id];
          const isChecked = checkedQuestions[q.id] || false;
          const isCorrect = userSelected === q.answer;

          return (
            <div
              key={q.id}
              className={`rounded-xl p-4 border shadow ${
                isChecked
                  ? isCorrect
                    ? "border-green-400 bg-green-50"
                    : "border-red-400 bg-red-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold ">{q.question}</h2>
                <div className="flex space-x-2 items-center">

                  <div className="text-sm text-gray-500">
                    หมวดหมู่: {q.tag}
                  </div>

                  <button onClick={()=> handleDelete(q.id)}className="p-1 rounded-full hover:bg-gray-200">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white hover:text-red-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                </div>
              </div>

              <div className="space-y-2">
                {q.options.map((option, i) => (
                  <label
                    key={i}
                    className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                      isChecked && i === q.answer
                        ? "bg-green-100"
                        : i === userSelected
                        ? "bg-blue-100"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id.toString()}
                      value={i}
                      disabled={isChecked}
                      checked={userSelected === i}
                      onChange={() => handleSelect(q.id.toString(), i)}
                      className="accent-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>

              {!isChecked && (
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleSubmit(q.id.toString())}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    ตรวจคำตอบ
                  </button>
                </div>
              )}

              {isChecked && (
                <p className="mt-4 text-sm">
                  คำตอบของคุณ: <strong>{q.options[userSelected]}</strong>{" "}
                  {isCorrect ? (
                    <span className="text-green-600">✔️ ถูกต้อง</span>
                  ) : (
                    <span className="text-red-600">❌ ไม่ถูก</span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuizPage;
