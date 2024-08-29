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

  const handleConvert = async () => {
    if (!file) {
      alert('Please select an MP3 file first.');
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
        a.download = 'converted.wav';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Conversion complete! File downloaded.');
      } else {
        throw new Error('Conversion failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Conversion failed. Please try again.');
    } finally {
      setConverting(false);
      setProgress(100);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">MP3 to WAV Converter</h1>
      
      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>How to Use</AlertTitle>
        <AlertDescription>
          <ol className="list-decimal list-inside mt-2">
            <li>Select an MP3 file using the file input below.</li>
            <li>Click the "Convert to WAV" button to start the conversion.</li>
            <li>Once complete, the converted WAV file will automatically download.</li>
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
