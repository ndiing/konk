const config = require("./config");
const mssql = require("mssql/msnodesqlv8");

const pools = {};

function get(name, config) {
    if (!pools[name]) {
        if (!config) {
            throw new Error("Pool does not exist");
        }
        const pool = new mssql.ConnectionPool(config);
        const close = pool.close.bind(pool);
        pool.close = (...args) => {
            delete pools[name];
            return close(...args);
        };
        pools[name] = pool.connect();
    }
    return pools[name];
}

function closeAll() {
    return Promise.all(Array.from(pools.values()).map((connect) => connect.then((pool) => pool.close())));
}

async function tables() {
    try {
        const pool = await get("information_schema", config.mssql.config);
        const request = pool.request();
        const response = await request.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES t`);
        return response.recordset.map((record) => record.TABLE_NAME);
    } catch (error) {
        throw error;
    }
}

async function columns(TABLE_NAME) {
    try {
        const pool = await get("information_schema", config.mssql.config);
        const request = pool.request();
        request.input("TABLE_NAME", TABLE_NAME);
        const response = await request.query(`SELECT
    c.COLUMN_NAME,
    c.COLUMN_DEFAULT,
    c.IS_NULLABLE,
    c.DATA_TYPE,
    c.CHARACTER_MAXIMUM_LENGTH,
    tc.CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.COLUMNS c
OUTER APPLY(
    SELECT tc.* FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
    AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
    WHERE kcu.TABLE_NAME = c.TABLE_NAME
    AND kcu.COLUMN_NAME = c.COLUMN_NAME
) tc
WHERE c.TABLE_NAME = @TABLE_NAME`);
        return response.recordset.map((record) => {
            record.DATA_TYPE = Object.keys(mssql).find((key) => new RegExp(`^${key}$`, "i").test(record.DATA_TYPE));
            record.CHARACTER_MAXIMUM_LENGTH;
            if (record.CHARACTER_MAXIMUM_LENGTH) {
                record.DATA_TYPE += `(${record.CHARACTER_MAXIMUM_LENGTH})`;
            }
            record.IS_NULLABLE = record.IS_NULLABLE == "YES";
            if (record.COLUMN_DEFAULT) {
                record.COLUMN_DEFAULT = record.COLUMN_DEFAULT.replace(/\(\((.*?)\)\)/g, "$1")
                    .replace(/\((.*?)\)/g, "$1")
                    .replace(/'(.*?)'/g, "$1");
            }
            return record;
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    pools,
    get,
    closeAll,
};

/*prettier-ignore*/
(async () => {
const query ={}
query.require = (table, columns) => `
const { ${Array.from(new Set(columns.map(col=>col.DATA_TYPE?.split('(')[0]))).join(', ')} } = require("mssql/msnodesqlv8");
`
query.input = (table, columns) => `
${[
    {DATA_TYPE:'Int',COLUMN_NAME:'page'},
    {DATA_TYPE:'Int',COLUMN_NAME:'limit'},
    {DATA_TYPE:'DateTime',COLUMN_NAME:'from_date'},
    {DATA_TYPE:'DateTime',COLUMN_NAME:'to_date'},
].concat(columns).map(col=>`request.input("${col.COLUMN_NAME}", ${col.DATA_TYPE}, payload.${col.COLUMN_NAME});`).join('\r\n')}
`
query.declare = (table, columns) => `
DECLARE
${[
    {DATA_TYPE:'Int',COLUMN_NAME:'page'},
    {DATA_TYPE:'Int',COLUMN_NAME:'limit'},
    {DATA_TYPE:'DateTime',COLUMN_NAME:'from_date'},
    {DATA_TYPE:'DateTime',COLUMN_NAME:'to_date'},
].concat(columns).map(col=>`@${col.COLUMN_NAME} ${col.DATA_TYPE}`).join(',\r\n')}
`
query.insert = (table, columns) => `
INSERT INTO ${table} (
    ${columns.filter(col=>!(col.DATA_TYPE=='Int'&&col.CONSTRAINT_TYPE == 'PRIMARY KEY')).map(col=>col.COLUMN_NAME).join(',\r\n    ')}
)
VALUES (
    ${columns.filter(col=>!(col.DATA_TYPE=='Int'&&col.CONSTRAINT_TYPE == 'PRIMARY KEY')).map(col=>`@${col.COLUMN_NAME}`).join(',\r\n    ')}
)
`
query.update = (table, columns) => `
UPDATE ${table} SET
    ${columns.filter(col => !(col.CONSTRAINT_TYPE == 'PRIMARY KEY')).map(col=>`${col.COLUMN_NAME} = @${col.COLUMN_NAME}`).join(',\r\n    ')}
WHERE ${columns.filter(col => col.CONSTRAINT_TYPE == 'PRIMARY KEY').map(col=>`${col.COLUMN_NAME} = @${col.COLUMN_NAME}`).join('\r\nAND ')}
`
query.delete = (table, columns) => `
DELETE FROM ${table}
WHERE ${columns.filter(col => col.CONSTRAINT_TYPE == 'PRIMARY KEY').map(col=>`${col.COLUMN_NAME} = @${col.COLUMN_NAME}`).join('\r\nAND ')}
`
query.select = (table, columns) => `
SELECT
    ${columns.map(col=>col.COLUMN_NAME).join(',\r\n    ')}
FROM ${table}
${columns.filter(col=>col.DATA_TYPE=='DateTime').length?`WHERE ${columns.filter(col=>col.DATA_TYPE=='DateTime').map(col=>`${col.COLUMN_NAME} BETWEEN @from_date AND @to_date`).join('\r\nAND ')}\r\n`:``}ORDER BY (SELECT NULL)
OFFSET ((@page-1)*@limit) ROWS
FETCH NEXT @limit ROWS ONLY

SELECT 
    COUNT(*) AS total,
    @page AS page,
    @limit AS limit,
    @from_date AS from_date,
    @to_date AS to_date
FROM ${table}
${columns.filter(col=>col.DATA_TYPE=='DateTime').length?`WHERE ${columns.filter(col=>col.DATA_TYPE=='DateTime').map(col=>`${col.COLUMN_NAME} BETWEEN @from_date AND @to_date`).join('\r\nAND ')}\r\n`:``}
`
var tableAll
 = await tables();
for (const table of tableAll) {
    const columAll = await columns(table);
    let code = ''
    code+='-- start'
    // code += query.declare(table,columAll)
    // code += query.insert(table,columAll)
    // code += query.select(table,columAll)
    // code += query.update(table,columAll)
    // code += query.delete(table,columAll)
    code += query.require(table,columAll)
    // code += query.input(table,columAll)
    code+='-- end'
    console.log(code)
}
})//();
