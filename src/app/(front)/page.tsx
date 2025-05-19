import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of the Next.js application",
}

export default function Home() {
  return (
    <>
      <h1 className="text-3xl">Hello Next.JS</h1>
      <p className="text-lg">เว็บตอบคำถาม Quiz ต่างๆ</p>
      <p className="text-lg">สามารถสร้าง Quiz ได้เอง</p>
      <Link href={"/quiz"} className="text-blue-500 hover:underline">
        ตอบ Quiz
      </Link>
    </>
  )
}