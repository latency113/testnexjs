import QuizPage from "./Quiz";
import Link from "next/link";

export default function Quiz() {
  return (
    <>
      <div>
        <button className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600">
          <Link href={"/"}>
            <span className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-arrow-out-up-left-icon lucide-circle-arrow-out-up-left"
              >
                <path d="M2 8V2h6" />
                <path d="m2 2 10 10" />
                <path d="M12 2A10 10 0 1 1 2 12" />
              </svg>
              ย้อนกลับ
            </span>
          </Link>
        </button>
      </div>
      <QuizPage />
    </>
  );
}
