import { Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={jakarta.className}>
        <NextTopLoader
          color="#98a2b3"
          initialPosition={0.08}
          crawlSpeed={300}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #344054,0 0 8px #344054"
        />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}