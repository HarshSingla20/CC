import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  gradient = false,
  delay = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Card
        className={`h-full border-0 shadow-medium hover:shadow-strong transition-all duration-300 ${
          gradient ? "bg-gradient-primary text-primary-foreground" : "bg-card"
        }`}
      >
        <CardHeader className="space-y-4">
          <motion.div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              gradient ? "bg-white/20" : "bg-primary/10"
            }`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className={`h-6 w-6 ${gradient ? "text-white" : "text-primary"}`} />
          </motion.div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className={gradient ? "text-primary-foreground/80" : undefined}>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={href}>
            <Button
              variant={gradient ? "secondary" : "outline"}
              className="w-full group"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
