import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// META PIXEL
(function(f,b,e,v,n,t,s)
{if((f as any).fbq)return;n=(f as any).fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!(f as any)._fbq)(f as any)._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode!.insertBefore(t,s)})(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

(window as any).fbq('init', '2154175588655021');
(window as any).fbq('track', 'PageView');
// FIN META PIXEL

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
