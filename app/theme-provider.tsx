"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      // Main "Shrimp" color: A vibrant, warm coral/salmon
      main: "#FF7043", // Example: A lively coral, reminiscent of cooked shrimp
      light: "#FFA270", // Lighter shade for hover states or subtle accents
      dark: "#C63F17", // Deeper shade for strong contrast or active states
      contrastText: "#FFFFFF", // White text for readability on primary colors
    },
    secondary: {
      // Complementary "Ocean/Sky" color: A calming, slightly desaturated teal
      main: "#4DB6AC", // Example: A soft, muted teal, like clear ocean water
      light: "#80E8DD", // Lighter for accents
      dark: "#00867D", // Deeper for emphasis
      contrastText: "#FFFFFF", // White text for readability on secondary colors
    },
    error: {
      main: "#D32F2F", // Standard Material-UI red for errors
      light: "#E57373",
      dark: "#C62828",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FF9800", // Standard Material-UI orange for warnings
      light: "#FFB74D",
      dark: "#F57C00",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3", // Standard Material-UI blue for info
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#4CAF50", // Standard Material-UI green for success
      light: "#81C784",
      dark: "#388E3C",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FDF7F4", // A very light, warm off-white, like beach sand
      paper: "#FFFFFF", // Pure white for card backgrounds, etc.
    },
    text: {
      primary: "#212121", // Dark gray for main body text
      secondary: "#757575", // Medium gray for secondary text or labels
      disabled: "#BDBDBD", // Light gray for disabled text
    },
    action: {
      active: "#4DB6AC", // Use secondary for active elements
      hover: "rgba(0, 0, 0, 0.04)", // Subtle hover effect
      selected: "rgba(0, 0, 0, 0.08)", // Subtle selected effect
      disabled: "rgba(0, 0, 0, 0.26)", // Standard disabled action color
      disabledBackground: "rgba(0, 0, 0, 0.12)", // Standard disabled background
      focus: "rgba(0, 0, 0, 0.12)", // Standard focus effect
    },
  },
  // You can also add typography, spacing, breakpoints, etc. here
  typography: {
    fontFamily: [
      "Roboto", // Or a more playful font if desired
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
