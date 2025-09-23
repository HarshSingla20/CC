import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: add auth logic
    console.log({ phone, password });
    navigate("/dashboard");
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
          <Button type="submit" className="w-full mt-2">Login</Button>
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
