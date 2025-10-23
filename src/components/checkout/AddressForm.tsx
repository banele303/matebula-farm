"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export type AddressDetails = {
  id: string;
  recipient: string;
  line1: string;
  line2?: string | null;
  city: string;
  province: string;
  postalCode: string;
  isDefault: boolean;
  label?: string | null;
};

interface AddressFormProps {
  hasSavedAddresses: boolean;
  initialAddress?: AddressDetails;
  onSuccess?: (address: AddressDetails) => void;
  onCancel?: () => void;
}

type ApiAddress = {
  id: string;
  recipient: string;
  line1: string;
  line2?: string | null;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean | null;
  label?: string | null;
};

type AddressPayload = {
  recipient: string;
  line1: string;
  city: string;
  province: string;
  postalCode: string;
  line2?: string;
  isDefault: boolean;
};

export function AddressForm({ hasSavedAddresses, initialAddress, onSuccess, onCancel }: AddressFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(initialAddress);

  function normalizeAddress(address: ApiAddress): AddressDetails {
    return {
      id: address.id,
      recipient: address.recipient,
      line1: address.line1,
      line2: address.line2 ?? null,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      isDefault: address.isDefault ?? false,
      label: address.label ?? null,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const payload: AddressPayload = {
      recipient: (formData.get("recipient") as string | null)?.trim() ?? "",
      line1: (formData.get("line1") as string | null)?.trim() ?? "",
      city: (formData.get("city") as string | null)?.trim() ?? "",
      province: (formData.get("province") as string | null)?.trim() ?? "",
      postalCode: (formData.get("postalCode") as string | null)?.trim() ?? "",
      line2: (formData.get("line2") as string | null)?.trim() || undefined,
      isDefault: formData.get("isDefault") === "on",
    };

    if (!payload.recipient || !payload.line1 || !payload.city || !payload.province || !payload.postalCode) {
      toast.error("Please complete all required address fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = initialAddress ? `/api/addresses/${initialAddress.id}` : "/api/addresses";
      const response = await fetch(endpoint, {
        method: initialAddress ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to save address." }));
        toast.error(error.error ?? "Failed to save address.");
        return;
      }

      const data = await response.json().catch(() => null);
      const savedAddress = data?.address ? normalizeAddress(data.address) : undefined;

      if (initialAddress) {
        toast.success("Address updated.");
        router.refresh();
        if (savedAddress) {
          onSuccess?.(savedAddress);
        } else if (initialAddress) {
          onSuccess?.(initialAddress);
        }
      } else {
        toast.success("Delivery address saved.");
        form.reset();
        router.refresh();
        if (savedAddress) {
          onSuccess?.(savedAddress);
        }
      }
    } catch (error) {
      console.error("Error saving address", error);
      toast.error("Something went wrong while saving your address.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">
          Recipient Name
        </label>
        <input
          name="recipient"
          type="text"
          required
          defaultValue={initialAddress?.recipient ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">
          Street Address
        </label>
        <input
          name="line1"
          type="text"
          required
          defaultValue={initialAddress?.line1 ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">
          Additional Details (optional)
        </label>
        <input
          name="line2"
          type="text"
          placeholder="Apartment, building, or landmarks"
          defaultValue={initialAddress?.line2 ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">City</label>
        <input
          name="city"
          type="text"
          required
          defaultValue={initialAddress?.city ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Province</label>
        <input
          name="province"
          type="text"
          required
          defaultValue={initialAddress?.province ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Postal Code</label>
        <input
          name="postalCode"
          type="text"
          required
          defaultValue={initialAddress?.postalCode ?? ""}
          className="mt-2 w-full rounded-xl border border-amber-200/70 bg-white px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>
      <div className="sm:col-span-2 flex items-center gap-2 text-xs text-amber-700/70">
        <input
          name="isDefault"
          type="checkbox"
          id="defaultAddress"
          className="accent-amber-600"
          defaultChecked={initialAddress ? initialAddress.isDefault : !hasSavedAddresses}
        />
        <label htmlFor="defaultAddress">Set as default delivery address</label>
      </div>
      <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="w-full rounded-xl bg-amber-900 text-white py-3 font-semibold hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Save Address"}
        </button>
        {isEditMode && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-xl border border-amber-200/70 bg-white py-3 text-sm font-semibold text-amber-800 hover:bg-amber-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
