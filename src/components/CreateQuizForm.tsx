"use client";
import { useState } from "react";
import { NewQuiz } from "@/types/questions";
import { toast, ToastContainer } from "react-toastify";
import { api } from "@/services/api";

type Props = {
  onSubmit: (quiz: NewQuiz) => void;
  onCancel: () => void;
};
const CreateQuizForm = ({ onSubmit, onCancel }: Props) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState<number>();
  const [tags, setTags] = useState("");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || options.some((opt) => !opt) || answer === null) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    const newQuiz: NewQuiz = {
      question,
      options,
      answer,
      tag: tags,
    };

    try {
      await api.post("/questions", newQuiz);
      console.log("✅ ส่งข้อมูลสำเร็จ");
      toast.success("บันทึกคำถามเรียบร้อยแล้ว");
      onSubmit(newQuiz);
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการส่งคำถาม:", err);
      toast.error("ไม่สามารถบันทึกคำถามได้");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            คำถาม
          </label>
          <input
            type="text"
            className="mt-1 w-full border px-3 py-2 rounded-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ตัวเลือก
          </label>
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mt-1">
              <input
                type="radio"
                name="answer"
                checked={answer === index}
                onChange={() => setAnswer(index)}
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                placeholder={`ตัวเลือก ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <p className="text-md text-gray-500 mt-1">
            เลือกตัวเลือกที่ถูกต้องโดยกดวงกลมด้านหน้า
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (คั่นด้วย ,)
          </label>
          <input
            type="text"
            className="mt-1 w-full border px-3 py-2 rounded-lg"
            placeholder="เช่น javascript, typescript"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            บันทึก
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default CreateQuizForm;
