"use client";

import { useEffect, useState } from "react";
import { Quiz } from "@/types/questions";
import { api } from "@/services/api";

const QuizPage = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [id: string]: number }>({});
  const [checkedQuestions, setCheckedQuestions] = useState<{ [id: string]: boolean }>({});

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
                <div className="text-sm text-gray-500 mb-2">
                  หมวดหมู่: {q.tag}
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
