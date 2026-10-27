export default function ColorDots({ colors, size = 16 }) {
  return (
    <ul className="flex items-center gap-1.5" aria-label="Available colors">
      {colors.map((color) => (
        <li key={color.name} title={color.name}>
          <span
            className="block rounded-full ring-1 ring-espresso/15"
            style={{ width: size, height: size, backgroundColor: color.hex }}
          />
        </li>
      ))}
    </ul>
  );
}
