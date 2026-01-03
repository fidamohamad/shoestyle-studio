import { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Successfully subscribed!',
        description: 'Thank you for joining our newsletter.',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Join the Shoes Wear Family
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Subscribe for exclusive offers, new arrivals, and style inspiration delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              required
            />
            <Button type="submit" className="btn-accent h-12">
              <Send className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </form>

          <p className="text-primary-foreground/50 text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
