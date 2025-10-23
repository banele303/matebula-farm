"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AddressDetails } from "@/components/checkout/AddressForm";
import { AddressManager } from "@/components/checkout/AddressManager";

interface CartItemSummary {
  id: string;
  name: string;
  quantity: number;
  lineTotalInCents: number;
}

interface CheckoutFlowProps {
  userName: string | null;
  userEmail: string | null;
  addresses: AddressDetails[];
  cartItems: CartItemSummary[];
  subtotalInCents: number;
}

export function CheckoutFlow({
  userName,
  userEmail,
  addresses,
  cartItems,
  subtotalInCents,
}: CheckoutFlowProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState(userName ?? "");
  const [email, setEmail] = useState(userEmail ?? "");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotalFormatted = useMemo(
    () =>
      new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
      }).format(subtotalInCents / 100),
    [subtotalInCents]
  );

  useEffect(() => {
    if (addresses.length === 0) {
      setSelectedAddressId(null);
      return;
    }

    setSelectedAddressId((current) => {
      if (current && addresses.some((address) => address.id === current)) {
        return current;
      }
      const defaultAddress = addresses.find((address) => address.isDefault);
      return (defaultAddress ?? addresses[0]).id;
    });
  }, [addresses]);

  function validateFields() {
    if (!fullName.trim()) {
      toast.error("Please provide your full name.");
      return false;
    }

    if (!email.trim()) {
      toast.error("Please provide your email address.");
      return false;
    }

    if (!phone.trim()) {
      toast.error("Please provide a phone number so we can confirm delivery.");
      return false;
    }

    if (!selectedAddressId) {
      toast.error("Please add and select a delivery address before submitting.");
      return false;
    }

    return true;
  }

  async function handleSubmitOrder() {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contactName: fullName.trim(),
          contactEmail: email.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
          addressId: selectedAddressId,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Failed to submit order." }));
        toast.error(error.error ?? "Failed to submit order.");
        return;
      }

      toast.success("Order request submitted. We will reach out shortly.");
      router.refresh();
      router.push("/account");
    } catch (error) {
      console.error("Failed to submit order", error);
      toast.error("Something went wrong while submitting your order.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-10">
          <section className="flex-1 space-y-8">
            <header>
              <p className="text-xs uppercase tracking-widest text-amber-700/70 font-semibold">Checkout</p>
              <h1 className="text-4xl font-bold text-amber-900 mt-2">Delivery &amp; Contact Details</h1>
              <p className="text-sm text-amber-700/80 mt-3">
                Complete your order. We will confirm delivery cost and schedule via phone or e-mail.
              </p>
            </header>

            <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-amber-900">1. Contact Information</h2>
              <p className="text-xs text-amber-700/70 mt-1">
                We will reach out to confirm your order within business hours.
              </p>
              <form
                className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmitOrder();
                }}
              >
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-amber-200/70 bg-amber-50/50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-amber-200/70 bg-amber-50/50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="(+27)"
                    className="mt-2 w-full rounded-xl border border-amber-200/70 bg-amber-50/50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase text-amber-700/70 tracking-wide">Order Notes</label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Let us know about delivery instructions, allergies, or business delivery hours."
                    className="mt-2 w-full rounded-xl border border-amber-200/70 bg-amber-50/50 px-4 py-3 text-sm focus:border-amber-500 focus:outline-none"
                    rows={4}
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-amber-900">2. Delivery Address</h2>
              <p className="text-xs text-amber-700/70 mt-1">Pick a saved address or add a quick drop-off location.</p>

              <AddressManager
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelect={(addressId) => setSelectedAddressId(addressId)}
              />
            </div>
          </section>

          <aside className="w-full lg:w-[360px] bg-white rounded-3xl border border-amber-100 p-6 space-y-6 shadow-md">
            <div>
              <h2 className="text-xl font-semibold text-amber-900">Order Summary</h2>
              <div className="mt-4 space-y-4 text-sm text-amber-800/80">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold text-amber-900">{item.name}</p>
                      <p className="text-xs text-amber-700/70">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-amber-900">
                      {new Intl.NumberFormat("en-ZA", {
                        style: "currency",
                        currency: "ZAR",
                      }).format(item.lineTotalInCents / 100)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-sm text-amber-800/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotalFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-amber-900">To be confirmed</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-white border border-amber-200/50 text-sm text-amber-900">
              Once you submit, our team will reach out to confirm your delivery time, fees, and payment method.
            </div>
            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={isSubmitting || addresses.length === 0}
              className="w-full rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white py-3 font-semibold hover:shadow-lg hover:shadow-amber-600/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Submit Order Request"}
            </button>
            {addresses.length === 0 ? (
              <p className="text-xs text-amber-700/70 text-center">
                Add a delivery address to enable ordering.
              </p>
            ) : (
              <p className="text-xs text-amber-700/70 text-center">
                We process orders Monday to Saturday. You will receive a confirmation within 2 working hours.
              </p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
