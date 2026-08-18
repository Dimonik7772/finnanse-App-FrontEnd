import { AxiosError } from "axios";
import { api, refreshApi } from "./api";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/user";
import {
  TransactionResponse,
  CreateTransaction,
  transactions,
} from "@/types/transaction";
import toast from "react-hot-toast";

export const userLogin = async (data: LoginRequest) => {
  try {
    const res = await api.post("/login", data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw new Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Невірні дані для входу");
    }

    if (error instanceof Error) {
      throw error;
    }
  }

  throw new Error("Щось пішло не так. Спробуйте пізніше.");
};

export const userRegister = async (data: RegisterRequest) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Помилка реєстрації");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Щось пішло не так при реєстрації");
  }
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/getMe");

  return response.data;
};

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config;
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }
    if (originRequest._retry) {
      return Promise.reject(error);
    }
    originRequest._retry = true;
    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi.post("refresh").finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;

      return api(originRequest);
    } catch {
      return Promise.reject(error);
    }
  },
);

export const logout = async (): Promise<void> => {
  await api.post("/logout");
};

export const fetchTransaction = async (
  page: number,
  search?: string,
  amount?: number,
  sort?: "asc" | "desc",
) => {
  try {
    const response = await api.get<TransactionResponse>("/transaction", {
      params: {
        page,
        perPage: 8,
        ...(search ? { search } : {}),
        ...(amount !== undefined ? { amount } : {}),
        ...(sort ? { sort } : {}),
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Щось пішло не так, спробуйте пізніше");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Щось пішло не так, спробуйте пізніше");
  }
};

export const fetchTransactionById = async (id: string) => {
  try {
    const response = await api.get<transactions>(`/api/trnasaction/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Щось пішло не так, спробуйте пізніше");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Щось пішло не так, спробуйте пізніше");
  }
};

export const deleteTransaction = async (id: string) => {
  await api.delete(`/deleteTransation/${id}`);
};

export const createTransaction = async (data: CreateTransaction) => {
  try {
    const response = await api.post("/createTransaction", data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Щось пішло не так, спробуйте пізніше");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Щось пішло не так, спробуйте пізніше");
  }
};
export const updateTransaction = async (
  data: CreateTransaction,
  id: string,
) => {
  try {
    const response = await api.patch(`/transaction/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (
        error.code === "ECONNREFUSED" ||
        error.message?.includes("Network Error") ||
        !error.response
      ) {
        throw Error("Сервер недоступний.");
      }

      const serverMessage = error.response?.data?.message || error.message;

      throw new Error(serverMessage || "Щось пішло не так, спробуйте пізніше");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("Щось пішло не так, спробуйте пізніше");
  }
};
