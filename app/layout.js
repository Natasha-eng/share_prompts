import Nav from "@components/Nav";
import "@styles/globals.css";

export const metadata = {
  title: "Share Prompts",
  description: "Discover & Share AI Prompts",
};

const RootLayout = async ({ children }) => {
  return (
    <html lang="en">
      <body>
        {/* <Provider> */}
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        {/* </Provider> */}
      </body>
    </html>
  );
};

export default RootLayout;
