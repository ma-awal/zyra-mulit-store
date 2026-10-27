import site from '@/data/site.json';
import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Questions about an order or a product? Get in touch with the Zyra team.',
};

export default function ContactPage() {
  const details = [
    { icon: 'mail', label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: 'phone', label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone.replace(/[^+\d]/g, '')}` },
    { icon: 'pin', label: 'Address', value: site.contact.address },
    { icon: 'clock', label: 'Support hours', value: site.contact.hours },
  ];

  return (
    <>
      <PageHeader eyebrow="We're here to help" title="Contact Us" subtitle="Questions about an order or a product? Send us a message." />
      <section className="py-10 sm:py-14">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal variant="left">
            <ul className="space-y-3">
              {details.map((detail) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-soft text-gold-deep">
                      <Icon name={detail.icon} size={22} />
                    </span>
                    <span>
                      <span className="block text-xs font-medium uppercase tracking-[0.18em] text-espresso-400">{detail.label}</span>
                      <span className="block font-semibold">{detail.value}</span>
                    </span>
                  </>
                );
                const cls = 'flex items-center gap-4 rounded-3xl border border-cream-200 bg-cream-50 p-4 shadow-soft';
                return (
                  <li key={detail.label}>
                    {detail.href ? (
                      <a href={detail.href} className={`${cls} transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60`}>
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <Reveal variant="right">
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
