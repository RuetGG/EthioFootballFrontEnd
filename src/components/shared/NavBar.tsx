import Link from "next/link";
import { Globe, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/landing-page" },
  { name: "Chat", href: "/chat" },
  { name: "Live Hub", href: "/liveScores" },
  { name: "Compare", href: "/compare" },
  { name: "News", href: "/news" },
  { name: "Offline", href: "/Offline" },
  // { name: "My Clubs", href: "/my-clubs" },
];
const homeItems = [
  { name: "Home Page", href: "#hero" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Features", href: "#feature" },
];
function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname == "/landing-page" || pathname == "/";

  return (
    <nav
      className={`  shadow-sm ${
        isHome ? "bg-[#224F38]  fixed  w-full z-50 " : "bg-white relative"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto   w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between ">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Toggle main menu</span>
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo + desktop nav */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <div
                className={`${isHome ? "text-white" : "text-green-700"}
                   text-2xl font-bold italic `}
              >
                Logo
              </div>
            </div>
            <div className=" hidden sm:ml-6 sm:block w-full">
              <div className="flex -center justify-center  space-x-4">
                {isHome
                  ? homeItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-2 text-sm font-medium transition-colors duration-200
                         
                             text-white hover:text-green-700
                        `}
                      >
                        {item.name}
                      </Link>
                    ))
                  : navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`px-2 text-sm font-medium transition-colors duration-200 ${
                          pathname === item.href
                            ? "text-green-900 border-b-2 border-green-900 pb-1"
                            : "text-gray-700 hover:text-green-700"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
              </div>
            </div>
          </div>

          {/* Right-side icons */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown placeholder */}

            <div className="flex items-center space-x-4">
              <User className="w-5 h-5 text-gray-700 cursor-pointer" />{" "}
              <button
                className={`flex items-center border px-3 py-1 rounded-lg shadow-sm ${
                  isHome ? "bg-gray-50" : "none"
                } text-sm`}
              >
                <Globe className="w-4 h-4 mr-2" />
                ENG{" "}
              </button>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {isHome
              ? homeItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium  duration-200 text-white hover:text-[#224F38] hover:bg-white
                      ]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))
              : navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      pathname === item.href
                        ? "text-white bg-[#224F38]"
                        : "text-gray-700 hover:text-white hover:bg-[#224f3893]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
