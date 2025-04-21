'use client';

export interface FiltroReferencias {
  fechaInicio: string;
  fechaFin: string;
  montoMin: string;
  montoMax: string;
  estado: string;
  busqueda: string;
}

export default function FiltrosReferences({
  filtro,
  onFiltroChange,
}: {
  filtro: FiltroReferencias;
  onFiltroChange: (nuevo: FiltroReferencias) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded shadow items-center">
      <input
        type="date"
        value={filtro.fechaInicio}
        onChange={(e) => onFiltroChange({ ...filtro, fechaInicio: e.target.value })}
        className="border p-2 rounded text-sm text-gray-700"
        title="Fecha de inicio"
      />
      <input
        type="date"
        value={filtro.fechaFin}
        onChange={(e) => onFiltroChange({ ...filtro, fechaFin: e.target.value })}
        className="border p-2 rounded text-sm text-gray-700"
        title="Fecha de fin"
      />
      <input
        type="number"
        min={0}
        value={filtro.montoMin}
        onChange={(e) => onFiltroChange({ ...filtro, montoMin: e.target.value })}
        className="border p-2 rounded w-28 text-sm text-gray-700"
        placeholder="Monto mín"
      />
      <input
        type="number"
        min={0}
        value={filtro.montoMax}
        onChange={(e) => onFiltroChange({ ...filtro, montoMax: e.target.value })}
        className="border p-2 rounded w-28 text-sm text-gray-700"
        placeholder="Monto máx"
      />
      <select
        value={filtro.estado}
        onChange={(e) => onFiltroChange({ ...filtro, estado: e.target.value })}
        className="border p-2 rounded text-sm text-gray-700"
      >
        <option value="">Todos los estados</option>
        <option value="01">Creado</option>
        <option value="02">Pagado</option>
        <option value="03">Cancelado</option>
        <option value="04">Expirado</option>
      </select>
      <input
        type="text"
        value={filtro.busqueda}
        onChange={(e) => onFiltroChange({ ...filtro, busqueda: e.target.value })}
        className="border p-2 rounded text-sm text-gray-700 w-64"
        placeholder="Buscar por referencia o descripción"
      />
    </div>
  );
}
