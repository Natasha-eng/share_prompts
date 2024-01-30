import Nav from "@components/Nav";
import "@styles/globals.css";
import "@uploadthing/react/styles.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Share Prompts",
  description: "Discover & Share AI Prompts",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
