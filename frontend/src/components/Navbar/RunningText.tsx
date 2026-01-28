import React, { useState, useEffect } from 'react';
import { AlertCircle, Award, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { t } from '../../i18n';

interface RunningItem {
  id: string | number;
  type: 'info' | 'achievement' | 'agenda';
  content: string;
}

export const RunningText: React.FC = () => {
  const [items, setItems] = useState<RunningItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, achievementsRes, eventsRes] = await Promise.all([
          api.news.getLatest({ limit: 3 }),
          api.achievements.getAll(),
          api.events.getAll()
        ]);

        const newItems: RunningItem[] = [];

        // Process News (Info)
        if (newsRes.success && Array.isArray(newsRes.data)) {
          newsRes.data.slice(0, 3).forEach((item: any) => {
            newItems.push({
              id: `news-${item.id}`,
              type: 'info',
              content: item.title
            });
          });
        }

        // Process Achievements (Prestasi)
        if (achievementsRes.success && Array.isArray(achievementsRes.data)) {
          // Sort by ID descending (newest first) if not already sorted
          const sortedAchievements = [...achievementsRes.data].sort((a: any, b: any) => b.id - a.id);
          sortedAchievements.slice(0, 3).forEach((item: any) => {
            const content = item.studentName 
              ? `Selamat kepada ${item.studentName} meraih ${item.rank} ${item.competition || item.achievement}`
              : `Selamat atas prestasi ${item.rank} ${item.competition || item.achievement}`;
            
            newItems.push({
              id: `ach-${item.id}`,
              type: 'achievement',
              content: content
            });
          });
        }

        // Process Events (Agenda)
        if (eventsRes.success && Array.isArray(eventsRes.data)) {
          // Filter upcoming and sort by date
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          
          const upcomingEvents = eventsRes.data
            .filter((e: any) => {
              const eventDate = new Date(e.date);
              return eventDate >= now;
            })
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 3);

          upcomingEvents.forEach((item: any) => {
            const dateStr = new Date(item.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });
            newItems.push({
              id: `event-${item.id}`,
              type: 'agenda',
              content: `${item.title} pada ${dateStr}`
            });
          });
        }

        setItems(newItems);
      } catch (error) {
        console.error('Failed to fetch running text data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-[var(--color-primary)] text-white text-sm py-2 overflow-hidden border-t border-white/10 relative z-0 pointer-events-none">
      <div
        className="animate-marquee whitespace-nowrap flex items-center gap-12"
        style={{ animation: 'marquee 24s linear infinite', willChange: 'transform' }}
      >
        {items.map((item) => (
          <span key={item.id} className="inline-flex items-center gap-2">
            <span className="bg-white/20 p-1 rounded-full">
              {item.type === 'info' && <AlertCircle className="w-3 h-3" />}
              {item.type === 'achievement' && <Award className="w-3 h-3" />}
              {item.type === 'agenda' && <Calendar className="w-3 h-3" />}
            </span>
            <span className="font-medium">{t(`navbar.running_text.${item.type}`)}:</span> {item.content}
          </span>
        ))}
        {/* Duplicate for seamless loop if items are few */}
        {items.length < 5 && items.map((item) => (
          <span key={`dup-${item.id}`} className="inline-flex items-center gap-2">
            <span className="bg-white/20 p-1 rounded-full">
              {item.type === 'info' && <AlertCircle className="w-3 h-3" />}
              {item.type === 'achievement' && <Award className="w-3 h-3" />}
              {item.type === 'agenda' && <Calendar className="w-3 h-3" />}
            </span>
            <span className="font-medium">{t(`navbar.running_text.${item.type}`)}:</span> {item.content}
          </span>
        ))}
      </div>
    </div>
  );
};
