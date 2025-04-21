# 📘 ReferenciasApp – Puntored

Este proyecto es una aplicación web desarrollada con **Next.js 15**, diseñada para gestionar **pagos referenciados**. Permite autenticar usuarios, crear nuevas referencias, visualizar su detalle, cancelar referencias, aplicar filtros avanzados, exportar datos y visualizar métricas gráficas.

---

## 🚀 Características

- 🔐 Autenticación con token JWT (API externa).
- 💳 Creación y visualización de referencias de pago.
- ❌ Cancelación de referencias con confirmación.
- 🔍 Filtros avanzados por:
  - Fecha de creación
  - Estado (creado, pagado, cancelado, expirado)
  - Rango de montos
  - Búsqueda por texto
- 📁 Exportación a CSV del listado filtrado.
- 📊 Paginación local.
- 📈 Gráficas dinámicas con **Chart.js**.
- 🎨 UI responsive con **TailwindCSS**.
- ⚙️ Estado global con **Redux Toolkit**.
- 🧩 Páginas personalizadas de error (404 y 500).

---

## 🧑‍💻 Tecnologías usadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- [PapaParse](https://www.papaparse.com/) (CSV)
- [jsPDF](https://github.com/parallax/jsPDF) (PDF)

---

## Local

Para usarlo local, ejecuta estos dos comandos

npm install
npm run dev