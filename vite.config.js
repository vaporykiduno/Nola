import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        produkter: resolve(root, "produkter/index.html"),
        produktDetalj: resolve(root, "produkter/parco/index.html"),
        kollektioner: resolve(root, "kollektioner/index.html"),
        projekt: resolve(root, "projekt/index.html"),
        projektDetalj: resolve(root, "projekt/sodermalms-torg/index.html"),
        journal: resolve(root, "journal/index.html"),
        journalArtikel: resolve(root, "journal/sakrare-stader-utan-fler-hinder/index.html"),
        omNola: resolve(root, "om-nola/index.html"),
        kontakt: resolve(root, "kontakt/index.html"),
        aterbrukFynd: resolve(root, "aterbruk-fynd/index.html"),
      },
    },
  },
});
