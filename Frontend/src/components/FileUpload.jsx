import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { UploadCloud, Loader2, XCircle } from 'lucide-react';

const FileUpload = ({ onUpload, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    setUploading(true);
    setError('');
    const formData = new FormData();
    
    try {
      if (multiple) {
        acceptedFiles.forEach(file => formData.append('files', file));
        const res = await axios.post('http://localhost:5001/api/upload-multiple', formData);
        onUpload(res.data.urls); // Pass array of URLs
      } else {
        formData.append('file', acceptedFiles[0]);
        const res = await axios.post('http://localhost:5001/api/upload', formData);
        onUpload([res.data.url]); // Pass array with single URL
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Upload failed. Please try again.';
      setError(message);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  }, [onUpload, multiple]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
          isDragActive 
            ? 'border-indigo-500 bg-indigo-500/10' 
            : 'border-gray-600 hover:border-indigo-500/50'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mb-4" />
            <p className="text-white font-semibold">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center text-gray-400">
            <UploadCloud className="w-12 h-12 mb-4" />
            <p className="text-white font-semibold">
              {isDragActive ? 'Drop the images here...' : 'Drag & drop images here, or click to select'}
            </p>
            <p className="text-sm mt-2">PNG, JPG, GIF, WEBP supported</p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-3 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm flex items-center">
          <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;