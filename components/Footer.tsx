import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-yellow-500/20 bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-yellow-400">PeerSpace</h3>
          <p className="text-sm text-gray-400">
            Connecting students, one campus at a time.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <Link
            href="/about"
            className="hover:text-yellow-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-yellow-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="hover:text-yellow-400 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-yellow-400 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>

      <div className="border-t border-yellow-500/10">
        <p className="text-xs text-gray-500 text-center py-4">
          © {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-medium">PeerSpace</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
