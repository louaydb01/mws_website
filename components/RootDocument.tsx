import type { ReactNode } from 'react';
import Script from 'next/script';
import '@/app/globals.css';
import { fontVariables } from '@/lib/fonts';
import { dirOf, LANG_STORAGE_KEY, type Locale } from '@/lib/i18n';
import { GTM_ID } from '@/lib/site';

// Runs before first paint:
//  • flags JS support (reveal animations only hide content when JS can show it again)
//  • on "/", honours legacy "?lang=xx" links and the visitor's saved language
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');
setTimeout(function(){if(!d.classList.contains('js-ready'))d.classList.remove('js')},3000);
try{if(location.pathname==='/'||location.pathname==='/index.html'){var ok=['ar','en','es'],p=new URLSearchParams(location.search).get('lang'),s=null;
try{s=localStorage.getItem('${LANG_STORAGE_KEY}')}catch(e){}
var t=ok.indexOf(p)>-1?p:(p==='fr'?null:(ok.indexOf(s)>-1&&document.referrer.indexOf(location.host)<0?s:null));
if(t)location.replace('/'+t+'/'+location.hash)}}catch(e){}})();`;

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

export function RootDocument({ lang, children }: { lang: Locale; children: ReactNode }) {
  return (
    <html lang={lang} dir={dirOf(lang)} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className={`lang-${lang}`}>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0"
            style={{ display: 'none', visibility: 'hidden' }} title="Google Tag Manager" />
        </noscript>
        {children}
        <Script id="gtm" strategy="afterInteractive">{GTM_SNIPPET}</Script>
      </body>
    </html>
  );
}
