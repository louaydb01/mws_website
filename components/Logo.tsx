// The MWS brand lockup — preserved exactly from the original site.
export function LogoMark({ size }: { size?: 'xl' }) {
  return <span className={size === 'xl' ? 'logo-icon logo-icon--xl' : 'logo-icon'} aria-hidden="true">MWS</span>;
}

export function LogoWords() {
  return (
    <>
      <span className="logo-text">MarketWave <span>Solution</span></span>
      <span className="logo-sub">Digital &amp; AI Agency</span>
    </>
  );
}

export function Logo() {
  return (
    <a href="#home-page" className="logo" aria-label="MarketWave Solution">
      <LogoMark />
      <span className="logo-words" aria-hidden="true"><LogoWords /></span>
    </a>
  );
}
