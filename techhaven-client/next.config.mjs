/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            // Basic redirect
            {
                source: "/",
                destination: "/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
