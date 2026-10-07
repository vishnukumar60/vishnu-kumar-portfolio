export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
        <div>© {new Date().getFullYear()} Vishnu Kumar. Crafted with care.</div>
        <div className="font-mono text-xs">designed & built end-to-end</div>
      </div>
    </footer>
  );
}
