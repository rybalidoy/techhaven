export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:w-full xl:w-2/3 mx-auto block p-2">{children}</div>
    );
}
