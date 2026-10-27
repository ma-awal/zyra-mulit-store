import Image from 'next/image';
import Link from 'next/link';
import site from '@/data/site.json';

export default function Logo({ tone = 'dark', size = 'md', className = '' }) {
  const isLight = tone === 'light';
  const iconSrc = isLight ? site.logo.iconFooter : site.logo.icon;
  const iconSize = size === 'lg' ? 40 : 34;
  const textSize = size === 'lg' ? 'text-4xl' : 'text-[1.7rem] sm:text-3xl';

  return (
    <Link href="/" aria-label={`${site.name} home`} className={`inline-flex items-center gap-1.5 ${className}`}>
      <Image src={iconSrc} alt="" width={iconSize} height={iconSize} priority className="object-contain" style={{ width: iconSize, height: iconSize }} />
      <span className={`font-display leading-none ${textSize} ${isLight ? 'text-white' : 'text-espresso'}`}>{site.name}</span>
    </Link>
  );
}
