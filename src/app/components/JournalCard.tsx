import Link from "next/link";

interface JournalCardProps {
  id: number;
  title: string;
  content?: string | null;
  createdAt: Date | string;
}

export default function JournalCard({
  id,
  title,
  content,
  createdAt,
}: JournalCardProps) {
  return (
    <Link href={`/dashboard/entry/${id}`}>
      <div className="bg-gray-800 rounded-lg p-6 transition-colors duration-200 cursor-pointer mb-10 hover:bg-gray-700">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleDateString()} •{" "}
          {new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {content && (
          <p className="mt-3 text-gray-200">
            {content.length > 120 ? content.slice(0, 120) + "..." : content}
          </p>
        )}
      </div>
    </Link>
  );
}
