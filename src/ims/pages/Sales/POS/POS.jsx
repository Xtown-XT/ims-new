import React, { useMemo, useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiMinus,
  FiShoppingCart,
  FiTag,
  FiRefreshCw,
  FiChevronDown,
  FiSettings,
} from "react-icons/fi";
import { FaUsers, FaRegCreditCard, FaMoneyBillAlt } from "react-icons/fa";

import LenovoIdeaPad3 from "../../Sales/assets/LenovoIdeaPad3.png";
import Bold from "../../Sales/assets/Bold.png";
import NikeJordan from "../../Sales/assets/NikeJordan.png";
import AppleWatch from "../../Sales/assets/AppleWatch.png";
import Iphone14Pro from "../../Sales/assets/Iphone14Pro.png";

const sampleProducts = [
  { id: 1, title: "IPhone 14 64GB", category: "Mobiles", price: 15800, img: Iphone14Pro },
  { id: 2, title: "MacBook Pro", category: "Laptops", price: 1000, img: LenovoIdeaPad3 },
  { id: 3, title: "Rolex Tribute V3", category: "Watches", price: 6800, img: AppleWatch },
  { id: 4, title: "Red Nike Angelo", category: "Shoes", price: 7800, img: NikeJordan },
  { id: 5, title: "Airpod 2", category: "Headset", price: 5478, img: Bold },
  { id: 6, title: "IdeaPad Slim 5 Gen 7", category: "Laptops", price: 1454, img: LenovoIdeaPad3 },
  { id: 7, title: "Tablet 1.02 inch", category: "Computer", price: 4744, img: LenovoIdeaPad3 },
  { id: 8, title: "Fossil Pair Of 3 in 1", category: "Watches", price: 789, img: AppleWatch },
];

const categories = [
  "All",
  "Headset",
  "Shoes",
  "Mobiles",
  "Watches",
  "Laptops",
  "Appliance",
  "Computer",
];

