import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log({ name, phone, email, password, role, district, village, pincode });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 backdrop-blur-sm px-4">
      <div className="max-w-md w-full bg-card/95 backdrop-blur-md rounded-2xl shadow-glow p-8">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>

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
            <label className="block text-sm font-medium text-muted-foreground">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-muted-foreground">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            >
              <option value="farmer">Farmer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">District</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">Village Name</label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
            />
          </div>

          <Button type="submit" className="w-full mt-2">Signup</Button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
