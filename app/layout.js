import Nav from "@components/Nav";
import "./global.css";
import "@uploadthing/react/styles.css";
// import { Providers } from "./providers";

export const metadata = {
  title: "Share Prompts",
  description: "Discover & Share AI Prompts",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
