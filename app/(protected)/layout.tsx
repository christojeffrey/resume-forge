import NavBar from "./_components/navbar";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBar />
      {children}
    </div>
  );
}
