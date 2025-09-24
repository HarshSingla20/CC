import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, CloudRain, Cloud, Sun, AlertTriangle } from "lucide-react";
import axios from "axios";

const alerts = [
  { type: "warning", title: "Heavy Rainfall Alert", message: "Expected rainfall of 100mm+ in next 48 hours. Avoid outdoor farming activities.", validUntil: "Sep 25, 6 PM", icon: CloudRain },
  { type: "advisory", title: "High Humidity Advisory", message: "Ideal conditions for fungal diseases. Monitor crops closely and apply preventive measures.", validUntil: "Sep 24, 8 AM", icon: CloudRain }
];

const cropAdvisory = [
  { crop: "Pepper", advice: "Good time for planting. Ensure proper drainage due to expected rainfall.", priority: "high" },
  { crop: "Cardamom", advice: "Monitor for leaf blight due to high humidity. Apply fungicide if needed.", priority: "medium" },
  { crop: "Coffee", advice: "Heavy rain may affect flowering. Provide shelter if possible.", priority: "high" },
  { crop: "Coconut", advice: "Good conditions for growth. Regular maintenance recommended.", priority: "low" }
];

const getAlertColor = (type) => {
  switch (type) {
    case "warning":
      return "border-warning bg-warning/15 text-warning-foreground";
    case "advisory":
      return "border-primary bg-primary/15 text-primary-foreground";
    default:
      return "border-muted bg-muted/20 text-foreground";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-foreground";
  }
};

function WeatherCardSkeleton() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-muted animate-pulse" />
            <div className="h-4 w-40 rounded bg-muted animate-pulse" />
          </div>
          <div className="space-y-2 text-right">
            <div className="h-8 w-16 rounded bg-muted animate-pulse inline-block" />
            <div className="h-4 w-24 rounded bg-muted animate-pulse ml-auto" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg border bg-card animate-pulse">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="h-4 w-28 rounded bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/weather");
        const data = response.data;

        const mappedData = data.map((city) => ({
          city: city.city,
          currentWeather: {
            temperature: Math.round(city.weather.temperature_2m[0]),
            rainfall: Math.round(city.weather.precipitation[0]),
            condition: "Partly Cloudy",
          },
          forecast: city.weather.time.slice(0, 6).map((time, idx) => ({
            hour: time.split("T")[1],
            temperature: Math.round(city.weather.temperature_2m[idx]),
            rainfall: Math.round(city.weather.precipitation[idx]),
            icon: Cloud,
          })),
        }));

        setWeatherData(mappedData);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Weather & Alerts</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" /> Real-time weather data for Kerala farming regions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <WeatherCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {weatherData.map((cityData, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <CardTitle className="text-xl truncate text-foreground">{cityData.city}</CardTitle>
                            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
                              <Clock className="h-4 w-4" /> Last updated: 30 mins ago
                            </p>
                          </div>
                          <div className="text-right whitespace-nowrap">
                            <div className="text-3xl font-bold text-foreground leading-none">
                              {cityData.currentWeather.temperature}°C
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {cityData.currentWeather.condition}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-2">
                          <div className="text-sm text-muted-foreground">Rain (now)</div>
                          <div className="font-medium text-foreground">{cityData.currentWeather.rainfall}%</div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {cityData.forecast.map((hourData, idx2) => {
                            const IconComp = hourData.icon;
                            return (
                              <motion.div
                                key={idx2}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + idx2 * 0.05 }}
                                className="rounded-lg border bg-card px-3 py-2 hover:bg-accent/50 transition-colors"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium tabular-nums text-sm text-foreground">{hourData.hour}</span>
                                  <IconComp className="h-4 w-4 text-primary" />
                                </div>
                                <div className="mt-1 flex items-baseline justify-between">
                                  <span className="text-base font-semibold text-foreground">{hourData.temperature}°</span>
                                  <span className="text-xs text-muted-foreground">{hourData.rainfall}%</span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-6 h-fit space-y-6">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <AlertTriangle className="h-5 w-5 text-warning" /> Weather Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert, idx) => {
                    const Icon = alert.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="h-5 w-5 flex-shrink-0 mt-0.5 text-foreground" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium leading-snug text-foreground">{alert.title}</h4>
                            <p className="text-sm mb-1 leading-relaxed text-foreground">{alert.message}</p>
                            <p className="text-xs opacity-70 text-foreground">Valid until: {alert.validUntil}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-foreground">Crop Advisory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cropAdvisory.map((advisory, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-medium text-foreground">{advisory.crop}</h4>
                        <Badge className={`text-xs ${getPriorityColor(advisory.priority)}`}>
                          {advisory.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{advisory.advice}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
