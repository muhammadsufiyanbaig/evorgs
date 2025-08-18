import { ExpenseDetailContent } from "@/app/components/Admin/pos/expense-detail";

export default async function ExpenseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExpenseDetailContent expenseId={id} />
}
