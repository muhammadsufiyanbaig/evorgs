import VoucherApplication from "@/app/components/Home/Coupon";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <VoucherApplication
        bookingDetails={{
          serviceType: "Venue",
          serviceId: "service-123",
          originalAmount: 25000,
        }}
        onVoucherApplied={() => {}}
        onVoucherRemoved={() => {}}
      />
    </main>
  )
}
