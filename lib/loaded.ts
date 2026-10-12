// Resolves once fonts are ready (or after 700 ms), so entrance animations
// start on final typography instead of the fallback font.
let ready: Promise<void> | null = null;

export function whenLoaded(): Promise<void> {
  if (!ready) {
    ready = new Promise(resolve => {
      const done = () => requestAnimationFrame(() => resolve());
      const fonts = document.fonts;
      if (fonts && fonts.ready) {
        Promise.race([fonts.ready, new Promise(r => setTimeout(r, 700))]).then(done);
      } else {
        done();
      }
    });
  }
  return ready;
}
