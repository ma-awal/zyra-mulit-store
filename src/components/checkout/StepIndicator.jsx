import Icon from '@/components/ui/Icon';

export default function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center" aria-label="Checkout progress">
      {steps.map((label, index) => {
        const number = index + 1;
        const done = number < current;
        const active = number === current;
        return (
          <li key={label} className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
            <span className="flex items-center gap-2" aria-current={active ? 'step' : undefined}>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                  done || active ? 'bg-gold text-espresso shadow-glow' : 'border border-cream-300 bg-cream-50 text-espresso-400'
                }`}
              >
                {done ? <Icon name="check" size={16} strokeWidth={3} /> : number}
              </span>
              <span className={`hidden text-sm font-medium sm:block ${active ? 'text-espresso' : 'text-espresso-400'}`}>{label}</span>
            </span>
            {index < steps.length - 1 && (
              <span className="mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                <span
                  className="block h-full bg-gold transition-all duration-700 ease-out"
                  style={{ width: done ? '100%' : '0%' }}
                />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
