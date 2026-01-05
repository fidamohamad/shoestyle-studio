import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Globe, Heart } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-copper blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-copper blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="section-title text-primary-foreground mb-6 ">Our Story</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto text-justify">
            Founded in 2025, KynSneaker was born out of a passion for high-performance footwear and iconic style. We don't just list shoes; we curate them. Our team scours the global market to bring you a hand-picked selection of premium sneakers and formal wear, connecting you directly with the world's most trusted brands.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="section-title">Crafted with Passion</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every pair of Shoes Wear is a testament to our commitment to quality. We source the
                finest materials from around the world and work with skilled artisans who bring
                decades of experience to their craft.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is simple: to create footwear that you'll love wearing every day.
                Whether you're stepping into a boardroom, hitting the trails, or enjoying a casual
                weekend, we have the perfect pair for you.
              </p>
              <Link to="/shop">
                <Button className="btn-accent group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative animate-fade-in-right">
              <img
                src="https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop"
                alt="Craftsman at work"
                className="rounded-2xl shadow-elegant"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-elegant">
                <p className="text-4xl font-display font-bold text-accent">50+</p>
                <p className="text-muted-foreground">Global Brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality First',
                description: 'Premium materials and expert craftsmanship in every pair.',
              },
              {
                icon: Heart,
                title: 'Customer Love',
                description: 'Your satisfaction is our highest priority.',
              },
              {
                icon: Globe,
                title: 'Sustainability',
                description: 'Committed to eco-friendly practices and materials.',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building lasting relationships with our customers.',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center p-8 bg-background rounded-xl shadow-elegant animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <value.icon className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="section-title mb-4">Luxury for Every Step</h2>
          <p className="section-subtitle mx-auto mb-12">
            Explore our hand-picked selection of top-tier brands for every style and occasion.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Prada brand',
                // role: 'Founder & CEO',
                image: '/prada.jpg',
              },
              {
                name: 'Adidas brand',
                // role: 'Head of Design',
                image: '/adiddas.jpeg',
              },
              {
                name: 'Puma brand',
                // role: 'Master Craftsman',
                image: 'puma.jpeg',
              },
            ].map((member, index) => (
              <div
                key={member.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4"
                />
                <h3 className="font-display text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Premium Footwear?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Discover our collection and find your perfect pair today.
          </p>
          <Link to="/shop">
            <Button className="btn-accent">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
