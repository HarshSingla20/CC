import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Server returned invalid JSON" };
  }

  if (!response.ok) throw new Error(data.message || "Login failed");
  return data;
}

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser({ phoneNumber: phone, password });
      console.log("Login success:", data);

      // Save JWT
      if (data.accessToken) localStorage.setItem("token", data.accessToken);

      // Save full user object in context
      login({
        name: data.name || data.username || "User",
        phone: data.phoneNumber,
        role: data.role || "farmer",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur-sm px-4">
      <div className="max-w-md w-full bg-card/95 backdrop-blur-md rounded-2xl shadow-glow p-8">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
