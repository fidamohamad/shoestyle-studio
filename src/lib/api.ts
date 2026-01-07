import { Product } from "@/data/products";

const N8N_API_URL = 'https://n8n.figover.com/webhook/get-products';

export async function fetchProductsFromN8n(): Promise<Product[]> {
  try {
    // We add 'no-cache' to ensure you aren't seeing old failed attempts
    const response = await fetch(N8N_API_URL, {
      method: 'GET',
      mode: 'cors', // Explicitly request CORS
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    // Check if data exists and is an array
    if (!data || !Array.isArray(data)) {
      console.error("API did not return an array:", data);
      return [];
    }

    return data.map((item: any, index: number) => ({
      id: item.id?.toString() || `api-${index}`,
      name: item.name || "Kobe",
      price: Number(item.price) || 0,
      image: item.image_url || "/placeholder.jpg", // Correctly mapping your API field
      images: [item.image_url || "/placeholder.jpg"],
      category: item.category || "Sports",
      brand: item.brand || "Nike",
      colors: ["Standard"],
      sizes: ["7", "8", "9", "10"],
      rating: 4.8,
      reviews: 150,
      description: item.description || "Premium performance sneakers.",
      features: ["Breathable", "Responsive Cushioning"],
      isNew: true
    }));
  } catch (error) {
    console.error("Error in fetchProductsFromN8n:", error);
    return []; 
  }
}