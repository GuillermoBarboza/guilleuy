import { useEffect, useState } from "react";

export default function Admin() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {}, []);

  const orden = (orden) => {
    return (
      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          <img
            src="/placeholder.svg"
            width="64"
            height="64"
            alt="Product image"
            className="aspect-square rounded-md object-cover"
          />
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
          {orden.name}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
          {orden.status}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {orden.inventory} in stock
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
          {orden.vendor}
        </td>
      </tr>
    );
  };

  return (
    <div className="NotFound text-center">
      <h3>Admin</h3>
      <div className="grid min-h-screen w-full">
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40"></header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Ordenes</h1>
            </div>
            <div className="border shadow-sm rounded-lg">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[80px]">
                        Image
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 max-w-[150px]">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Inventory
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Vendor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&amp;_tr:last-child]:border-0"></tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
