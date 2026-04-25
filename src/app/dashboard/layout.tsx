import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import BottomNav from '@/components/dashboard/BottomNav';
import BackgroundWebGL from '@/components/dashboard/BackgroundWebGL';
import styles from './dashboard.module.css';

export const metadata = {
  title: 'Dashboard | MProfit',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      <BackgroundWebGL />
      <Sidebar />
      <main className={styles.mainContent}>
        <Topbar />
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
