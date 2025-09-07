import type { FormResult } from '../../types/compare';

interface FormRowProps {
  form: FormResult[];
}

/**
 * Component to display recent form as colored pills
 * W = Win (green), D = Draw (yellow), L = Loss (red)
 */
export default function FormRow({ form }: FormRowProps) {

  const getFormStyle = (result: FormResult) => {
    switch (result) {
      case 'W':
        return 'bg-green-500 text-white';
      case 'D':
        return 'bg-yellow-500 text-white';
      case 'L':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getFormLabel = (result: FormResult) => {
    switch (result) {
      case 'W':
        return 'Win';
      case 'D':
        return 'Draw';
      case 'L':
        return 'Loss';
      default:
        return result;
    }
  };

  return (
    <div className="flex gap-1">
      {form.map((result, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getFormStyle(result)}`}
          aria-label={getFormLabel(result)}
          title={getFormLabel(result)}
        >
          {result}
        </div>
      ))}
    </div>
  );
}
