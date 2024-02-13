export default function WorksGrid() {
  /*  const productRow = (product) => {
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
          {product.name}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
          {product.status}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
          {product.inventory} in stock
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
          {product.vendor}
        </td>
      </tr>
    );
  }; */

  return (
    <div className="NotFound text-center">
      <h3>Admin</h3>
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
              <a className="flex items-center gap-2 font-semibold" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                  <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
                <span className="">Graficamentehablando</span>
              </a>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  Orders
                  <div className="whitespace-nowrap border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </div>
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m7.5 4.27 9 5.15"></path>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                  Products
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Customers
                </a>
                <a
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </svg>
                  Analytics
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <a className="lg:hidden" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                <path d="M12 3v6"></path>
              </svg>
              <span className="sr-only">Home</span>
            </a>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <input
                    className="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                    placeholder="Search products..."
                    type="search"
                  />
                </div>
              </form>
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
              type="button"
              id="radix-:ra:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <img
                src="/placeholder.svg"
                width="32"
                height="32"
                className="rounded-full"
                alt="Avatar"
                /* style={{ "aspect-ratio": "32 / 32;", "object-fit": "cover;" }} */
              />
              <span className="sr-only">Toggle user menu</span>
            </button>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex items-center">
              <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 ml-auto">
                Add product
              </button>
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
                  <tbody className="[&amp;_tr:last-child]:border-0">
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
                        Glimmer Lamps
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        In Production
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        500 in stock
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Luminance Creations
                      </td>
                    </tr>
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
                        Aqua Filters
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Available for Order
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        750 in stock
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        HydraClean Solutions
                      </td>
                    </tr>
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
                        Eco Planters
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Backordered
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        300 in stock
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        GreenGrowth Designers
                      </td>
                    </tr>
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
                        Zest Juicers
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Newly Launched
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        1000 in stock
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        FreshTech Appliances
                      </td>
                    </tr>
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
                        Flexi Wearables
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Selling Fast
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                        200 in stock
                      </td>
                      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 hidden md:table-cell">
                        Vitality Gear Co.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
