import Client, { Environment, Local } from "./generatedApi";

export const BaseURL = import.meta.env.PROD ? Environment("staging") : Local

export const client = new Client(BaseURL)
