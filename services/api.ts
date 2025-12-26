/**
 * API Service Layer for Southern Apparels ERP
 *
 * Core API request function and service modules organized by entity
 */

import { PATHS } from "@/router.config";
import { API_CONFIG } from "@/lib/config";

// ============================================================================
// Configuration
// ============================================================================

// API base path - uses masked URL in production, falls back to direct API route
const getBasePath = () => {
  if (typeof window !== "undefined") {
    return API_CONFIG.BASE_PATH;
  }
  return API_CONFIG.BASE_PATH;
};

// ============================================================================
// Core API Response Function
// ============================================================================

/**
 * Core API request function following the established pattern
 *
 * @param basePath - Base URL for API requests
 * @param apiPath - Endpoint path (from PATHS config)
 * @param token - Optional authorization token
 * @param method - HTTP method
 * @param body - Request payload (FormData or JSON string)
 * @param addMultipartHeader - Flag for multipart form data
 */
export const getAPIResponse = async (
  basePath: string,
  apiPath: string,
  token: string | null = null,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body: FormData | string | null = null,
  addMultipartHeader = false
): Promise<any> => {
  try {
    const headers: Record<string, string> = {};

    // Add authorization header if token provided
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Set content type based on body type
    if (body) {
      if (body instanceof FormData) {
        if (addMultipartHeader) {
          // Let browser set Content-Type with boundary for FormData
          // headers["Content-Type"] = "multipart/form-data";
        }
      } else if (typeof body === "string") {
        headers["Content-Type"] = "application/json";
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      body: body ?? undefined,
    };

    const response = await fetch(`${basePath}${apiPath}`, fetchOptions);

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.detail || `API Error: ${response.status}`);
      }

      return jsonResponse;
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ============================================================================
// AUTH SERVICE
// ============================================================================

export const authService = {
  login: async (username: string, password: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.AUTH.LOGIN().root,
      null,
      "POST",
      JSON.stringify({ username, password })
    );
  },

  register: async (data: {
    username: string;
    email: string;
    password: string;
    full_name: string;
    role?: string;
    department?: string;
    designation?: string;
  }) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.AUTH.REGISTER().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  getMe: async (token: string) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.AUTH.ME().root, token, "GET");
  },

  forgotPassword: async (email: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.AUTH.FORGOT_PASSWORD().root,
      null,
      "POST",
      JSON.stringify({ email })
    );
  },

  resetPassword: async (token: string, newPassword: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.AUTH.RESET_PASSWORD().root,
      null,
      "POST",
      JSON.stringify({ token, new_password: newPassword })
    );
  },
};

// ============================================================================
// USERS SERVICE
// ============================================================================

export const usersService = {
  getAll: async (token: string, limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.USERS.LIST(limit).root, token, "GET");
  },

  getById: async (id: number, token: string) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.USERS.DETAIL(id).root, token, "GET");
  },

  create: async (
    data: {
      username: string;
      email: string;
      password: string;
      full_name: string;
      role?: string;
      department?: string;
      designation?: string;
      is_active?: boolean;
      is_superuser?: boolean;
      department_access?: string[];
    },
    token: string
  ) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.USERS.CREATE().root,
      token,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>, token: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.USERS.UPDATE(id).root,
      token,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number, token: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.USERS.DELETE(id).root,
      token,
      "DELETE"
    );
  },
};

// ============================================================================
// BUYERS SERVICE
// ============================================================================

export const buyersService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.BUYERS.LIST(limit).root, null, "GET");
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.BUYERS.DETAIL(id).root, null, "GET");
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BUYERS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BUYERS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BUYERS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// SUPPLIERS SERVICE
// ============================================================================

export const suppliersService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SUPPLIERS.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SUPPLIERS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SUPPLIERS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SUPPLIERS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SUPPLIERS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// CONTACTS SERVICE
// ============================================================================

export const contactsService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.CONTACTS.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.CONTACTS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.CONTACTS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.CONTACTS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.CONTACTS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// SHIPPING SERVICE
// ============================================================================

export const shippingService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SHIPPING.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SHIPPING.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SHIPPING.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SHIPPING.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SHIPPING.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// BANKING SERVICE
// ============================================================================

export const bankingService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BANKING.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.BANKING.DETAIL(id).root, null, "GET");
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BANKING.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BANKING.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.BANKING.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// SAMPLES SERVICE
// ============================================================================

