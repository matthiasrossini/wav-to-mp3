import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

const Mp3ToWavConverter = () => {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'audio/mpeg') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid MP3 file.');
    }
  };

  const handleConvert = () => {
    if (!file) {
      alert('Please select an MP3 file first.');
      return;
    }
    setConverting(true);
    // Simulating conversion process
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setConverting(false);
        alert('Conversion complete! (This is a simulation)');
      }
    }, 500);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">MP3 to WAV Converter</h1>
      
      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Backend Required</AlertTitle>
        <AlertDescription>
          This frontend demo simulates the conversion process. To implement actual conversion:
          <ol className="list-decimal list-inside mt-2">
            <li>Set up a backend server with FFmpeg installed.</li>
            <li>Create an API endpoint for file upload and conversion.</li>
            <li>Update this frontend to send files to your backend API.</li>
          </ol>
        </AlertDescription>
      </Alert>

      <div className="mb-4">
        <Input type="file" accept=".mp3" onChange={handleFileChange} />
      </div>
      
      <Button onClick={handleConvert} disabled={!file || converting} className="w-full mb-4">
        {converting ? 'Converting...' : 'Convert to WAV'}
      </Button>
      
      {converting && (
        <Progress value={progress} className="w-full mb-4" />
      )}
      
      {file && !converting && (
        <p className="text-sm text-gray-600">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export default Mp3ToWavConverter;