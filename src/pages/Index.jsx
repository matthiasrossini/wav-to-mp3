import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 rounded-lg neon-border bg-card">
        <h1 className="text-5xl font-bold mb-6 text-primary">Avlana Sound Converter</h1>
        <p className="text-xl mb-8 text-secondary">Transform your audio in the digital realm</p>
        <Button asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
          <Link to="/mp3-to-wav">Enter the Converter</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
