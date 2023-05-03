// import './App.css';
import UserRoutes from "./routes/userRoutes/UserRoutes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utility/customTheme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";





function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <UserRoutes />
        </div>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
export default App;