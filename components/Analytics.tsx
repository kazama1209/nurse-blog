import Script from "next/script";
import { siteConfig } from "@/lib/site";

/** GA4。NEXT_PUBLIC_GA_ID 未設定なら何も読み込まない。 */
export function Analytics() {
  const id = siteConfig.gaId;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
