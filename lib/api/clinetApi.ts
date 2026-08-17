import { AxiosError } from "axios";
import { api } from "./api";
import { LoginRequest, RegisterRequest } from "@/types/auth";
import { User } from "@/types/user";
import {
  TransactionResponse,
  CreateTransaction,
  transaction,
} from "@/types/transaction";

export const userLogin = async (data: LoginRequest) => {
  try {
    const res = await api.post("/api/auth/login", data);
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
    const response = await api.post("/api/auth/register", data);
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
  try {
    const response = await api.get<User>("/api/profile/me");
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      try {
        await api.post("/api/auth/refresh");

        const retryResponse = await api.get<User>("/api/profile/me");

        return retryResponse.data;
      } catch {
        throw new Error("Сесія закінчилася. Увійдіть знову.");
      }
    }
    let message = "Не вдалося завантажити профіль";

    if (
      axiosError.response?.data &&
      typeof axiosError.response.data === "object"
    ) {
      const data = axiosError.response.data as Record<string, unknown>;

      const maybeMessage =
        (data.message as string | undefined) ||
        (data.error as string | undefined);

      message = maybeMessage || message;
    } else if (axiosError.message) {
      message = axiosError.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new Error(message);
  }
};

export const logout = async (): Promise<void> => {
  await api.post("/api/auth/logout");
};

export const fetchTransaction = async (
  page: number,
  search?: string,
  amount?: number,
  sort?: "asc" | "desc",
) => {
  try {
    const response = await api.get<TransactionResponse>("/api/transaction", {
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
    const response = await api.get<transaction>(`/api/trnasaction/${id}`);
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
