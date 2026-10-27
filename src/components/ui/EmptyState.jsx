import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

export default function EmptyState({ icon = 'bag', title, text, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft text-gold-dark">
        <Icon name={icon} size={34} strokeWidth={1.6} />
      </span>
      <h2 className="mt-6 font-display text-3xl text-espresso">{title}</h2>
      {text && <p className="mt-2 text-espresso-500">{text}</p>}
      {action && (
        <Button href={action.href} size="lg" className="mt-7">
          {action.label}
        </Button>
      )}
    </div>
  );
}
