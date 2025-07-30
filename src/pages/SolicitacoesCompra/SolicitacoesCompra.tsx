export function SolicitacoesCompra() {
  return (
    <div className="py-10 px-10 text-center">
      Solicitações de Compras
      <div></div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded bg-gray-300"></div>
        <div className="h-32 rounded bg-gray-300 lg:col-span-2"></div>
      </div>
    </div>
  );
}
