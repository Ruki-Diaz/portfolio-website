export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-neutral-800 bg-neutral-950">
      <p className="text-neutral-500 text-sm">
        &copy; {new Date().getFullYear()} Rukshan Dias. All rights reserved.
      </p>
      <p className="text-neutral-600 text-xs mt-2">
        Designed & Built with Next.js and Tailwind CSS
      </p>
    </footer>
  );
}
