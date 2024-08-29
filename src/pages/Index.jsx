import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to MP3 to WAV Converter</h1>
        <p className="text-xl text-gray-600 mb-6">Convert your MP3 files to WAV format easily!</p>
        <Button asChild>
          <Link to="/mp3-to-wav">Go to Converter</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
