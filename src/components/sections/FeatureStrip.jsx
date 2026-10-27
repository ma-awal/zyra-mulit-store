import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

export default function FeatureStrip({ items }) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 rounded-[28px] border border-cream-200 bg-cream-50 px-5 py-7 shadow-soft lg:grid-cols-4 lg:gap-0 lg:px-4">
          {items.map((item, index) => (
            <li key={item.title} className={index > 0 ? 'lg:border-l lg:border-cream-200' : ''}>
              <Reveal variant="up" delay={index * 100} className="flex flex-col items-center gap-3 text-center lg:flex-row lg:gap-4 lg:px-8 lg:text-left">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                  <Icon name={item.icon} size={24} strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{item.title}</span>
                  <span className="block text-sm text-espresso-500">{item.text}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
