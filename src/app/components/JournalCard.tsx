// components/JournalCard.tsx
import Link from "next/link";

interface JournalCardProps {
  id: number;
  title: string;
  createdAt: string;
}

export default function JournalCard({
  id,
  title,
  createdAt,
}: JournalCardProps) {
  return (
    <Link href={`/entry/${id}`}>
      <div className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition cursor-pointer">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}
