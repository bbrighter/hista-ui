import { isRouteErrorResponse } from "react-router-dom";

import { isAPIError } from "../api/generatedApi";

export const withErrorHandling = async <T>(
	fn: () => Promise<T>,
): Promise<T | null> => {
	try {
		return await fn();
	} catch (error) {
		if (isAPIError(error) && error.status === 503) {
			try {
				await new Promise((r) => setTimeout(r, 500));
				return await fn();
			} catch (retryError) {
				return onError(retryError);
			}
		}
		if (error) {
			return onError(error);
		}
		return null;
	}
};

const onError = (err: unknown) => {
	if (isAPIError(err)) {
		switch (err.status) {
			case 401:
			case 404:
				return null;
			default:
				errorBus.emit("error", err);
				return null;
		}
	}
	errorBus.emit("error", err);
	return null;
};

type AppError = {
	text: string;
	status?: number;
	details?: string;
	stack?: string;
	source: "router" | "api" | "unknown";
};

export const toAppError = (error: unknown): AppError => {
	if (isRouteErrorResponse(error)) {
		return {
			text: error.statusText,
			status: error.status,
			details: JSON.stringify(error.data ?? "Keine Details"),
			source: "router",
		};
	}
	if (isAPIError(error)) {
		return {
			status: error.status,
			text: error.message,
			details: error.details,
			stack: error.stack,
			source: "api",
		};
	}
	if (error instanceof Error) {
		return {
			stack: error.stack,
			text: error.message,
			details: error.name,
			source: "unknown",
		};
	}
	return {
		source: "unknown",
		text: "Unbekannter Fehler",
		details: JSON.stringify(error),
	};
};

import mitt from "mitt";

type Events = {
	error: unknown;
};

export const errorBus = mitt<Events>();
