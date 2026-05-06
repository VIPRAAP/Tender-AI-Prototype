import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle, X, Loader2 } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'tender' | 'vendor';
}

export const UploadTender: React.FC = () => {
  const navigate = useNavigate();
  const [tenderFile, setTenderFile] = useState<UploadedFile | null>(null);
  const [vendorFiles, setVendorFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'tender' | 'vendor') => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, type);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'tender' | 'vendor') => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files, type);
    }
  };

  const handleFiles = (files: File[], type: 'tender' | 'vendor') => {
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type,
    }));

    if (type === 'tender' && newFiles.length > 0) {
      setTenderFile(newFiles[0]);
    } else {
      setVendorFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string, type: 'tender' | 'vendor') => {
    if (type === 'tender') {
      setTenderFile(null);
    } else {
      setVendorFiles((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const handleStartEvaluation = async () => {
    if (!tenderFile || vendorFiles.length === 0) {
      alert('Please upload both tender document and vendor bids');
      return;
    }

    setUploading(true);
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Navigate to processing page
    navigate('/processing');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload Tender</h1>
        <p className="text-gray-600 mt-1">Upload tender documents and vendor bids for AI evaluation</p>
      </div>

      {/* Tender Document Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tender Document</h2>
        
        {!tenderFile ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, 'tender')}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium mb-2">
              Drag & drop tender document here
            </p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 cursor-pointer transition-colors">
              Browse Files
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileInput(e, 'tender')}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-4">PDF format only</p>
          </div>
        ) : (
          <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{tenderFile.name}</p>
                <p className="text-sm text-gray-500">{tenderFile.size}</p>
              </div>
            </div>
            <button
              onClick={() => removeFile(tenderFile.id, 'tender')}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Vendor Bids Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Vendor Bids (Multiple)</h2>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, 'vendor')}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors mb-4 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-700 font-medium mb-2">
            Drag & drop vendor bid documents here
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="inline-block px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 cursor-pointer transition-colors">
            Browse Files
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => handleFileInput(e, 'vendor')}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-500 mt-4">PDF format only • Multiple files allowed</p>
        </div>

        {/* Uploaded Vendor Files */}
        {vendorFiles.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 mb-2">
              {vendorFiles.length} vendor bid(s) uploaded
            </p>
            {vendorFiles.map((file) => (
              <div
                key={file.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id, 'vendor')}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Summary & Action */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Summary</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            {tenderFile ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
            <span className="text-gray-700">Tender document uploaded</span>
          </div>
          <div className="flex items-center gap-2">
            {vendorFiles.length > 0 ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
            )}
            <span className="text-gray-700">
              {vendorFiles.length > 0 ? `${vendorFiles.length} vendor bids uploaded` : 'Vendor bids not uploaded'}
            </span>
          </div>
        </div>

        <button
          onClick={handleStartEvaluation}
          disabled={!tenderFile || vendorFiles.length === 0 || uploading}
          className="w-full bg-blue-900 text-white py-4 rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg"
        >
          {uploading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Starting evaluation...
            </>
          ) : (
            <>
              <CheckCircle className="w-6 h-6" />
              Start AI Evaluation
            </>
          )}
        </button>
      </div>
    </div>
  );
};
