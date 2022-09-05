import { storage } from "../services/storage"

export const initializeState = (key: string, defaultValue: any) => storage.load(key) ?? defaultValue;