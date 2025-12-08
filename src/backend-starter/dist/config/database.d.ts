import mysql from 'mysql2/promise';
declare const pool: mysql.Pool;
export declare const testConnection: () => Promise<boolean>;
export declare const query: <T = any>(sql: string, params?: any[]) => Promise<T>;
export default pool;
//# sourceMappingURL=database.d.ts.map