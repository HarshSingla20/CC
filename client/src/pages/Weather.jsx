import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Eye, AlertTriangle, MapPin, Calendar, Clock, CloudSnow
} from "lucide-react";

const currentWeather = {
  location: "Wayanad, Kerala",
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  visibility: 8,
  rainfall: 60,
  uvIndex: 6
};

const forecast = [
  { day: "Today", date: "Sep 23", high: 32, low: 24, condition: "Partly Cloudy", icon: Cloud, rainfall: 60 },
  { day: "Tomorrow", date: "Sep 24", high: 29, low: 22, condition: "Heavy Rain", icon: CloudRain, rainfall: 85 },
  { day: "Wednesday", date: "Sep 25", high: 26, low: 20, condition: "Thunderstorms", icon: CloudSnow, rainfall: 90 },
  { day: "Thursday", date: "Sep 26", high: 30, low: 23, condition: "Cloudy", icon: Cloud, rainfall: 40 },
  { day: "Friday", date: "Sep 27", high: 33, low: 25, condition: "Sunny", icon: Sun, rainfall: 10 }
];

const alerts = [
  { type: "warning", title: "Heavy Rainfall Alert", message: "Expected rainfall of 100mm+ in next 48 hours. Avoid outdoor farming activities.", validUntil: "Sep 25, 6 PM", icon: CloudRain },
  { type: "advisory", title: "High Humidity Advisory", message: "Ideal conditions for fungal diseases. Monitor crops closely and apply preventive measures.", validUntil: "Sep 24, 8 AM", icon: Droplets }
];

const cropAdvisory = [
  { crop: "Pepper", advice: "Good time for planting. Ensure proper drainage due to expected rainfall.", priority: "high" },
  { crop: "Cardamom", advice: "Monitor for leaf blight due to high humidity. Apply fungicide if needed.", priority: "medium" },
  { crop: "Coffee", advice: "Heavy rain may affect flowering. Provide shelter if possible.", priority: "high" },
  { crop: "Coconut", advice: "Good conditions for growth. Regular maintenance recommended.", priority: "low" }
];

const getAlertColor = (type) => {
  switch (type) {
    case "warning": return "border-warning bg-warning/20 text-warning-foreground";
    case "advisory": return "border-primary bg-primary/20 text-primary-foreground";
    default: return "border-muted bg-muted/20 text-muted-foreground";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high": return "bg-destructive text-destructive-foreground";
    case "medium": return "bg-warning text-warning-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Weather() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Weather & Alerts</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Real-time weather data for Kerala farming regions
          </p>
        </motion.div>

        {/* Current Weather */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{currentWeather.location}</CardTitle>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    Last updated: 30 mins ago
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-foreground">{currentWeather.temperature}°C</div>
                  <p className="text-muted-foreground">{currentWeather.condition}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3"><Droplets className="h-5 w-5 text-primary" /><div><div className="font-medium">{currentWeather.humidity}%</div><div className="text-sm text-muted-foreground">Humidity</div></div></div>
                <div className="flex items-center gap-3"><Wind className="h-5 w-5 text-primary" /><div><div className="font-medium">{currentWeather.windSpeed} km/h</div><div className="text-sm text-muted-foreground">Wind Speed</div></div></div>
                <div className="flex items-center gap-3"><Eye className="h-5 w-5 text-primary" /><div><div className="font-medium">{currentWeather.visibility} km</div><div className="text-sm text-muted-foreground">Visibility</div></div></div>
                <div className="flex items-center gap-3"><CloudRain className="h-5 w-5 text-primary" /><div><div className="font-medium">{currentWeather.rainfall}%</div><div className="text-sm text-muted-foreground">Rain Chance</div></div></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 5-Day Forecast */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card>
              <CardHeader><CardTitle>5-Day Forecast</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {forecast.map((day, idx) => {
                  const Icon = day.icon;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className="flex items-center justify-between p-3 rounded-lg bg-white/30 hover:bg-white/40 transition-colors">
                      <div className="flex items-center gap-4"><Icon className="h-8 w-8 text-primary" /><div><div className="font-medium">{day.day}</div><div className="text-sm text-muted-foreground">{day.date}</div></div></div>
                      <div className="text-center"><div className="text-sm text-muted-foreground">{day.condition}</div><div className="flex items-center gap-2 mt-1"><CloudRain className="h-3 w-3 text-primary" /><span className="text-xs">{day.rainfall}%</span></div></div>
                      <div className="text-right"><div className="font-medium">{day.high}°</div><div className="text-sm text-muted-foreground">{day.low}°</div></div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Alerts & Crop Advisory */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">

            {/* Weather Alerts */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" /> Weather Alerts</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert, idx) => {
                  const Icon = alert.icon;
                  return (
                    <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className={`p-4 rounded-lg border-2 ${getAlertColor(alert.type)} bg-white/80`}>
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <p className="text-sm mb-1">{alert.message}</p>
                          <p className="text-xs opacity-70">Valid until: {alert.validUntil}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Crop Advisory */}
            <Card>
              <CardHeader><CardTitle>Crop Advisory</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {cropAdvisory.map((advisory, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }} className="p-3 rounded-lg bg-white/80">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{advisory.crop}</h4>
                      <Badge className={`text-xs ${getPriorityColor(advisory.priority)}`}>{advisory.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{advisory.advice}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
