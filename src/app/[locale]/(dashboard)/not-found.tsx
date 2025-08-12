import Link from "@/components/Link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <div className="container px-4 py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          {/* 404 Text */}
          <h1 className="text-8xl sm:text-9xl font-black text-primary animate-bounce">
            404
          </h1>

          {/* Main Message */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>

          {/* Home Button */}
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full
              hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl
              transform hover:-translate-y-0.5"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          {/* Decorative Elements */}
          <div className="relative w-full max-w-lg mx-auto mt-8">
            <div className="absolute top-0 left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-0 right-4 w-72 h-72 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
