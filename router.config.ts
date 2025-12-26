/**
 * Router Configuration for Southern Apparels ERP
 *
 * LINKS - Frontend navigation paths (for Next.js routing)
 * PATHS - Backend API endpoint paths (for API calls)
 */

import { API_LIMITS } from "@/lib/config";

// ============================================================================
// LINKS - Frontend Routes
// ============================================================================

export const LINKS = {
  // Auth Routes (Root Level)
  HOME: "/" as const,
  LOGIN: "/login" as const,
  REGISTER: "/register" as const,
  FORGOT_PASSWORD: "/forgot-password" as const,

  // Dashboard
  DASHBOARD: () => ({
    path: "/dashboard/erp" as const,
  }),

  // Client Management
  CLIENTS: {
    BUYERS: () => ({ path: "/dashboard/erp/clients/buyers" as const }),
    SUPPLIERS: () => ({ path: "/dashboard/erp/clients/suppliers" as const }),
    CONTACTS: () => ({ path: "/dashboard/erp/clients/contacts" as const }),
    SHIPPING: () => ({ path: "/dashboard/erp/clients/shipping" as const }),
    BANKING: () => ({ path: "/dashboard/erp/clients/banking" as const }),
  } as const,

  // Samples Department
  SAMPLES: {
    LIST: () => ({ path: "/dashboard/erp/samples" as const }),
    STYLE_SUMMARY: () => ({
      path: "/dashboard/erp/samples/style-summary" as const,
    }),
    STYLE_VARIANTS: () => ({
      path: "/dashboard/erp/samples/style-variants" as const,
    }),
    ADD_MATERIAL: () => ({
      path: "/dashboard/erp/samples/add-material" as const,
    }),
    REQUIRED_MATERIALS: () => ({
      path: "/dashboard/erp/samples/required-materials" as const,
    }),
    PRIMARY: () => ({ path: "/dashboard/erp/samples/primary" as const }),
    TNA: () => ({ path: "/dashboard/erp/samples/tna" as const }),
    PLAN: () => ({ path: "/dashboard/erp/samples/plan" as const }),
    OPERATIONS: () => ({ path: "/dashboard/erp/samples/operations" as const }),
    SMV: () => ({ path: "/dashboard/erp/samples/smv" as const }),
    MRP: () => ({ path: "/dashboard/erp/samples/mrp" as const }),
  } as const,

  // Orders
  ORDERS: {
    LIST: () => ({ path: "/dashboard/erp/orders" as const }),
    DETAIL: (orderId: string | number) => ({
      path: `/dashboard/erp/orders/${orderId}` as const,
    }),
  } as const,

  // Other Modules
  PRODUCTION: () => ({ path: "/dashboard/erp/production" as const }),
  INVENTORY: () => ({ path: "/dashboard/erp/inventory" as const }),
  REPORTS: () => ({ path: "/dashboard/erp/reports" as const }),
  USERS: () => ({ path: "/dashboard/erp/users" as const }),
  STYLES: () => ({ path: "/dashboard/erp/styles" as const }),
} as const;

// ============================================================================
// PATHS - Backend API Endpoints
// ============================================================================

