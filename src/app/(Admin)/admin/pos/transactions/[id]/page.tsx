import { TransactionDetailContent } from "@/app/components/Admin/pos/transaction-detail";

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TransactionDetailContent transactionId={id} />
}
