import { useEffect } from "react";

/**
 * Hook untuk mengupdate title dan meta description secara dinamis
 * sesuai halaman yang sedang aktif - bagus untuk SEO
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    // Update title
    const prevTitle = document.title;
    document.title = title
      ? `${title} | RSHI  Rumah Sehat Haji Irawan`
      : "RSHI  Rumah Sehat Totok Punggung Haji Irawan";

    // Update meta description
    let metaDesc = document.querySelector("meta[name=\"description\"]");
    const prevDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (metaDesc && description) {
      metaDesc.setAttribute("content", description);
    }

    // Cleanup: kembalikan title saat komponen unmount
    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute("content", prevDesc);
      }
    };
  }, [title, description]);
}

