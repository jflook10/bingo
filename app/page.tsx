"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

interface BingoCell {
  id: number;
  text: string;
  isMarked: boolean;
}

export default function Home() {
  const [bingoBoard, setBingoBoard] = useState<BingoCell[]>([]);
  const [bingoFound, setBingoFound] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const bingoPhrases = [
    'Says "Let\'s take this offline"',
    "Shares their screen with 20+ tabs open",
    '"Can everyone see my screen?"',
    "Background noise from someone not on mute",
    'Reference to "sexy" software',
    '"Can you hear me?"',
    "Someone forgets to unmute while talking",
    "Someone eats on mic",
    '"Let me share my screen"',
    "Question about something in the background",
    '"I\'ll send that in the chat"',
    '"Sorry, was on mute"',
    "Pet makes an appearance",
    "Reference to driving/racing",
    "Internet connection issues",
    "FREE SPACE",
    '"Can everyone go on mute?"',
    '"Next slide please"',
    "Background conversation from someone not on mute",
    '"Let\'s circle back to this"',
    "There are over 200 people on the call",
    "Someone forgets to stop screen sharing",
    "Child or family member appears in background",
    "Reminder to use AI tools",
    "Audio feedback/echo",
    "SWAG notification",
    "Pause to aknowledge a current event",
    "Splunk update",
    "AI!",
    "Edge Up learning center"
    ];

  const initializeBoard = () => {
    // Shuffle and pick first 25 phrases (for 5x5 grid)
    const shuffled = [...bingoPhrases].sort(() => 0.5 - Math.random());
    const selectedPhrases = shuffled.slice(0, 25);

    // Create board with unique IDs
    const newBoard = selectedPhrases.map((phrase, index) => ({
      id: index,
      text: phrase,
      isMarked: phrase === "FREE SPACE", // Mark the free space by default
    }));

    // Make sure the center is the free space
    const centerIndex = 12; // 5x5 grid, center position
    const freeSpaceIndex = newBoard.findIndex(
      (cell) => cell.text === "FREE SPACE"
    );
    if (freeSpaceIndex !== centerIndex) {
      // Swap with center if not already there
      const temp = newBoard[centerIndex];
      newBoard[centerIndex] = newBoard[freeSpaceIndex];
      newBoard[freeSpaceIndex] = temp;
    }

    setBingoBoard(newBoard);
    setBingoFound(false);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  const handleCellClick = (id: number) => {
    if (!gameStarted) {
      setSnackbarMessage("Please start the game first!");
      setSnackbarOpen(true);
      return;
    }

    setBingoBoard((prevBoard) => {
      const newBoard = prevBoard.map((cell) =>
        cell.id === id ? { ...cell, isMarked: !cell.isMarked } : cell
      );

      // Check for bingo after update
      checkForBingo(newBoard);

      return newBoard;
    });
  };

  const checkForBingo = (board: BingoCell[]) => {
    const size = 5; // 5x5 grid
    let isBingo = false;

    // Check rows
    for (let i = 0; i < size; i++) {
      const row = board.slice(i * size, (i + 1) * size);
      if (row.every((cell) => cell.isMarked)) {
        isBingo = true;
        break;
      }
    }

    // Check columns
    if (!isBingo) {
      for (let i = 0; i < size; i++) {
        const column = [];
        for (let j = 0; j < size; j++) {
          column.push(board[i + j * size]);
        }
        if (column.every((cell) => cell.isMarked)) {
          isBingo = true;
          break;
        }
      }
    }

    // Check diagonals
    if (!isBingo) {
      const diagonal1 = [board[0], board[6], board[12], board[18], board[24]];
      const diagonal2 = [board[4], board[8], board[12], board[16], board[20]];

      if (
        diagonal1.every((cell) => cell.isMarked) ||
        diagonal2.every((cell) => cell.isMarked)
      ) {
        isBingo = true;
      }
    }

    if (isBingo && !bingoFound) {
      setBingoFound(true);
      setSnackbarMessage("BINGO! Congratulations! 🎉");
      setSnackbarOpen(true);
    }
  };

  const startNewGame = () => {
    initializeBoard();
    setGameStarted(true);
    setBingoFound(false);
  };

  const resetGame = () => {
    setBingoBoard((prevBoard) =>
      prevBoard.map((cell) => ({
        ...cell,
        isMarked: cell.text === "FREE SPACE",
      }))
    );
    setBingoFound(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <main>
      <AppBar position="static">
        <Toolbar color="secondary">
          <SportsEsportsIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ShRIMP Bingo
          </Typography>
          <Button
            color="secondary"
            onClick={startNewGame}
            variant={"contained"}
            sx={{ mr: 2 }}
          >
            {gameStarted ? "New Game" : "Start Game"}
          </Button>
          {gameStarted && (
            <Button color="secondary" variant="contained" onClick={resetGame}>
              Reset Board
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ShRIMP Bingo
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Mark the squares as events happen during the meeting. First to get 5
            in a row wins!
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 1,
              aspectRatio: "1/1",
            }}
          >
            {bingoBoard.map((cell) => (
              <Paper
                key={cell.id}
                elevation={2}
                onClick={() => handleCellClick(cell.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 1,
                  cursor: "pointer",
                  backgroundColor: cell.isMarked
                    ? "primary.light"
                    : "background.paper",
                  color: cell.isMarked
                    ? "primary.contrastText"
                    : "text.primary",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: cell.isMarked
                      ? "primary.dark"
                      : "action.hover",
                  },
                  aspectRatio: "1/1",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontSize: "0.7rem", lineHeight: 1.2 }}
                >
                  {cell.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={bingoFound ? "success" : "info"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
}
