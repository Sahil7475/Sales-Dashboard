import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "../src/styles/theme";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard";
import Overview from "./pages/overview";
import Daily from "./pages/daily";
import Monthly from "./pages/monthly";
import Breakdown from "./pages/breakdown";
import Performance from "./pages/performance";
import Preloader from "./components/Preloader";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Preloader isLoading={isLoading} />
          {!isLoading && (
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />   
                <Route path="/overview" element={<Overview />} />
                <Route path="/daily" element={<Daily />} />
                <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/performance" element={<Performance />} />
              </Route>
            </Routes>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