export const PATHS = {
  // Authentication
  AUTH: {
    LOGIN: () => ({ root: "/auth/login" as const }),
    LOGOUT: () => ({ root: "/auth/logout" as const }),
    REGISTER: () => ({ root: "/auth/register" as const }),
    ME: () => ({ root: "/auth/me" as const }),
    FORGOT_PASSWORD: () => ({ root: "/auth/forgot-password" as const }),
    RESET_PASSWORD: () => ({ root: "/auth/reset-password" as const }),
  } as const,

  // Users
  USERS: {
    LIST: (limit?: number) => ({
      root: `/users${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/users/${id}` as const }),
    CREATE: () => ({ root: "/users" as const }),
    UPDATE: (id: number) => ({ root: `/users/${id}` as const }),
    DELETE: (id: number) => ({ root: `/users/${id}` as const }),
  } as const,

  // Buyers
  BUYERS: {
    LIST: (limit?: number) => ({
      root: `/buyers${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/buyers/${id}` as const }),
    CREATE: () => ({ root: "/buyers" as const }),
    UPDATE: (id: number) => ({ root: `/buyers/${id}` as const }),
    DELETE: (id: number) => ({ root: `/buyers/${id}` as const }),
  } as const,

  // Suppliers
  SUPPLIERS: {
    LIST: (limit?: number) => ({
      root: `/suppliers${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/suppliers/${id}` as const }),
    CREATE: () => ({ root: "/suppliers" as const }),
    UPDATE: (id: number) => ({ root: `/suppliers/${id}` as const }),
    DELETE: (id: number) => ({ root: `/suppliers/${id}` as const }),
  } as const,

  // Contacts
  CONTACTS: {
    LIST: (limit?: number) => ({
      root: `/contacts${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/contacts/${id}` as const }),
    CREATE: () => ({ root: "/contacts" as const }),
    UPDATE: (id: number) => ({ root: `/contacts/${id}` as const }),
    DELETE: (id: number) => ({ root: `/contacts/${id}` as const }),
  } as const,

  // Shipping
  SHIPPING: {
    LIST: (limit?: number) => ({
      root: `/shipping${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/shipping/${id}` as const }),
    CREATE: () => ({ root: "/shipping" as const }),
    UPDATE: (id: number) => ({ root: `/shipping/${id}` as const }),
    DELETE: (id: number) => ({ root: `/shipping/${id}` as const }),
  } as const,

  // Banking
  BANKING: {
    LIST: (limit?: number) => ({
      root: `/banking${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/banking/${id}` as const }),
    CREATE: () => ({ root: "/banking" as const }),
    UPDATE: (id: number) => ({ root: `/banking/${id}` as const }),
    DELETE: (id: number) => ({ root: `/banking/${id}` as const }),
  } as const,

  // Samples
  SAMPLES: {
    LIST: (limit?: number) => ({
      root: `/samples${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/samples/${id}` as const }),
    BY_SAMPLE_ID: (sampleId: string) => ({
      root: `/samples/by-sample-id/${sampleId}` as const,
    }),
    CREATE: () => ({ root: "/samples" as const }),
    UPDATE: (id: number) => ({ root: `/samples/${id}` as const }),
    DELETE: (id: number) => ({ root: `/samples/${id}` as const }),
    OPERATIONS: (sampleId: number) => ({
      root: `/samples/operations?sample_id=${sampleId}` as const,
    }),
    CREATE_OPERATION: () => ({ root: "/samples/operations" as const }),
  } as const,

  // Styles
  STYLES: {
    LIST: (limit?: number) => ({
      root: `/samples/styles${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.STYLES}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/samples/styles/${id}` as const }),
    CREATE: () => ({ root: "/samples/styles" as const }),
    UPDATE: (id: number) => ({ root: `/samples/styles/${id}` as const }),
    DELETE: (id: number) => ({ root: `/samples/styles/${id}` as const }),
  } as const,

  // Style Variants
  STYLE_VARIANTS: {
    LIST: (styleSummaryId?: number, limit?: number) => ({
      root: `/samples/style-variants${styleSummaryId ? `?style_summary_id=${styleSummaryId}&` : "?"}limit=${limit || API_LIMITS.STYLE_VARIANTS}` as const,
    }),
    DETAIL: (id: number) => ({
      root: `/samples/style-variants/${id}` as const,
    }),
    CREATE: () => ({ root: "/samples/style-variants" as const }),
    UPDATE: (id: number) => ({
      root: `/samples/style-variants/${id}` as const,
    }),
    DELETE: (id: number) => ({
      root: `/samples/style-variants/${id}` as const,
    }),
  } as const,

  // Required Materials
  REQUIRED_MATERIALS: {
    LIST: (styleVariantId?: number) => ({
      root: `/samples/required-materials${styleVariantId ? `?style_variant_id=${styleVariantId}` : ""}` as const,
    }),
    DETAIL: (id: number) => ({
      root: `/samples/required-materials/${id}` as const,
    }),
    CREATE: () => ({ root: "/samples/required-materials" as const }),
    UPDATE: (id: number) => ({
      root: `/samples/required-materials/${id}` as const,
    }),
    DELETE: (id: number) => ({
      root: `/samples/required-materials/${id}` as const,
    }),
  } as const,

  // Orders
  ORDERS: {
    LIST: (limit?: number) => ({
      root: `/orders${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/orders/${id}` as const }),
    CREATE: () => ({ root: "/orders" as const }),
    UPDATE: (id: number) => ({ root: `/orders/${id}` as const }),
    DELETE: (id: number) => ({ root: `/orders/${id}` as const }),
  } as const,

  // Materials
  MATERIALS: {
    LIST: (limit?: number) => ({
      root: `/materials${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/materials/${id}` as const }),
    CREATE: () => ({ root: "/materials" as const }),
    UPDATE: (id: number) => ({ root: `/materials/${id}` as const }),
    DELETE: (id: number) => ({ root: `/materials/${id}` as const }),
  } as const,

  // Master Data
  MASTER: {
    COLORS: {
      LIST: (category?: string) => ({
        root: `/master/colors${category ? `?category=${category}&` : "?"}is_active=true` as const,
      }),
      DETAIL: (id: number) => ({ root: `/master/colors/${id}` as const }),
      CREATE: () => ({ root: "/master/colors" as const }),
      UPDATE: (id: number) => ({ root: `/master/colors/${id}` as const }),
      DELETE: (id: number) => ({ root: `/master/colors/${id}` as const }),
      SEED_DEFAULTS: () => ({ root: "/master/seed-defaults" as const }),
    } as const,
    SIZES: {
      LIST: (category?: string) => ({
        root: `/master/sizes${category ? `?category=${category}&` : "?"}is_active=true` as const,
      }),
      DETAIL: (id: number) => ({ root: `/master/sizes/${id}` as const }),
      CREATE: () => ({ root: "/master/sizes" as const }),
      UPDATE: (id: number) => ({ root: `/master/sizes/${id}` as const }),
      DELETE: (id: number) => ({ root: `/master/sizes/${id}` as const }),
    } as const,
  } as const,

  // Production
  PRODUCTION: {
    LIST: (limit?: number) => ({
      root: `/production${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/production/${id}` as const }),
    CREATE: () => ({ root: "/production" as const }),
    UPDATE: (id: number) => ({ root: `/production/${id}` as const }),
    DELETE: (id: number) => ({ root: `/production/${id}` as const }),
  } as const,

  // Inventory
  INVENTORY: {
    LIST: (limit?: number) => ({
      root: `/inventory${limit ? `?limit=${limit}` : `?limit=${API_LIMITS.DEFAULT}`}` as const,
    }),
    DETAIL: (id: number) => ({ root: `/inventory/${id}` as const }),
    CREATE: () => ({ root: "/inventory" as const }),
    UPDATE: (id: number) => ({ root: `/inventory/${id}` as const }),
    DELETE: (id: number) => ({ root: `/inventory/${id}` as const }),
  } as const,

  // Reports
  REPORTS: {
    DASHBOARD: () => ({ root: "/reports/dashboard" as const }),
    EXPORT: (type: string) => ({ root: `/reports/export/${type}` as const }),
  } as const,
} as const;

// ============================================================================
// Type Exports
// ============================================================================

export type LinksType = typeof LINKS;
export type PathsType = typeof PATHS;
