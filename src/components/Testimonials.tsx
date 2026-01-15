import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Éric M.",
      company: "Eric Plomberie",
      text: "En 2 semaines j'avais mon site en ligne. Les appels ont augmenté de 40% le premier mois. Je recommande à 100% !",
      rating: 5,
    },
    {
      name: "Sophie L.",
      company: "Auto-École Simon",
      text: "Très professionnel, à l'écoute et rapide. Le site est superbe et nos inscriptions en ligne ont explosé.",
      rating: 5,
    },
    {
      name: "David K.",
      company: "David Kodat Barbier",
      text: "Un travail de qualité, un design élégant qui correspond parfaitement à mon image. Mes clients adorent !",
      rating: 5,
    },
    {
      name: "Marc R.",
      company: "Garage de Belfort",
      text: "Le pack Site + Google Ads a changé notre activité. On reçoit maintenant 3x plus de demandes de devis.",
      rating: 5,
    },
    {
      name: "Thomas B.",
      company: "RMAB Plomberie",
      text: "Premier sur Google en 3 semaines ! Le SEO local fonctionne vraiment. Investissement rentabilisé en 1 mois.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Ce Qu'en Disent <span className="gradient-text">Mes Clients</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Testimonial card */}
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-24 h-24 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-warning text-warning" />
                ))}
              </div>

              {/* Text */}
              <blockquote className="text-xl md:text-2xl font-medium mb-8 relative z-10">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold">{testimonials[currentIndex].name}</p>
                  <p className="text-muted-foreground">{testimonials[currentIndex].company}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
