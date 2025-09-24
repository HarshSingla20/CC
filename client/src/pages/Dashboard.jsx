import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  TrendingUp,
  CloudRain,
  Sprout,
  AlertTriangle,
  Bell,
  Calendar,
  MapPin,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Dashboard() {
  const { user, token } = useAuth();
  const [currentCrop, setCurrentCrop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropName, setCropName] = useState("");
  const [cropType, setCropType] = useState("");
  const [season, setSeason] = useState("");

  // Show loading state until user is ready
  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  useEffect(() => {
    console.log("Auth user:", user);
  }, [user]);

  const safeParseJSON = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("❌ Failed to parse JSON. Raw response:", text);
      return { error: "Invalid JSON", raw: text };
    }
  };

  const fetchCurrentCrop = async () => {
    try {
      const res = await fetch(`${API_BASE}/crops/current`, {
        credentials: "include",
      });
      const data = await safeParseJSON(res);
      if (res.ok && data.crop) setCurrentCrop(data.crop);
      else setCurrentCrop(null);
    } catch (err) {
      console.error("Fetch crop error:", err);
      setCurrentCrop(null);
    }
  };

  const handleAddCrop = async () => {
    if (!cropName || !cropType || !season) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/crops`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropName, cropType, season }),
      });

      const data = await safeParseJSON(res);
      if (res.ok && data.crop) {
        setCurrentCrop(data.crop);
        setIsModalOpen(false);
        setCropName("");
        setCropType("");
        setSeason("");
        alert("Crop added successfully!");
      } else {
        alert("Failed to add crop: " + (data.message || data.error));
      }
    } catch (err) {
      console.error("Add crop error:", err);
      alert("Failed to add crop.");
    }
  };

  useEffect(() => {
    fetchCurrentCrop();
  }, [token]);

  const dashboardCards = [
    { title: "Available Schemes", value: "12", description: "Schemes you're eligible for", icon: Wallet, change: "+3 new this month" },
    { title: "Market Price Alert", value: "₹2,450/qtl", description: "Pepper - Kochi Mandi", icon: TrendingUp, change: "+5% from yesterday" },
    { title: "Weather Today", value: "28°C", description: "Partly cloudy, 60% rain", icon: CloudRain, change: "Good for planting" },
  ];

  const alerts = [
    { type: "warning", title: "Heavy Rain Warning", message: "Expected rainfall 100mm+ in next 48 hours", time: "2 hours ago" },
    { type: "info", title: "New Subsidy Scheme", message: "Organic Farming Incentive - Applications open", time: "1 day ago" },
    { type: "success", title: "Price Increase", message: "Rubber prices up by 12% this week", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.name || user?.username}
              </h1>
              <p className="text-muted-foreground mt-1">
                <MapPin className="inline h-4 w-4 mr-1" />
                Wayanad District, Kerala
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1">
                <Calendar className="h-3 w-3 mr-1" />
                Monsoon Season
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                    <Icon className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
                    <p className="text-sm text-muted-foreground mb-2">{card.description}</p>
                    <p className="text-xs text-success font-medium">{card.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Current Crop Card */}
          {currentCrop && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Crop</CardTitle>
                  <Sprout className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">{currentCrop.cropName}</div>
                  <p className="text-sm text-muted-foreground mb-2">Type: {currentCrop.cropType}</p>
                  <p className="text-xs text-success font-medium">Season: {currentCrop.season}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Recent Alerts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Alerts */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Recent Alerts & Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        alert.type === "warning" ? "bg-warning" : alert.type === "success" ? "bg-success" : "bg-primary"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline"><Wallet className="h-4 w-4 mr-2" />Apply for Scheme</Button>
                <Button className="w-full justify-start" variant="outline"><TrendingUp className="h-4 w-4 mr-2" />Check Prices</Button>
                <Button className="w-full justify-start" variant="outline"><CloudRain className="h-4 w-4 mr-2" />Weather Forecast</Button>
                <Button className="w-full justify-start" variant="outline"><Sprout className="h-4 w-4 mr-2" />Crop Advisory</Button>
                <Button className="w-full justify-start mt-2" variant="outline" onClick={() => setIsModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />Add Current Crop
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Inline Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-background rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-medium text-foreground mb-4">Add Current Crop</h3>
            <input className="w-full border border-muted rounded-md px-3 py-2 mb-3" placeholder="Crop Name" value={cropName} onChange={(e) => setCropName(e.target.value)} />
            <input className="w-full border border-muted rounded-md px-3 py-2 mb-3" placeholder="Crop Type" value={cropType} onChange={(e) => setCropType(e.target.value)} />
            <input className="w-full border border-muted rounded-md px-3 py-2 mb-4" placeholder="Season" value={season} onChange={(e) => setSeason(e.target.value)} />
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg border border-muted text-muted hover:bg-muted/20" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="px-4 py-2 rounded-lg bg-primary text-background hover:bg-primary/90" onClick={handleAddCrop}>Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
