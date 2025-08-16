import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-5xl font-bold mb-4">Hi, I’m Abhijeet</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Full Stack Developer | Building Scalable & Sleek Applications
      </p>
      <div className="flex gap-4">
        <Link href="/projects" className="px-6 py-2 bg-blue-600 text-white rounded-lg">View My Work</Link>
        <Link href="/blog" className="px-6 py-2 border border-blue-600 rounded-lg">Read My Blog</Link>
      </div>
    </section>
  );
}
