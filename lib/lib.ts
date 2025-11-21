export interface ImageCardProps {
    id: string;
    imageUrl: string;
    src?: string; // misal versi kompres atau proxy CDN
    alt: string;                // Alternate text (default = description/title fallback)
    title?: string;             // Judul gambar (opsional)
    description?: string;       // Deskripsi singkat
    delay?: number;             // Digunakan untuk animasi
    onDelete?: (id: string) => void; // Callback untuk menghapus pin
    isSelected?: boolean;
    user?: {
        id: string;
        name: string;
        image?: string;
    };
}
