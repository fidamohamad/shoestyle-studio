import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestSellers } from '@/components/home/BestSellers';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
