import PageHeader from '@/components/ui/PageHeader';
import Container from '@/components/ui/Container';
import Reveal from '@/components/ui/Reveal';

export default function LegalPage({ data }) {
  return (
    <>
      <PageHeader title={data.title} subtitle={`Last updated ${data.updated}`} />
      <section className="py-10 sm:py-14">
        <Container className="max-w-3xl">
          <div className="space-y-9 rounded-3xl border border-cream-200 bg-cream-50 p-6 shadow-soft sm:p-10">
            {data.sections.map((section, index) => (
              <Reveal key={section.heading} id={section.id} variant="up" delay={index * 60}>
                <h2 className="text-2xl text-espresso">{section.heading}</h2>
                <p className="mt-2 leading-relaxed text-espresso-500">{section.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
