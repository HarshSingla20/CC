import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  IndianRupee,
  RefreshCw
} from "lucide-react";

const marketData = [
  {
    crop: "Pepper",
    variety: "Malabar",
    district: "Kochi",
    price: 2450,
    unit: "qtl",
    change: 5.2,
    trend: "up",
    lastUpdated: "2 hours ago",
    quality: "Premium"
  },
  {
    crop: "Cardamom",
    variety: "Small",
    district: "Idukki",
    price: 18500,
    unit: "qtl",
    change: -2.1,
    trend: "down",
    lastUpdated: "1 hour ago",
    quality: "Grade A"
  },
  {
    crop: "Coffee",
    variety: "Arabica",
    district: "Wayanad",
    price: 8750,
    unit: "qtl",
    change: 0,
    trend: "stable",
    lastUpdated: "30 min ago",
    quality: "Cherry"
  },
  {
    crop: "Coconut",
    variety: "Local",
    district: "Alappuzha",
    price: 35,
    unit: "piece",
    change: 3.8,
    trend: "up",
    lastUpdated: "1 hour ago",
    quality: "Mature"
  },
  {
    crop: "Rubber",
    variety: "Natural",
    district: "Kottayam",
    price: 185,
    unit: "kg",
    change: 12.1,
    trend: "up",
    lastUpdated: "45 min ago",
    quality: "RSS-4"
  },
  {
    crop: "Rice",
    variety: "Jyothi",
    district: "Palakkad",
    price: 2850,
    unit: "qtl",
    change: -1.5,
    trend: "down",
    lastUpdated: "3 hours ago",
    quality: "Fine"
  },
  {
    crop: "Ginger",
    variety: "Dry",
    district: "Kozhikode",
    price: 12500,
    unit: "qtl",
    change: 8.3,
    trend: "up",
    lastUpdated: "2 hours ago",
    quality: "Premium"
  },
  {
    crop: "Turmeric",
    variety: "Finger",
    district: "Ernakulam",
    price: 7200,
    unit: "qtl",
    change: 4.2,
    trend: "up",
    lastUpdated: "1 hour ago",
    quality: "Polished"
  }
];

const districts = ["All Districts", "Kochi", "Idukki", "Wayanad", "Alappuzha", "Kottayam", "Palakkad", "Kozhikode", "Ernakulam"];

export default function Market() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");

  const filteredData = marketData.filter((item) => {
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict =
      selectedDistrict === "All Districts" || item.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Market Prices
              </h1>
              <p className="text-muted-foreground">
                Live mandi prices for major crops across Kerala
              </p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search crops..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>

          {/* District Filter */}
          <div className="flex flex-wrap gap-2">
            {districts.map((district) => (
              <Button
                key={district}
                variant={selectedDistrict === district ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDistrict(district)}
                className="text-sm"
              >
                {district}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredData.map((item, index) => (
            <motion.div
              key={`${item.crop}-${item.district}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.crop}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.variety}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.quality}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-center justify-center text-2xl font-bold text-foreground">
                      <IndianRupee className="h-5 w-5 mr-1" />
                      {item.price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        /{item.unit}
                      </span>
                    </div>
                  </div>

                  {/* Change */}
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                      {item.change > 0 ? "+" : ""}
                      {item.change}%
                    </span>
                  </div>

                  {/* Location and Time */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{item.district} Mandi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>Updated {item.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button variant="outline" size="sm" className="w-full">
                    Set Price Alert
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              No market data found matching your criteria.
            </p>
          </motion.div>
        )}

        {/* Market Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Market Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">67%</div>
                  <div className="text-sm text-muted-foreground">Prices Rising</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">₹8,450</div>
                  <div className="text-sm text-muted-foreground">Average Price/qtl</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Active Mandis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