export default function POS() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "Walk in Customer",
    phone: "",
    email: "",
    bonus: 148,
    loyalty: 20,
    country: "",
    city: "",
    address: ""
  });

  useEffect(() => {
    const layoutWrapper = document.querySelector(".ant-layout.ant-layout-has-sider");

    if (layoutWrapper) {
      const sider = layoutWrapper.querySelector(".ant-layout-sider");
      const innerLayout = layoutWrapper.querySelector(".ant-layout");
      const content = layoutWrapper.querySelector(".ant-layout-content");
      const header = document.querySelector(".ant-layout-header");

      if (sider) sider.style.display = "none";
      if (header) header.style.display = "none";
      if (innerLayout) {
        innerLayout.style.width = "100%";
        innerLayout.style.marginLeft = "0px";
        innerLayout.style.flex = "1";
      }
      if (content) {
        content.style.width = "100%";
        content.style.marginLeft = "0px";
        content.style.padding = "0px";
      }

      layoutWrapper.style.display = "block";
      layoutWrapper.style.width = "100%";
      layoutWrapper.style.flexDirection = "column";
    }

    return () => {
      const layoutCheck = document.querySelector(".ant-layout.ant-layout-has-sider");
      if (layoutCheck) {
        const siderCheck = layoutCheck.querySelector(".ant-layout-sider");
        const innerCheck = layoutCheck.querySelector(".ant-layout");
        const contentCheck = layoutCheck.querySelector(".ant-layout-content");
        const headerCheck = document.querySelector(".ant-layout-header");

        if (siderCheck) siderCheck.style.display = "";
        if (headerCheck) headerCheck.style.display = "";
        if (innerCheck) {
          innerCheck.style.width = "";
          innerCheck.style.marginLeft = "";
          innerCheck.style.flex = "";
        }
        if (contentCheck) {
          contentCheck.style.width = "";
          contentCheck.style.marginLeft = "";
          contentCheck.style.padding = "";
        }
        layoutCheck.style.display = "";
        layoutCheck.style.flexDirection = "";
        layoutCheck.style.width = "";
      }
    };
  }, []);

  const filtered = useMemo(() => {
    return sampleProducts.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (query.trim() === "") return true;
      return p.title.toLowerCase().includes(query.toLowerCase());
    });
  }, [selectedCategory, query]);

  function addToOrder(product) {
    setOrderItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setOrderItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  }

  function clearOrder() {
    setOrderItems([]);
  }

  const subtotal = orderItems.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50 text-slate-800">
      <div className="flex w-full gap-4 px-6 pt-6 pb-24">
        <div className="flex gap-6 flex-1">
          <div className="w-24 md:w-32 flex-shrink-0 border-r border-gray-200 pr-3">
            <div className="flex flex-col gap-3 sticky top-6" style={{ alignItems: "center" }}>
              {categories.map((c) => {
                const active = selectedCategory === c;
                const categoryImages = {
                  All: Iphone14Pro,
                  Headset: Bold,
                  Shoes: NikeJordan,
                  Mobiles: Iphone14Pro,
                  Watches: AppleWatch,
                  Laptops: LenovoIdeaPad3,
                  Appliance: Bold,
                  Computer: LenovoIdeaPad3,
                };
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`w-20 flex flex-col items-center justify-center py-3 px-2 rounded-lg border transition-all duration-200 ${active ? "border-orange-400 bg-white shadow-md" : "bg-white/80 hover:bg-white"
                      }`}
                    title={c}
                  >
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center mb-2 overflow-hidden ${active ? "bg-orange-50" : "bg-gray-50"
                        }`}
                    >
                      <img
                        src={categoryImages[c]}
                        alt={c}
                        className="object-contain w-8 h-8"
                      />
                    </div>
                    <span
                      className={`text-xs font-medium text-center ${active ? "text-orange-500" : "text-slate-600"
                        }`}
                    >
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 pl-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                Welcome, Wesley Adrian
              </h2>
              <div className="text-sm text-slate-500 mt-1">December 24, 2024</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="relative w-full md:w-72">
                <FiSearch className="absolute left-3 top-3 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Product"
                  className="pl-10 pr-4 py-2.5 w-full border rounded-lg bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-lg text-white bg-slate-900 shadow-md text-sm font-medium hover:bg-slate-800 transition-all">
                  View All Brands
                </button>

                <button
                  onClick={() => setFeaturedOnly((s) => !s)}
                  className={`px-5 py-2.5 rounded-lg text-white shadow-md text-sm font-medium flex items-center gap-2 transition-all ${featuredOnly
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-orange-500 hover:bg-orange-600"
                    }`}
                >
                  <FiTag />
                  Featured
                </button>
              </div>
            </div>

            <div
              className="overflow-y-auto pr-2"
              style={{
                height: "calc(100vh - 110px)",
                scrollbarWidth: "thin",
                scrollbarColor: "#cbd5e1 #f1f5f9",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-green-400 transition-all duration-200 flex flex-col justify-between relative"
                  >
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs opacity-0">
                      ✓
                    </div>

                    <div className="flex-1">
                      <div className="h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="object-contain h-full w-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="text-xs text-slate-500 mb-1">{p.category}</div>
                      <div className="font-semibold text-sm">{p.title}</div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-lg font-bold text-slate-800">${p.price}</div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => addToOrder(p)}
                          className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-500 transition-colors"
                        >
                          <FiMinus className="text-sm" />
                        </button>

                        <span className="text-sm font-medium px-2">4</span>

                        <button
                          onClick={() => addToOrder(p)}
                          className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center hover:bg-orange-100 hover:text-orange-500 transition-colors"
                        >
                          <FiPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 lg:w-96 flex-shrink-0">
          <div
            className="bg-white rounded-lg border shadow-sm p-4 overflow-y-auto"
            style={{
              height: "calc(100vh - 110px)",
              position: "relative",
              scrollbarWidth: "thin",
              scrollbarColor: "#cbd5e1 #f1f5f9",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Order List</h3>
              <div className="flex gap-2 items-center">
                <div className="text-xs px-3 py-1 rounded-md bg-slate-900 text-white">#ORD123</div>
                <button className="text-red-500 text-lg">🗑</button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Customer Information</label>
              <div className="flex gap-2">
                <select
                  className="flex-1 border rounded-lg px-3 py-2.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                >
                  <option>Walk in Customer</option>
                  <option>James Anderson</option>
                </select>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  <FaUsers />
                </button>
                <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <FiChevronDown />
                </button>
              </div>

              {customerData.name === "James Anderson" && (
                <div className="mt-3 border-2 border-orange-300 bg-orange-50 rounded-xl p-4">
                  <div className="font-bold text-lg text-slate-800 mb-3">{customerData.name}</div>
                  <div className="flex items-center gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">Bonus :</span>
                      <span className="px-3 py-1.5 bg-cyan-500 text-white rounded-md font-bold text-base">
                        148
                      </span>
                    </div>
                    <div className="text-slate-300 font-bold">|</div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">Loyalty :</span>
                      <span className="px-3 py-1.5 bg-emerald-500 text-white rounded-md font-bold text-base">
                        $20
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCustomerModal(true)}
                    className="w-full py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold shadow-md transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-md font-semibold">
                  Order Details <span className="text-slate-400 text-sm ml-2">Items : {orderItems.length}</span>
                </h4>
                <button onClick={clearOrder} className="text-sm text-rose-500 hover:text-rose-600 font-medium">
                  Clear all
                </button>
              </div>

              {orderItems.length === 0 ? (
                <div className="text-sm text-slate-500 text-center py-8">
                  No items in order. Click product to add.
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-12 gap-2 bg-slate-50 px-3 py-2 border-b text-xs font-semibold text-slate-600">
                    <div className="col-span-6">Item</div>
                    <div className="col-span-3 text-center">QTY</div>
                    <div className="col-span-3 text-right">Cost</div>
                  </div>

                  <div className="divide-y">
                    {orderItems.map((it) => (
                      <div key={it.id} className="grid grid-cols-12 gap-2 px-3 py-3 items-center hover:bg-gray-50">
                        <div className="col-span-6 flex items-center gap-2">
                          <button
                            onClick={() => changeQty(it.id, -it.qty)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            🗑️
                          </button>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-800 truncate">{it.title}</div>
                          </div>
                        </div>

                        <div className="col-span-3 flex items-center justify-center gap-2">
                          <button
                            onClick={() => changeQty(it.id, -1)}
                            className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-slate-600"
                          >
                            −
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{it.qty}</span>
                          <button
                            onClick={() => changeQty(it.id, +1)}
                            className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-slate-600"
                          >
                            +
                          </button>
                        </div>

                        <div className="col-span-3 text-right">
                          <div className="text-sm font-semibold text-slate-800">${(it.price * it.qty).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm flex items-center justify-between">
                <div>
                  <div className="font-semibold text-purple-700">Discount 5%</div>
                  <div className="text-xs text-purple-600">
                    For $20 Minimum Purchase, all Items
                  </div>
                </div>
                <div className="text-purple-700">−</div>
              </div>
            </div>

            <div className="mb-4 border-t pt-4">
              <h4 className="text-md font-semibold mb-2">Payment Summary</h4>
              <div className="flex justify-between text-sm mb-1">
                <div>Shipping</div>
                <div>$40.21</div>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <div>Tax</div>
                <div>$25</div>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <div>Coupon</div>
                <div>$25</div>
              </div>

              <div className="flex justify-between items-center text-lg font-bold">
                <div>Sub Total</div>
                <div>${subtotal.toLocaleString()}</div>
              </div>
              <div className="mt-3 text-xl font-extrabold">
                Total Payable ${subtotal.toLocaleString()}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Select Payment</h4>
              <div className="grid grid-cols-3 gap-3">
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">💵</span>
                  <span>Cash</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">💳</span>
                  <span>Card</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">⭐</span>
                  <span>Points</span>
                </button>

                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">👛</span>
                  <span>Deposit</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">📝</span>
                  <span>Cheque</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">🎁</span>
                  <span>Gift Card</span>
                </button>

                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">📱</span>
                  <span>Scan</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border bg-white hover:bg-gray-50">
                  <span className="text-2xl">💰</span>
                  <span>Pay Later</span>
                </button>
                <button className="col-span-1 flex items-center gap-2 justify-center py-3 rounded-lg border-2 border-orange-400 bg-white hover:bg-orange-50">
                  <span className="text-2xl">🔌</span>
                  <span className="text-orange-500 font-semibold">External</span>
                </button>

                <button className="col-span-3 py-3 rounded-lg border bg-white hover:bg-gray-50 flex items-center gap-2 justify-center">
                  <span className="text-2xl">🤝</span>
                  <span>Split Bill</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button className="flex-1 py-3 rounded-lg border bg-white hover:bg-gray-100">
                Print Order
              </button>
              <button className="flex-1 py-3 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
                Place Order
              </button>
            </div>

            <button
              className="fixed right-8 bottom-40 w-12 h-12 rounded-full bg-orange-400 text-white shadow-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              title="Quick settings"
              style={{ zIndex: 40 }}
            >
              <FiSettings />
            </button>
          </div>
        </div>
      </div>

      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Add Customer</h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-white hover:bg-white/20 rounded-sm w-8 h-8 flex items-center justify-center transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerData.name}
                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Walk in Customer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Enter Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Country
                  </label>
                  <select
                    value={customerData.country}
                    onChange={(e) => setCustomerData({ ...customerData, country: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white"
                  >
                    <option>Choose</option>
                    <option>United States</option>
                    <option>India</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={customerData.city}
                    onChange={(e) => setCustomerData({ ...customerData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Enter City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Enter Address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Loyalty Point
                  </label>
                  <input
                    type="number"
                    value={customerData.loyalty}
                    onChange={(e) => setCustomerData({ ...customerData, loyalty: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Bonus Point
                  </label>
                  <input
                    type="number"
                    value={customerData.bonus}
                    onChange={(e) => setCustomerData({ ...customerData, bonus: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Customer Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors cursor-pointer bg-white">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-orange-500 font-semibold mb-1">
                      Click to upload <span className="text-slate-500 font-normal">or drag and drop</span>
                    </p>
                    <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-8 py-2.5 border border-gray-300 rounded hover:bg-gray-50 font-medium text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCustomerModal(false)}
                  className="px-8 py-2.5 bg-orange-500 text-white rounded hover:bg-orange-600 font-medium transition-all"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed left-0 right-0 bottom-0 bg-white/95 border-t py-4 z-50">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-lg bg-orange-500 text-white flex items-center gap-2 shadow hover:bg-orange-600">
            <div className="w-3 h-3 bg-white rounded"></div> Hold
          </button>

          <button className="px-6 py-3 rounded-lg bg-blue-600 text-white flex items-center gap-2 shadow hover:bg-blue-700">
            Void
          </button>

          <button className="px-6 py-3 rounded-lg bg-teal-500 text-white flex items-center gap-2 shadow hover:bg-teal-600">
            Payment
          </button>

          <button className="px-6 py-3 rounded-lg bg-slate-900 text-white flex items-center gap-2 shadow hover:bg-slate-800">
            View Orders
          </button>

          <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white flex items-center gap-2 shadow hover:bg-indigo-700">
            Reset
          </button>

          <button className="px-6 py-3 rounded-lg bg-red-500 text-white flex items-center gap-2 shadow hover:bg-red-600">
            Transaction
          </button>
        </div>
      </div>
    </div>
  );
}