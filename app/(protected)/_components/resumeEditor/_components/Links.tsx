export default function Links({ data }: any) {
  return (
    <div>
      {data.map((link: any, index: number) => (
        <a href={link.href} key={index}>
          {link.text}
        </a>
      ))}
    </div>
  );
}
