import Sidebar from '@/components/dashboard/Sidebar';
import ChatSection from '@/components/dashboard/ChatSection';
import AiSection from '@/components/dashboard/AiSection';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex">
        <ChatSection />
        <AiSection />
      </main>
    </div>
  );
}