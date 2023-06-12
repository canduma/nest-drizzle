export declare const user: import("drizzle-orm/db.d-a6fe1b19").au<{
    name: "user";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgSerial<{
            tableName: "user";
            name: "id";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
        }>;
        name: import("drizzle-orm/pg-core").PgText<{
            tableName: "user";
            name: "name";
            data: string;
            enumValues: [string, ...string[]];
            driverParam: string;
            notNull: false;
            hasDefault: false;
        }>;
        email: import("drizzle-orm/pg-core").PgText<{
            tableName: "user";
            name: "email";
            data: string;
            enumValues: [string, ...string[]];
            driverParam: string;
            notNull: false;
            hasDefault: false;
        }>;
        password: import("drizzle-orm/pg-core").PgText<{
            tableName: "user";
            name: "password";
            data: string;
            enumValues: [string, ...string[]];
            driverParam: string;
            notNull: false;
            hasDefault: false;
        }>;
        role: import("drizzle-orm/pg-core").PgText<{
            tableName: "user";
            name: "role";
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            data: "admin" | "customer";
        }>;
        createdAt: import("drizzle-orm/pg-core").PgTimestamp<{
            tableName: "user";
            name: "created_at";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
        }>;
        updatedAt: import("drizzle-orm/pg-core").PgTimestamp<{
            tableName: "user";
            name: "updated_at";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
        }>;
    };
}>;
