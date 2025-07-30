export interface ImageCardProps {
    id: string;
    imageUrl: string;
    src?: string; // misal versi kompres atau proxy CDN
    alt: string;                // Alternate text (default = description/title fallback)
    title?: string;             // Judul gambar (opsional)
    description?: string;       // Deskripsi singkat
    delay?: number;             // Digunakan untuk animasi
    user?: {
        id: string;
        name: string;
        image?: string;
    };
}