export const samplesService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.SAMPLES.DETAIL(id).root, null, "GET");
  },

  getBySampleId: async (sampleId: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.BY_SAMPLE_ID(sampleId).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.DELETE(id).root,
      null,
      "DELETE"
    );
  },

  getOperations: async (sampleId: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.OPERATIONS(sampleId).root,
      null,
      "GET"
    );
  },

  createOperation: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.SAMPLES.CREATE_OPERATION().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },
};

// ============================================================================
// STYLES SERVICE
// ============================================================================

export const stylesService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.STYLES.LIST(limit).root, null, "GET");
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.STYLES.DETAIL(id).root, null, "GET");
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLES.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLES.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLES.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// STYLE VARIANTS SERVICE
// ============================================================================

export const styleVariantsService = {
  getAll: async (styleSummaryId?: number, limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLE_VARIANTS.LIST(styleSummaryId, limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLE_VARIANTS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLE_VARIANTS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLE_VARIANTS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.STYLE_VARIANTS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// REQUIRED MATERIALS SERVICE
// ============================================================================

export const requiredMaterialsService = {
  getAll: async (styleVariantId?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REQUIRED_MATERIALS.LIST(styleVariantId).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REQUIRED_MATERIALS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REQUIRED_MATERIALS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REQUIRED_MATERIALS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REQUIRED_MATERIALS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// ORDERS SERVICE
// ============================================================================

export const ordersService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.ORDERS.LIST(limit).root, null, "GET");
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(basePath, PATHS.ORDERS.DETAIL(id).root, null, "GET");
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.ORDERS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.ORDERS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.ORDERS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// MATERIALS SERVICE
// ============================================================================

export const materialsService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MATERIALS.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MATERIALS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MATERIALS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MATERIALS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MATERIALS.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// COLORS SERVICE
// ============================================================================

export const colorsService = {
  getAll: async (category?: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.LIST(category).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.DELETE(id).root,
      null,
      "DELETE"
    );
  },

  seedDefaults: async () => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.COLORS.SEED_DEFAULTS().root,
      null,
      "POST"
    );
  },
};

// ============================================================================
// SIZES SERVICE
// ============================================================================

export const sizesService = {
  getAll: async (category?: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.SIZES.LIST(category).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.SIZES.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.SIZES.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.SIZES.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.MASTER.SIZES.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// PRODUCTION SERVICE
// ============================================================================

export const productionService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.PRODUCTION.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.PRODUCTION.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.PRODUCTION.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.PRODUCTION.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.PRODUCTION.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// INVENTORY SERVICE
// ============================================================================

export const inventoryService = {
  getAll: async (limit?: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.INVENTORY.LIST(limit).root,
      null,
      "GET"
    );
  },

  getById: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.INVENTORY.DETAIL(id).root,
      null,
      "GET"
    );
  },

  create: async (data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.INVENTORY.CREATE().root,
      null,
      "POST",
      JSON.stringify(data)
    );
  },

  update: async (id: number, data: Record<string, any>) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.INVENTORY.UPDATE(id).root,
      null,
      "PUT",
      JSON.stringify(data)
    );
  },

  delete: async (id: number) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.INVENTORY.DELETE(id).root,
      null,
      "DELETE"
    );
  },
};

// ============================================================================
// REPORTS SERVICE
// ============================================================================

export const reportsService = {
  getDashboard: async () => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REPORTS.DASHBOARD().root,
      null,
      "GET"
    );
  },

  export: async (type: string) => {
    const basePath = getBasePath();
    return getAPIResponse(
      basePath,
      PATHS.REPORTS.EXPORT(type).root,
      null,
      "GET"
    );
  },
};

// ============================================================================
// BACKWARD COMPATIBILITY - Unified API Export
// ============================================================================

/**
 * Unified API object for backward compatibility
 * Maintains existing import patterns: import { api } from "@/services/api"
 */
export const api = {
  auth: authService,
  users: usersService,
  buyers: buyersService,
  suppliers: suppliersService,
  contacts: contactsService,
  shipping: shippingService,
  banking: bankingService,
  samples: samplesService,
  styles: stylesService,
  styleVariants: styleVariantsService,
  requiredMaterials: requiredMaterialsService,
  orders: ordersService,
  materials: materialsService,
  colors: colorsService,
  sizes: sizesService,
  production: productionService,
  inventory: inventoryService,
  reports: reportsService,
};

// ============================================================================
// Type Exports
// ============================================================================

export type ApiType = typeof api;
