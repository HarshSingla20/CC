import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter,
  Wallet,
  Clock,
  CheckCircle,
  ArrowRight,
  MapPin,
  Calendar
} from "lucide-react";

const schemes = [
  {
    id: 1,
    name: "Pradhan Mantri Kisan Samman Nidhi",
    category: "Income Support",
    amount: "₹6,000/year",
    eligibility: "Small & marginal farmers",
    status: "active",
    deadline: "31 Dec 2024",
    description: "Direct income support of ₹6000 per year to small and marginal farmer families.",
    benefits: ["₹2000 every 4 months", "Direct bank transfer", "No paperwork hassle"],
    location: "All districts"
  },
  {
    id: 2,
    name: "Kerala Organic Farming Scheme",
    category: "Organic Support",
    amount: "₹25,000/hectare",
    eligibility: "Organic farmers",
    status: "active",
    deadline: "15 Jan 2025",
    description: "Financial assistance for organic farming practices and certification.",
    benefits: ["Certification support", "Input subsidies", "Market linkage"],
    location: "Wayanad, Idukki"
  },
  {
    id: 3,
    name: "Coconut Development Scheme",
    category: "Crop Specific",
    amount: "₹15,000/hectare",
    eligibility: "Coconut farmers",
    status: "new",
    deadline: "28 Feb 2025",
    description: "Support for coconut cultivation, processing, and value addition.",
    benefits: ["Planting material", "Processing equipment", "Training programs"],
    location: "Coastal districts"
  },
  {
    id: 4,
    name: "Pepper Cultivation Incentive",
    category: "Spices",
    amount: "₹20,000/hectare",
    eligibility: "Spice farmers",
    status: "active",
    deadline: "10 Mar 2025",
    description: "Special incentive for pepper cultivation in traditional areas.",
    benefits: ["Quality planting material", "Pest management support", "Price guarantee"],
    location: "Wayanad, Idukki, Palakkad"
  }
];

const categories = ["All", "Income Support", "Organic Support", "Crop Specific", "Spices"];

export default function Schemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-success text-success-foreground";
      case "active":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Government Schemes & Subsidies
          </h1>
          <p className="text-muted-foreground">
            Discover and apply for government schemes tailored for Kerala farmers
          </p>
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
                placeholder="Search schemes..."
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

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusColor(scheme.status)}>
                          {scheme.status === "new" ? "New" : "Active"}
                        </Badge>
                        <Badge variant="outline">{scheme.category}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{scheme.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Wallet className="h-4 w-4" />
                          {scheme.amount}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {scheme.deadline}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{scheme.description}</p>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {scheme.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-success flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Location and Eligibility */}
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Available in: {scheme.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Eligibility: {scheme.eligibility}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button className="w-full group">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No schemes found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
