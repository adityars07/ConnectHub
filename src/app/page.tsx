"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Users,
  Megaphone,
  BarChart3,
  Smartphone,
  Palette,
  Check,
  ArrowRight,
  MessageCircle,
  Send,
  Star,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { features, pricingPlans } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  users: Users,
  megaphone: Megaphone,
  "bar-chart-3": BarChart3,
  smartphone: Smartphone,
  palette: Palette,
};

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-8"
        >
          <Zap className="h-3.5 w-3.5" />
          Now with end-to-end encryption
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Secure Private{" "}
          <span className="gradient-text">Communication</span> For
          Your Organization
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          A modern messaging platform where teams collaborate seamlessly.
          Chat without revealing phone numbers. Built for privacy-first organizations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/login"
            className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Messaging
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#features"
            className="flex items-center gap-2 rounded-2xl border border-border px-8 py-4 text-base font-medium hover:bg-secondary transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/30">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground font-medium">
                  ConnectHub — Dashboard
                </span>
              </div>
            </div>

            {/* Mock chat UI */}
            <div className="flex h-[400px] sm:h-[500px]">
              {/* Sidebar */}
              <div className="hidden sm:block w-72 border-r border-border bg-sidebar p-3 space-y-2">
                <div className="h-10 rounded-xl bg-secondary/50 mb-4" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-3 p-2.5 rounded-xl",
                      i === 1 && "bg-green-500/10"
                    )}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex-shrink-0",
                        i === 1 ? "bg-green-500/30" : "bg-secondary"
                      )}
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 rounded bg-secondary w-24" />
                      <div className="h-2 rounded bg-secondary/60 w-32" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                  <div className="h-9 w-9 rounded-full bg-green-500/20" />
                  <div className="space-y-1">
                    <div className="h-3 rounded bg-secondary w-28" />
                    <div className="h-2 rounded bg-green-500/30 w-12" />
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-3">
                  {/* Mock messages */}
                  <div className="flex justify-start">
                    <div className="bubble-incoming bg-secondary/80 px-4 py-2 max-w-[60%]">
                      <div className="h-2.5 rounded bg-foreground/10 w-48 mb-1" />
                      <div className="h-2.5 rounded bg-foreground/10 w-32" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bubble-outgoing bg-green-500 px-4 py-2 max-w-[60%]">
                      <div className="h-2.5 rounded bg-white/30 w-40 mb-1" />
                      <div className="h-2.5 rounded bg-white/30 w-24" />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bubble-incoming bg-secondary/80 px-4 py-2 max-w-[60%]">
                      <div className="h-2.5 rounded bg-foreground/10 w-56" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bubble-outgoing bg-green-500 px-4 py-2 max-w-[60%]">
                      <div className="h-2.5 rounded bg-white/30 w-44 mb-1" />
                      <div className="h-2.5 rounded bg-white/30 w-36" />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bubble-incoming bg-secondary/80 px-4 py-2 max-w-[60%]">
                      <div className="h-2.5 rounded bg-foreground/10 w-36 mb-1" />
                      <div className="h-2.5 rounded bg-foreground/10 w-28" />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-border flex items-center gap-2">
                  <div className="h-10 flex-1 rounded-2xl bg-secondary/50" />
                  <div className="h-10 w-10 rounded-xl bg-green-500/30" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="ml-2">Loved by 10,000+ teams</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <span>Enterprise-grade security</span>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <span>99.99% uptime</span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features Section ────────────────────────────────────────────

function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to{" "}
            <span className="gradient-text">communicate</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Built from the ground up for modern organizations that value
            privacy, productivity, and beautiful design.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/5 hover:border-green-500/20"
                >
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-green-500/5 blur-2xl group-hover:bg-green-500/10 transition-colors" />
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 mb-5">
                      <Icon className="h-6 w-6 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────────────

function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-secondary/30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, transparent{" "}
            <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                className={cn(
                  "relative rounded-2xl border p-8 bg-card transition-all duration-300",
                  plan.popular
                    ? "border-green-500/50 shadow-xl shadow-green-500/10 scale-[1.02]"
                    : "border-border hover:border-green-500/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={cn(
                    "mt-8 flex items-center justify-center rounded-xl py-3 text-sm font-semibold transition-all duration-300",
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02]"
                      : "border border-border hover:bg-secondary hover:scale-[1.02]"
                  )}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ─────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Get in <span className="gradient-text">touch</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have questions? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your organization..."
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all resize-none"
                  />
                </div>
                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all hover:scale-[1.01] active:scale-[0.99]">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 p-12 sm:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to transform your team&apos;s communication?
              </h2>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Join 10,000+ organizations already using ConnectHub for secure,
                private messaging.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/login"
                  className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-green-700 shadow-xl hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#contact"
                  className="flex items-center gap-2 rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-700">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              Connect<span className="gradient-text">Hub</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 ConnectHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  );
}
