"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  required?: boolean;
}

export function ImageUpload({ files, onChange, maxFiles = 10, required = false }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
    onChange(newFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
    onChange(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const getPreviewUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer ${
          isDragging
            ? "border-amber-600 dark:border-amber-400 bg-amber-50 dark:bg-amber-600/10 scale-105"
            : "border-amber-200 dark:border-border hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-600/5"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          required={required && files.length === 0}
        />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:bg-amber-600/20 flex items-center justify-center">
            <Upload className="w-8 h-8 text-amber-700 dark:text-amber-400" />
          </div>

          <div>
            <p className="text-base font-semibold text-amber-900 dark:text-foreground">
              {isDragging ? "Drop images here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-amber-700/70 dark:text-muted-foreground mt-1">
              PNG, JPG, GIF up to 10MB each (max {maxFiles} images)
            </p>
          </div>

          {files.length > 0 && (
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-600/10 px-3 py-1.5 rounded-full">
              {files.length} image{files.length > 1 ? "s" : ""} selected
            </p>
          )}
        </div>
      </div>

      {/* Image Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-xl overflow-hidden border-2 border-amber-100 dark:border-border bg-amber-50 dark:bg-muted"
            >
              <img
                src={getPreviewUrl(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* File Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{file.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {required && files.length === 0 && (
        <p className="text-xs text-red-600 dark:text-red-400">
          * At least one image is required
        </p>
      )}
    </div>
  );
}
