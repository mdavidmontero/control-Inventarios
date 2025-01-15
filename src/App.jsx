import styled, { ThemeProvider } from "styled-components";
import { AuthContextProvider } from "./context/AuthContext";
import { Light, Dark } from "./styles/theme";
import { MyRoutes } from "./routers/routes";
import { createContext, useState } from "react";
import { Device } from "./styles/breackpoints";
import { Sidebar } from "./components/organisms/sidebar/Sidebar";
export const ThemeContext = createContext(null);
function App() {
  const [themeUse, setTheme] = useState("dark");
  const theme = themeUse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <Container className={sidebarOpen ? "active" : ""}>
              <section className="contentSidebar">
                <Sidebar
                  state={sidebarOpen}
                  setState={() => setSidebarOpen(!sidebarOpen)}
                />
              </section>
              <section className="contentMenuambur">Menu Hmburguesa</section>
              <section className="contentRoutes">
                <MyRoutes />
              </section>
            </Container>
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .contentSidebar {
    display: none;
  }
  .contentMenuambur {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .contentSidebar {
      display: initial;
    }
    .contentMenuambur {
      display: none;
    }
    .contentRoutes {
      grid-column: 1;
      width: 100%;
      @media ${Device.tablet} {
        grid-column: 2;
      }
    }
  }
`;

export default App;
