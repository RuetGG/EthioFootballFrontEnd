import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '../../lib/i18n/useTranslation';

interface FreshnessBadgeProps {
  source: string;
  freshness: string;
}

/**
 * Component to display data source and freshness information
 * Shows when the data was last updated in a human-readable format
 */
export default function FreshnessBadge({ source, freshness }: FreshnessBadgeProps) {
  const { t } = useTranslation();
  
  const getTimeAgo = (isoString: string) => {
    try {
      return formatDistanceToNow(new Date(isoString));
    } catch {
      return 'unknown';
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
      <div className="flex items-center gap-2">
        <span className="font-medium">{t('compare.source')}:</span>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          {source}
        </span>
      </div>
      <span className="text-gray-400">•</span>
      <span>
        {t('compare.updatedAgo', { time: getTimeAgo(freshness) })}
      </span>
    </div>
  );
}
