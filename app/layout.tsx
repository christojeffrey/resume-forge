import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const inter = Inter({ subsets: ["latin"] });

import GlobalStateSetter from "./_components/GlobalStateSetter";
import Script from "next/script";
import NavBar from "./_components/navbar";
import { Separator } from "@/components/ui/separator";
const BASE_URL = process.env.BASE_URL || "";

export const metadata: Metadata = {
  title: "Resume Forge",
  description: "describe me :D",
};
const GoogleTagManagerID = "GTM-PGZWCZ9L";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = await getUser();

  let resumeData = null;
  if (authenticated) {
    resumeData = (
      await fetch(`${BASE_URL}/api/resume/${user?.email}`).then(res =>
        res.json()
      )
    ).body;
  }

  return (
    <html lang="en">
      <head>
        <Script id="gtm" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GoogleTagManagerID}');
        `}
        </Script>
      </head>

      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GoogleTagManagerID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
        <GlobalStateSetter
          isAuthenticated={authenticated}
          user={user}
          resumeData={resumeData}
        >
          <div className="flex h-screen flex-col">
            <NavBar />
            <Separator />
            <div className="flex-1">{children}</div>
          </div>
        </GlobalStateSetter>
      </body>
    </html>
  );
}
