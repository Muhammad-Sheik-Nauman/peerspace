import { UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-yellow-500/20 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-extrabold text-yellow-400 tracking-tight hover:text-yellow-300 transition"
            >
              PeerSpace
            </Link>
          </div>

          {/* Navigation / Auth */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {/* Sign In */}
              <SignInButton mode="modal">
                <button className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition">
                  Sign in
                </button>
              </SignInButton>

              {/* Sign Up */}
              <SignUpButton mode="modal">
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 shadow-md transition">
                  Sign up
                </button>
              </SignUpButton>

              {/* User Menu */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "ring-2 ring-yellow-400",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
