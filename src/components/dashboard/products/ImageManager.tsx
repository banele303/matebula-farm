"use client";

import { useState } from "react";
import Image from "next/image";
import { GripVertical, Star, Trash2, MoveUp, MoveDown } from "lucide-react";
import { ProductImage } from "@prisma/client";

interface ImageManagerProps {
  images: ProductImage[];
  onReorder: (images: ProductImage[]) => void;
  onDelete: (imageId: string) => void;
  onSetCover: (imageId: string) => void;
  productName: string;
}

export function ImageManager({ 
  images, 
  onReorder, 
  onDelete, 
  onSetCover,
  productName 
}: ImageManagerProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    
    // Update positions
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      position: idx,
    }));
    
    onReorder(updatedImages);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null) {
      moveImage(draggedIndex, toIndex);
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-amber-700/70 text-sm">
        No images uploaded yet
      </div>
    );
  }

  // Sort images by position
  const sortedImages = [...images].sort((a, b) => a.position - b.position);
  const coverImage = sortedImages[0]; // First image is the cover

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-amber-700/70">
          Drag to reorder • First image is the cover photo
        </p>
        <div className="flex items-center gap-1.5 text-xs text-amber-700/70">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Cover</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sortedImages.map((img, index) => {
          const isCover = img.id === coverImage?.id;
          const isDragging = draggedIndex === index;
          const isHovered = hoveredIndex === index && draggedIndex !== null;

          return (
            <div
              key={img.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`
                group relative rounded-xl border-2 transition-all cursor-move
                ${isDragging ? "opacity-50 scale-95" : ""}
                ${isHovered ? "border-amber-500 shadow-lg" : "border-amber-100"}
                ${isCover ? "ring-2 ring-amber-500 ring-offset-2" : ""}
              `}
            >
              {/* Cover Badge */}
              {isCover && (
                <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Cover
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-t-lg bg-amber-50/30">
                <Image
                  src={img.url}
                  alt={img.altText || productName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {!isCover && (
                    <button
                      type="button"
                      onClick={() => onSetCover(img.id)}
                      className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                      title="Set as cover"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => onDelete(img.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="p-3 bg-white flex items-center justify-between border-t border-amber-100">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-900">
                    Position {index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1.5 hover:bg-amber-100 rounded transition-colors"
                      title="Move up"
                    >
                      <MoveUp className="w-4 h-4 text-amber-600" />
                    </button>
                  )}
                  {index < sortedImages.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1.5 hover:bg-amber-100 rounded transition-colors"
                      title="Move down"
                    >
                      <MoveDown className="w-4 h-4 text-amber-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
