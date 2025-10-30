// Sidebar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/Dark Logo.png";
import settings from "../assets/technology.png";
import salesIcon from "../assets/sales.png";
import { useTheme } from "../../context/ThemeContext";
import { UpOutlined, DownOutlined, ShoppingOutlined } from "@ant-design/icons";

// SubSidebar Component
const SubSidebar = ({ parentItem, collapsed }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, primaryColor } = useTheme();
  const [openSubSubMenuKey, setOpenSubSubMenuKey] = useState(null);
  const [hoveredKey, setHoveredKey] = useState(null);

  const containerStyles = {
    height: "100%",
    width: collapsed ? "170px" : "200px",
    backgroundColor: theme === "dark" ? "#374151" : "#f3f4f6",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    paddingTop: "0rem",
    position: "absolute",
    left: collapsed ? "80px" : "200px",
    top: 0,
    zIndex: 999,
    borderLeft: `1px solid ${theme === "dark" ? "#4b5563" : "#e5e7eb"}`,
    display: "flex",
    flexDirection: "column",
  };

  const baseMenuItemStyles = {
    padding: collapsed ? "0.5rem" : "0.5rem 1rem",
    cursor: "pointer",
    color: theme === "dark" ? "#d1d5db" : "#374151",
    margin: "0.25rem 0.5rem",
    borderRadius: "0.25rem",
    display: "flex",
    alignItems: "center",
    fontSize: collapsed ? "0.8rem" : "0.9rem",
  };

  const getMenuItemStyles = (itemKey, hasChildren) => {
    const isActivePath = pathname === itemKey;
    const isHovered = hoveredKey === itemKey;
    const isDropdownOpen = openSubSubMenuKey === itemKey && hasChildren;

    let styles = { ...baseMenuItemStyles };

    if (isActivePath) {
      styles.backgroundColor = theme === "dark" ? "#4b5563" : "#e5e7eb";
      styles.color = theme === "dark" ? "#ffffff" : primaryColor;
      styles.fontWeight = "bold";
    } else if (isHovered || isDropdownOpen) {
      styles.backgroundColor = theme === "dark" ? "#4b5563" : "#e5e7eb";
      styles.color = theme === "dark" ? "#ffffff" : primaryColor;
    }

    return styles;
  };

  const getSubSubMenuItemStyles = (itemKey) => {
    const isActive = pathname === itemKey;
    const isHovered = hoveredKey === itemKey;

    let styles = {
      ...baseMenuItemStyles,
      paddingLeft: collapsed ? "1rem" : "1.75rem",
      fontSize: collapsed ? "0.75rem" : "0.85rem",
      margin: "0.1rem 0.5rem",
    };

    if (isActive || isHovered) {
      styles.backgroundColor = theme === "dark" ? "#4b5563" : "#e0e7ff";
      styles.color = theme === "dark" ? "#ffffff" : primaryColor;
      styles.fontWeight = "bold";
    }

    return styles;
  };

  const handleSubItemClick = (subItem) => {
    if (subItem.children && subItem.children.length > 0) {
      setOpenSubSubMenuKey(openSubSubMenuKey === subItem.key ? null : subItem.key);
    } else if (subItem.key !== "sales") {
      // Don't navigate for the sales menu item itself
      navigate(subItem.key);
    }
  };

  return (
    <div style={containerStyles}>
      <div
        style={{
          display: "flex",
          padding: "0.75rem 1rem",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: theme === "dark" ? "#ffffff" : "#111827",
            fontSize: "1rem",
          }}
        >
          {parentItem.label}
        </span>
      </div>
      <div style={{ padding: "0.5rem", overflowY: "auto", flexGrow: 1 }}>
        {parentItem.children.map((subItem) => (
          <div key={subItem.key}>
            <div
              style={getMenuItemStyles(subItem.key, subItem.children?.length > 0)}
              onClick={() => handleSubItemClick(subItem)}
              onMouseEnter={() => setHoveredKey(subItem.key)}
              onMouseLeave={() => setHoveredKey(null)}
            >
              {subItem.icon && (
                <span
                  style={{
                    marginRight: collapsed ? "0.25rem" : "0.5rem",
                    color:
                      pathname === subItem.key ||
                      openSubSubMenuKey === subItem.key
                        ? primaryColor
                        : "inherit",
                  }}
                >
                  {subItem.icon}
                </span>
              )}
              <span>{subItem.label}</span>
              {subItem.children?.length > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.7rem",
                    color: openSubSubMenuKey === subItem.key ? primaryColor : "inherit",
                  }}
                >
                  {openSubSubMenuKey === subItem.key ? <UpOutlined /> : <DownOutlined />}
                </span>
              )}
            </div>
            {openSubSubMenuKey === subItem.key && subItem.children && (
              <div
                style={{
                  paddingTop: "0.25rem",
                  paddingBottom: "0.25rem",
                  paddingLeft: collapsed ? "0.5rem" : "1rem",
                }}
              >
                {subItem.children.map((subSubItem) => (
                  <div
                    key={subSubItem.key}
                    style={getSubSubMenuItemStyles(subSubItem.key)}
                    onClick={() => navigate(subSubItem.key)}
                    onMouseEnter={() => setHoveredKey(subSubItem.key)}
                    onMouseLeave={() => setHoveredKey(null)}
                  >
                    {subSubItem.icon && (
                      <span
                        style={{
                          marginRight: collapsed ? "0.25rem" : "0.5rem",
                          color: pathname === subSubItem.key ? primaryColor : "inherit",
                        }}
                      >
                        {subSubItem.icon}
                      </span>
                    )}
                    <span>{subSubItem.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// MAIN SIDEBAR
const Sidebar = ({ collapsed, menuItems = [], selectedParent, setSelectedParent }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme, primaryColor, sidebarBgColor } = useTheme();
  const [hoveredKey, setHoveredKey] = useState(null);

  const containerStyles = {
    height: "100%",
    width: collapsed ? "80px" : "200px",
    backgroundColor: theme === "dark" ? "#1f2937" : sidebarBgColor,
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    paddingTop: "0.5rem",
    position: "relative",
  };

  const getMenuItemStyles = (itemKey) => {
    const isActive = pathname === itemKey || selectedParent?.key === itemKey;
    const isHovered = hoveredKey === itemKey;

    let styles = {
      padding: collapsed ? "0.5rem" : "0.5rem 1rem",
      cursor: "pointer",
      color: theme === "dark" ? "#d1d5db" : "#374151",
      margin: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      display: "flex",
      alignItems: "center",
      fontSize: collapsed ? "0.875rem" : "1rem",
      fontWeight: "semibold",
    };

    if (isActive || isHovered) {
      styles.backgroundColor = theme === "dark" ? "#4b5563" : "#e5e7eb";
      styles.color = theme === "dark" ? "#ffffff" : primaryColor;
    }

    return styles;
  };

  // Find POS, Sales, Invoice, Quotation, Online Order and POS Orders items from all levels
  let posItem = null;
  let salesItem = null;
  let invoiceItem = null;
  let quotationItem = null;
  let onlineOrderItem = null;
  let posOrdersItem = null;
  let imsItem = null;
  
  menuItems.forEach((item) => {
    // Check top level
    const itemKey = item.key?.toLowerCase();
    const itemLabel = item.label?.toLowerCase();
    
    if (itemKey?.includes("sales") && !itemKey?.includes("pos")) salesItem = item;
    if (itemKey?.includes("pos") && !itemKey?.includes("order")) posItem = item;
    if (itemKey?.includes("invoice")) invoiceItem = item;
    if (itemKey?.includes("quotation")) quotationItem = item;
    if (itemKey?.includes("online") && itemKey?.includes("order")) onlineOrderItem = item;
    if (itemKey?.includes("pos") && itemKey?.includes("order")) posOrdersItem = item;
    if (itemLabel?.includes("online") && itemLabel?.includes("order")) onlineOrderItem = item;
    if (itemLabel?.includes("pos") && itemLabel?.includes("order")) posOrdersItem = item;
    
    // Identify IMS item (usually contains "inventory" or is the main parent)
    if (itemKey?.includes("inventory") || itemKey?.includes("ims")) {
      imsItem = item;
    }
    
    // Check nested children
    if (item.children) {
      item.children.forEach((child) => {
        const childKey = child.key?.toLowerCase();
        const childLabel = child.label?.toLowerCase();
        
        if (childKey?.includes("sales") && !childKey?.includes("pos")) salesItem = child;
        if (childKey?.includes("pos") && !childKey?.includes("order")) posItem = child;
        if (childKey?.includes("invoice")) invoiceItem = child;
        if (childKey?.includes("quotation")) quotationItem = child;
        if (childKey?.includes("online") && childKey?.includes("order")) onlineOrderItem = child;
        if (childKey?.includes("pos") && childKey?.includes("order")) posOrdersItem = child;
        if (childLabel?.includes("online") && childLabel?.includes("order")) onlineOrderItem = child;
        if (childLabel?.includes("pos") && childLabel?.includes("order")) posOrdersItem = child;
      });
    }
  });

  // First Sales item - with ALL sales-related items as dropdown
  let firstSalesSubmenu = [];
  
  // Add original Sales children first
  if (salesItem && salesItem.children) {
    firstSalesSubmenu = [...salesItem.children];
  }
  
  // Add all other sales-related items to the dropdown
  const additionalItems = [
    posItem && {
      key: posItem.key,
      label: posItem.label,
      icon: posItem.icon,
    },
    invoiceItem && {
      key: invoiceItem.key,
      label: invoiceItem.label,
      icon: invoiceItem.icon,
    },
    quotationItem && {
      key: quotationItem.key,
      label: quotationItem.label,
      icon: quotationItem.icon,
    },
  ].filter(Boolean);
  
  firstSalesSubmenu = [...firstSalesSubmenu, ...additionalItems];

  const firstSalesMenuItem = {
    key: salesItem?.key || "sales-main",
    label: salesItem?.label || "Sales",
    icon: salesItem?.icon || (
      <img
        src={salesIcon}
        alt="Sales"
        style={{
          width: "24px",
          height: "24px",
          objectFit: "contain",
        }}
      />
    ),
    children: firstSalesSubmenu.length > 0 ? firstSalesSubmenu : undefined,
  };

  // Second Sales item - with Online Order and POS Orders dropdown
  const secondSalesSubmenu = [
    onlineOrderItem && {
      key: onlineOrderItem.key,
      label: onlineOrderItem.label,
      icon: onlineOrderItem.icon,
    },
    posOrdersItem && {
      key: posOrdersItem.key,
      label: posOrdersItem.label,
      icon: posOrdersItem.icon,
    },
  ].filter(Boolean);

  const secondSalesMenuItem = secondSalesSubmenu.length > 0 ? {
    key: "sales-orders",
    label: "Sales",
    icon: (
      <img
        src={salesIcon}
        alt="Sales"
        style={{
          width: "24px",
          height: "24px",
          objectFit: "contain",
        }}
      />
    ),
    children: secondSalesSubmenu,
  } : null;

  // Combine all items for IMS submenu
  const imsSubmenuItems = [
    firstSalesMenuItem,
    secondSalesMenuItem,
  ].filter(Boolean);

  // Process menu items: exclude sales-related items and add Sales under IMS
  const processedMenuItems = menuItems.map((item) => {
    const itemKey = item.key?.toLowerCase();
    const itemLabel = item.label?.toLowerCase();
    
    // If item itself is sales-related, exclude it
    if (itemKey?.includes("sales") || itemKey?.includes("pos") || 
        itemKey?.includes("invoice") || itemKey?.includes("quotation") ||
        (itemKey?.includes("online") && itemKey?.includes("order")) ||
        (itemLabel?.includes("online") && itemLabel?.includes("order")) ||
        (itemLabel?.includes("pos") && itemLabel?.includes("order"))) {
      return null;
    }
    
    // If item has children, filter out sales-related items from children
    let filteredChildren = [];
    if (item.children) {
      filteredChildren = item.children.filter((child) => {
        const childKey = child.key?.toLowerCase();
        const childLabel = child.label?.toLowerCase();
        return !childKey?.includes("sales") && !childKey?.includes("pos") &&
               !childKey?.includes("invoice") && !childKey?.includes("quotation") &&
               !(childKey?.includes("online") && childKey?.includes("order")) &&
               !(childLabel?.includes("online") && childLabel?.includes("order")) &&
               !(childLabel?.includes("pos") && childLabel?.includes("order"));
      });
    }
    
    // If this is the IMS item, add Sales after Inventory
    const isImsItem = itemKey?.includes("inventory") || itemKey?.includes("ims") || 
                      item === imsItem;
    
    if (isImsItem) {
      // Find the inventory child
      const inventoryIndex = filteredChildren.findIndex(child => 
        child.key?.toLowerCase().includes("inventory")
      );
      
      // Insert all sales items right after Inventory
      if (inventoryIndex !== -1) {
        filteredChildren.splice(inventoryIndex + 1, 0, ...imsSubmenuItems);
      } else {
        // If no inventory found, add sales items at the beginning
        filteredChildren.unshift(...imsSubmenuItems);
      }
    }
    
    return {
      ...item,
      children: filteredChildren.length > 0 ? filteredChildren : undefined,
    };
  }).filter(Boolean);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div style={containerStyles}>
        <div style={{ padding: "0.5rem", height: "calc(100% - 100px)", fontWeight: "500" }}>
          {/* IMS Items (with Sales inside IMS, below Inventory) */}
          {processedMenuItems.map((item) => (
            <div
              key={item.key}
              style={getMenuItemStyles(item.key)}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onClick={() => {
                if (item.children) {
                  setSelectedParent(selectedParent?.key === item.key ? null : item);
                } else {
                  navigate(item.key);
                }
              }}
            >
              {item.icon && (
                <span
                  style={{
                    marginRight: collapsed ? "0" : "0.5rem",
                    color:
                      pathname === item.key || selectedParent?.key === item.key
                        ? primaryColor
                        : "inherit",
                  }}
                >
                  {item.icon}
                </span>
              )}
              {!collapsed && <span className="text-sm font-semibold">{item.label}</span>}
            </div>
          ))}
        </div>

        {/* Settings */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "0",
            right: "0",
            display: "flex",
            justifyContent: "center",
            padding: "0.5rem",
          }}
        >
         
          <div
            style={{
              ...getMenuItemStyles("settings"),
              display: "flex",
              justifyContent: collapsed ? "center" : "flex-start",
              alignItems: "center",
              cursor: "pointer",
              width: collapsed ? "50px" : "80%",
              padding: collapsed ? "0.5rem 0.25rem" : "0.5rem 1rem",
            }}
            onClick={() => navigate("/settings")}
            onMouseEnter={() => setHoveredKey("settings")}
            onMouseLeave={() => setHoveredKey(null)}
          >
            <span
              style={{
                marginRight: collapsed ? "0" : "0.5rem",
                color: hoveredKey === "settings" ? primaryColor : "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={settings}
                alt="Settings"
                style={{
                  width: collapsed ? "24px" : "26px",
                  height: collapsed ? "24px" : "26px",
                }}
              />
            </span>
            {!collapsed && <span>Settings</span>}
          </div>
        </div>
      </div>

      {/* SubSidebar for items with children (including Sales under IMS) */}
      {selectedParent && selectedParent.children && (
        <SubSidebar
          parentItem={selectedParent}
          collapsed={collapsed}
        />
      )}
    </div>
  );
};

export default Sidebar;