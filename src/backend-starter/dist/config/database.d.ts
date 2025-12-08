import mysql from 'mysql2/promise';
declare const pool: mysql.Pool;
export declare const testConnection: () => Promise<boolean>;
export declare const query: <T = unknown>(sql: string, params?: Array<string | number | Date | null>) => Promise<T>;
export default pool;
//# sourceMappingURL=database.d.ts.map