"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddressForm, AddressDetails } from "@/components/checkout/AddressForm";

interface AddressManagerProps {
  addresses: AddressDetails[];
  selectedAddressId: string | null;
  onSelect: (addressId: string | null) => void;
}

export function AddressManager({ addresses, selectedAddressId, onSelect }: AddressManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(addressId: string) {
    setDeletingId(addressId);

    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to delete address." }));
        throw new Error(error.error ?? "Failed to delete address.");
      }

      toast.success("Address removed.");
      router.refresh();
      if (selectedAddressId === addressId) {
        onSelect(null);
      }
    } catch (error) {
      console.error("Failed to delete address", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete address.");
    } finally {
      setDeletingId((current) => (current === addressId ? null : current));
      setEditingId((current) => (current === addressId ? null : current));
    }
  }

  return (
    <div className="mt-6 space-y-6">
      {addresses.length === 0 ? (
        <div className="text-sm text-amber-700/80">
          You have no saved addresses yet. Add your delivery details below so we know where to deliver.
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => {
            const isEditing = editingId === address.id;
            return (
              <div
                key={address.id}
                className={`rounded-2xl border border-amber-200/80 bg-amber-50/50 p-4 ${
                  address.isDefault ? "ring-1 ring-amber-400" : ""
                }`}
              >
                {isEditing ? (
                  <AddressForm
                    hasSavedAddresses={addresses.length > 0}
                    initialAddress={address}
                    onSuccess={(updatedAddress) => {
                      setEditingId(null);
                      onSelect(updatedAddress.id);
                    }}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressId === address.id}
                        onChange={() => onSelect(address.id)}
                        className="mt-1 accent-amber-600"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-amber-900">
                            {address.recipient}
                            {address.label ? ` • ${address.label}` : ""}
                          </p>
                          {address.isDefault ? (
                            <span className="rounded-full bg-amber-600/15 px-2 py-0.5 text-xs font-semibold text-amber-700">
                              Default
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-amber-700/70 mt-1">
                          {address.line1}
                          {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.province}, {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(address.id)}
                        className="rounded-lg border border-amber-200/80 px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(address.id)}
                        disabled={deletingId === address.id}
                        className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === address.id ? "Removing..." : "Delete"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="pt-6 border-t border-amber-100">
        <h3 className="text-sm font-semibold text-amber-900">Add a delivery address</h3>
        <p className="text-xs text-amber-700/70 mt-1">
          Save a new drop-off location for quicker checkout.
        </p>
        <div className="mt-4">
          <AddressForm
            hasSavedAddresses={addresses.length > 0}
            onSuccess={(newAddress) => {
              onSelect(newAddress.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
