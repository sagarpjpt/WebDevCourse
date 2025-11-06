
import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Prefer token from Redux, otherwise no auth header (if API is public)
        const authToken = token ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbTAxMTIxOTk5cHJhamFwYXRpQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY5MDQ4YjNmMzJhM2QyMzNjNjZiNzA3ZiIsInJvbGUiOiJTdHVkZW50IiwiaWF0IjoxNzYyNDQwNjQyLCJleHAiOjE3NjI0NDc4NDJ9.ux5cerLmFwmMFzttWOxf8-L7DmIYVv73sP7CoUY-GJg";

        const res = await apiConnector(
          "GET",
          categories.CATEGORIES_API,
          null,
          authToken ? { Authorization: `Bearer ${authToken}` } : {}
        );

        if (res && res.data) {
          // adapt to API shape
          setSubLinks(res.data.categories || res.data || []);
        }
      } catch (e) {
        console.error("Could not fetch the category list", e);
        setSubLinks([]); // fallback
      }
    };

    fetchCategories();
  }, [token]); // refetch if token changes

  // helper to close mobile on navigation
  const handleNavigate = () => {
    setMobileOpen(false);
    setMobileCatalogOpen(false);
  };

  return (
    <header className="bg-transparent">
      <div className="flex h-14 items-center border-b-2 border-b-richblack-700">
        <div className="flex w-10/12 max-w-maxContent mx-auto items-center justify-between">
          {/* logo */}
          <Link to={"/"} onClick={handleNavigate} className="flex items-center">
            <img
              src={logo}
              alt="App Logo"
              width={160}
              height={42}
              loading="lazy"
            />
          </Link>

          {/* Desktop nav - hidden on small screens */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25 items-center">
              {NavbarLinks.map((link, index) => (
                <li key={index} className="relative">
                  {link.title === "Catalog" ? (
                    /* Desktop Catalog: hover dropdown */
                    <div className="group relative hover:text-yellow-25">
                      <button
                        type="button"
                        className={`flex items-center gap-1 text-sm font-medium ${
                          location.pathname === link.path ? "text-yellow-25" : ""
                        }`}
                        aria-haspopup="menu"
                        aria-expanded="false"
                      >
                        <span>{link.title}</span>
                        <IoIosArrowDropdownCircle className="text-xl group-hover:rotate-180 transition-transform duration-200" />
                      </button>

                      {/* Hover dropdown */}
                      <div
                        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-2
                          absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[320px] z-20 rounded-md bg-richblack-5 p-3 border border-richblack-100
                          transition-all duration-200"
                        role="menu"
                      >
                        <div className="absolute left-1/2 -translate-x-1/2 -top-2 h-4 w-4 rotate-45 bg-richblack-5 border-t border-l border-richblack-100" />
                        {subLinks.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {subLinks.map((el, idx) => (
                              <Link
                                key={idx}
                                to={`/catalog/${encodeURIComponent(el.name)}`}
                                onClick={handleNavigate}
                              >
                                <span className="block text-richblack-900 hover:bg-richblack-50 rounded-lg py-3 px-4 text-sm font-semibold transition-all duration-150">
                                  {el.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="text-richblack-900 p-4 text-center text-sm">
                            No Categories Found
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} onClick={handleNavigate}>
                      <span
                        className={`group relative transition-all duration-200 ${
                          location.pathname === link.path ? "text-yellow-25" : ""
                        }`}
                      >
                        {link.title}
                        <span className="absolute hidden group-hover:block h-[2px] w-full bottom-[-5px] bg-yellow-50 transition-all duration-200" />
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right-side actions - hidden on very small screens? keep them visible on md */}
          <div className="hidden md:flex gap-x-4 items-center">
            {user && user?.role !== "Instructor" && (
              <Link to="/dashboard/cart" className="relative" onClick={handleNavigate}>
                <AiOutlineShoppingCart className="text-white text-2xl" />
                {Array.isArray(totalItems) && totalItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 text-yellow-50 text-xs bg-richblack-700 px-2 py-0.5 rounded-full font-semibold">
                    {totalItems.length}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <>
                <Link to="/login" onClick={handleNavigate}>
                  <button className="px-5 py-2 text-white border-richblack-700 bg-richblack-800 rounded-md text-sm cursor-pointer">
                    Log In
                  </button>
                </Link>
                <Link to="/signup" onClick={handleNavigate}>
                  <button className="px-5 py-2 text-white border-richblack-700 bg-richblack-800 rounded-md text-sm cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            {token !== null && <ProfileDropDown />}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((p) => !p)}
              className="p-2 text-white"
            >
              {mobileOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (slideover / dropdown) */}
      <div
        className={`md:hidden fixed inset-0 z-30 transition-transform duration-200 ${
          mobileOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Background overlay */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div className="relative bg-richblack-900 text-richblack-25 w-full max-h-screen overflow-auto">
          <div className="w-11/12 mx-auto py-6">
            {/* header inside mobile menu */}
            <div className="flex items-center justify-between mb-6">
              <Link to="/" onClick={handleNavigate}>
                <img src={logo} alt="logo" width={130} height={36} />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2"
              >
                <HiOutlineX className="text-2xl" />
              </button>
            </div>

            {/* nav links */}
            <nav>
              <ul className="flex flex-col gap-2">
                {NavbarLinks.map((link, idx) => (
                  <li key={idx} className="border-b border-richblack-700 pb-2">
                    {link.title === "Catalog" ? (
                      <div>
                        <button
                          onClick={() => setMobileCatalogOpen((p) => !p)}
                          className="w-full flex items-center justify-between py-3 px-2 text-left"
                          aria-expanded={mobileCatalogOpen}
                        >
                          <span className="text-lg font-medium">{link.title}</span>
                          <IoIosArrowDropdownCircle
                            className={`text-xl transition-transform duration-200 ${
                              mobileCatalogOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* mobile catalog contents (accordion) */}
                        <div
                          className={`overflow-hidden transition-max-h duration-300 ${
                            mobileCatalogOpen ? "max-h-[800px] mt-2" : "max-h-0"
                          }`}
                          aria-hidden={!mobileCatalogOpen}
                        >
                          {subLinks.length > 0 ? (
                            <div className="flex flex-col gap-2 px-2">
                              {subLinks.map((el, i) => (
                                <Link
                                  key={i}
                                  to={`/catalog/${encodeURIComponent(el.name)}`}
                                  onClick={handleNavigate}
                                  className="block rounded-md py-3 px-3 hover:bg-richblack-800 text-richblack-25"
                                >
                                  {el.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="px-3 py-3 text-sm text-richblack-200">
                              No Categories Found
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={handleNavigate}
                        className="block w-full py-3 px-2 text-lg"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* actions at bottom of mobile menu */}
            <div className="mt-6 flex flex-col gap-3">
              {user && user?.role !== "Instructor" && (
                <Link
                  to="/dashboard/cart"
                  className="flex items-center gap-2"
                  onClick={handleNavigate}
                >
                  <AiOutlineShoppingCart className="text-2xl" />
                  <span>Cart {Array.isArray(totalItems) ? `(${totalItems.length})` : ""}</span>
                </Link>
              )}

              {token === null ? (
                <div className="flex gap-2">
                  <Link to="/login" onClick={handleNavigate} className="flex-1">
                    <button className="w-full px-5 py-2 text-white border-richblack-700 bg-richblack-800 rounded-md text-sm">
                      Log In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={handleNavigate} className="flex-1">
                    <button className="w-full px-5 py-2 text-white border-richblack-700 bg-richblack-800 rounded-md text-sm">
                      Sign Up
                    </button>
                  </Link>
                </div>
              ) : (
                <div>
                  <ProfileDropDown />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
