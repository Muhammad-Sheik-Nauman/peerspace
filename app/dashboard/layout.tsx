import Sidebar from '@/components/dashboard/Sidebar';
import ChatSection from '@/components/dashboard/ChatSection';
import AiSection from '@/components/dashboard/AiSection';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col md:flex-row min-w-0">
        <div className="flex-1 min-h-0">
          <ChatSection />
        </div>
        <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-gray-800">
          <AiSection />
        </div>
      </main>
    </div>
  );
}