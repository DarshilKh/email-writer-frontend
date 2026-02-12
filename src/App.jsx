import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Paper,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Chip,
  Fade,
} from "@mui/material";
import {
  Email as EmailIcon,
  ContentCopy as CopyIcon,
  Send as SendIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setGeneratedReply("");

    try {
      const response = await axios.post(
        "https://email-writer-backend-uii5.onrender.com/api/email/generate",
        { emailContent, tone },
      );

      setGeneratedReply(response.data);
    } catch (err) {
      setError("Failed to generate email reply. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopySuccess(true);
  };

  const handleClear = () => {
    setEmailContent("");
    setTone("");
    setGeneratedReply("");
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Top Navigation Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        <Toolbar>
          <SparkleIcon sx={{ mr: 1, color: "#818cf8" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(90deg, #818cf8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI Email Writer
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label="Powered by Groq AI"
            size="small"
            sx={{
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              fontSize: "0.75rem",
            }}
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Header Section */}
        <Fade in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
              }}
            >
              <EmailIcon sx={{ fontSize: 35, color: "#fff" }} />
            </Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#f1f5f9",
                mb: 1,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Email Reply Generator
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#94a3b8", maxWidth: 500, mx: "auto" }}
            >
              Paste any email and get an AI-crafted professional reply in
              seconds
            </Typography>
          </Box>
        </Fade>

        {/* Input Section */}
        <Fade in timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: "16px",
              background: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(99, 102, 241, 0.15)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ color: "#c7d2fe", fontWeight: 600, mb: 2 }}
            >
              📧 Original Email
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Paste the email you want to reply to..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#e2e8f0",
                  borderRadius: "12px",
                  background: "rgba(15, 23, 42, 0.5)",
                  "& fieldset": {
                    borderColor: "rgba(99, 102, 241, 0.2)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(99, 102, 241, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366f1",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#64748b",
                  opacity: 1,
                },
              }}
            />

            <Typography
              variant="subtitle1"
              sx={{ color: "#c7d2fe", fontWeight: 600, mb: 2 }}
            >
              🎯 Reply Tone
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={tone}
                displayEmpty
                onChange={(e) => setTone(e.target.value)}
                sx={{
                  color: "#e2e8f0",
                  borderRadius: "12px",
                  background: "rgba(15, 23, 42, 0.5)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(99, 102, 241, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(99, 102, 241, 0.4)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#6366f1",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#94a3b8",
                  },
                }}
              >
                <MenuItem value="">Auto (Neutral)</MenuItem>
                <MenuItem value="professional">💼 Professional</MenuItem>
                <MenuItem value="casual">😊 Casual</MenuItem>
                <MenuItem value="friendly">🤝 Friendly</MenuItem>
                <MenuItem value="formal">📜 Formal</MenuItem>
                <MenuItem value="humorous">😄 Humorous</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                disabled={!emailContent || loading}
                onClick={handleSubmit}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                  ) : (
                    <SendIcon />
                  )
                }
                sx={{
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 4px 20px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    boxShadow: "0 6px 24px rgba(99, 102, 241, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(99, 102, 241, 0.2)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {loading ? "Generating..." : "Generate Reply"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: "12px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "rgba(99, 102, 241, 0.3)",
                  color: "#a5b4fc",
                  "&:hover": {
                    borderColor: "#6366f1",
                    background: "rgba(99, 102, 241, 0.1)",
                  },
                }}
              >
                Clear
              </Button>
            </Box>
          </Paper>
        </Fade>

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 4,
              borderRadius: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              color: "#fca5a5",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Generated Reply Section */}
        {generatedReply && (
          <Fade in timeout={600}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: "rgba(30, 41, 59, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#86efac", fontWeight: 600 }}
                >
                  ✅ Generated Reply
                </Typography>
                <Chip
                  label="AI Generated"
                  size="small"
                  sx={{
                    background: "rgba(34, 197, 94, 0.15)",
                    color: "#86efac",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                  }}
                />
              </Box>

              <TextField
                fullWidth
                multiline
                rows={8}
                value={generatedReply}
                inputProps={{ readOnly: true }}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    color: "#e2e8f0",
                    borderRadius: "12px",
                    background: "rgba(15, 23, 42, 0.5)",
                    "& fieldset": {
                      borderColor: "rgba(34, 197, 94, 0.2)",
                    },
                  },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<CopyIcon />}
                onClick={handleCopy}
                sx={{
                  borderRadius: "10px",
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "rgba(34, 197, 94, 0.3)",
                  color: "#86efac",
                  "&:hover": {
                    borderColor: "#22c55e",
                    background: "rgba(34, 197, 94, 0.1)",
                  },
                }}
              >
                Copy to Clipboard
              </Button>
            </Paper>
          </Fade>
        )}
      </Container>

      {/* Copy Success Notification */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{
            borderRadius: "12px",
            fontWeight: 600,
          }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
