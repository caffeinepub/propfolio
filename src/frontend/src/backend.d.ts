import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Account {
    id: string;
    balance: number;
    owner: Principal;
    name: string;
    createdAt: Time;
    updatedAt: Time;
    accountType: string;
    currency: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface Payout {
    certificateDocument?: ExternalBlob;
    accountId: string;
    owner: Principal;
    invoiceDocument?: ExternalBlob;
    payoutId: string;
    propFirm: string;
    currency: string;
    amount: number;
    payoutDate: Time;
}
export interface PayoutInput {
    certificateDocument?: ExternalBlob;
    accountId: string;
    invoiceDocument?: ExternalBlob;
    propFirm: string;
    currency: string;
    amount: number;
    payoutDate: Time;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface AccountInput {
    balance: number;
    name: string;
    accountType: string;
    currency: string;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    customPropFirms: Array<string>;
    name: string;
    createdAt: Time;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAccount(input: AccountInput): Promise<Account>;
    addCustomPropFirm(propFirm: string): Promise<void>;
    addPayout(input: PayoutInput): Promise<Payout>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteAccount(accountId: string): Promise<boolean>;
    getAccount(accountId: string): Promise<Account | null>;
    getAccounts(): Promise<Array<Account>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPayout(payoutId: string): Promise<Payout | null>;
    getPayouts(): Promise<Array<Payout>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateAccount(accountId: string, input: AccountInput): Promise<Account>;
}
