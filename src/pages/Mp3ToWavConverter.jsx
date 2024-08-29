import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, CheckCircle2, XCircle, Upload, Zap } from 'lucide-react';
import { toast } from 'sonner';

const Mp3ToWavConverter = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'audio/mpeg') {
      setFile(selectedFile);
      toast.success('MP3 file selected successfully');
    } else {
      toast.error('Please select a valid MP3 file.');
      setFile(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an MP3 file first.');
      return;
    }
    setConverting(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/convert', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${file.name.replace('.mp3', '')}.wav`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Conversion complete! File downloaded.', {
          icon: <CheckCircle2 className="h-4 w-4 text-accent" />,
        });
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Conversion failed. Please try again.', {
        icon: <XCircle className="h-4 w-4 text-destructive" />,
      });
    } finally {
      setConverting(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Avlana Sound Converter</h1>
      
      <Alert className="mb-8 bg-card border-secondary">
        <InfoIcon className="h-5 w-5 text-secondary" />
        <AlertTitle className="text-secondary font-bold">How to Use</AlertTitle>
        <AlertDescription className="text-foreground">
          <ol className="list-decimal list-inside mt-2">
            <li>Upload your MP3 file using the input below.</li>
            <li>Click "Transform Audio" to start the conversion.</li>
            <li>Download your newly forged WAV file.</li>
          </ol>
        </AlertDescription>
      </Alert>

      <div className="mb-6">
        <Input 
          type="file" 
          accept=".mp3" 
          onChange={handleFileChange} 
          className="cursor-pointer bg-muted text-foreground border-secondary focus:border-primary"
        />
      </div>
      
      <Button 
        onClick={handleConvert} 
        disabled={!file || converting} 
        className="w-full mb-6 bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3"
      >
        {converting ? (
          <>
            <Zap className="mr-2 h-5 w-5 animate-pulse" />
            Transforming...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-5 w-5" />
            Transform Audio
          </>
        )}
      </Button>
      
      {progress > 0 && (
        <Progress value={progress} className="w-full mb-6 bg-muted" />
      )}
      
      {file && !converting && (
        <p className="text-sm text-secondary text-center">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export default Mp3ToWavConverter;
