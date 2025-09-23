import { motion } from "framer-motion";
import { HeroSection } from "@/components/ui/hero-section";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  Wallet,
  TrendingUp,
  CloudSun,
  MessageSquare,
  Shield,
  Users,
  Smartphone,
  Globe
} from "lucide-react";

const features = [
  {
    title: "Government Schemes",
    description:
      "Access 200+ government schemes and subsidies. Check eligibility and apply directly through our platform.",
    icon: Wallet,
    href: "/schemes",
    gradient: true
  },
  {
    title: "Live Market Prices",
    description:
      "Real-time mandi prices for all major crops across Kerala and India. Make informed selling decisions.",
    icon: TrendingUp,
    href: "/market"
  },
  {
    title: "Weather & Alerts",
    description:
      "Detailed weather forecasts, rainfall predictions, and crop-specific farming advisories.",
    icon: CloudSun,
    href: "/weather"
  },
  {
    title: "AI Assistant",
    description:
      "Get instant answers to farming questions in Malayalam and English. Available 24/7.",
    icon: MessageSquare,
    href: "/chat"
  },
  {
    title: "Secure & Trusted",
    description:
      "Government-backed platform with secure data handling. Your privacy is our priority.",
    icon: Shield,
    href: "/about"
  },
  {
    title: "Community Support",
    description:
      "Connect with fellow farmers, share experiences, and learn from agricultural experts.",
    icon: Users,
    href: "/dashboard"
  }
];

const benefits = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Works perfectly on all devices, optimized for rural internet conditions."
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description:
      "Available in Malayalam and English for better accessibility."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for Kerala's farming community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Rural Kerala
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed with farmers' needs in mind, ensuring accessibility and ease of use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
