import { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { Light, Dark } from "./styles/theme";
import { MyRoutes } from "./routers/routes";
import { useState } from "react";
import { ThemeContext } from "./hooks/ThemeContext";

function App() {
  const [themeUse, setTheme] = useState("dark");
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <MyRoutes />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
