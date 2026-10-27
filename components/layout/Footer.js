export default function Footer({ sectionNav = false }) {
  return (
    // With the mobile section bar, leave room below the footer so the bar never covers it
    <footer className={`py-8 text-center border-t border-neutral-800 bg-neutral-950 ${sectionNav ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-8" : ""}`}>
      <p className="text-neutral-500 text-sm">
        &copy; {new Date().getFullYear()} Rukshan Dias. All rights reserved.
      </p>
      <p className="text-neutral-600 text-xs mt-2">
        Designed & Built with Next.js and Tailwind CSS
      </p>
    </footer>
  );
}
