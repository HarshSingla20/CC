import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = { message: "Server returned invalid JSON" };
  }

  if (!response.ok) throw new Error(data.message || "Signup failed");
  return data;
}

export default function SignupPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      phoneNumber: phone,
      password,
      role,
      location: { district, village },
      ...(email.trim() && { email }),
      ...(pincode.trim() && { pincode }),
    };

    try {
      const data = await signupUser(payload);
      console.log("Signup success:", data);

      if (data.accessToken) localStorage.setItem("token", data.accessToken);

      // Save user info in auth context for Navbar
      login({ 
        name: data.name || "User", 
        phone: data.phoneNumber, 
        role: data.role || "farmer" 
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
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <Input label="Full Name" value={name} onChange={setName} required />
          <Input label="Phone Number" value={phone} onChange={setPhone} required type="tel" />
          <Input label="Email (Optional)" value={email} onChange={setEmail} type="email" />
          <Input label="Password" value={password} onChange={setPassword} required type="password" />
          <Select label="Role" value={role} onChange={setRole} options={["farmer", "buyer", "expert", "admin"]} />
          <Input label="District" value={district} onChange={setDistrict} required />
          <Input label="Village Name" value={village} onChange={setVillage} required />
          <Input label="Pincode (Optional)" value={pincode} onChange={setPincode} />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Signing up..." : "Signup"}
          </Button>
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

function Input({ label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 bg-background rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground transition"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
