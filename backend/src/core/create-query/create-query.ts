export function createQuery(table: string, params: object): string {
  const query: string = `SELECT * FROM public.${table} WHERE `;
  const queryParams: string[] = [];
  Object.keys(params).forEach(key => {
    const options = getOptions(key);
    if (options.lookup) {
      queryParams.push(getLookupParam(table, options.lookup, options.field, params[key]));
    } else {
      queryParams.push(getParam(table, options.field, params[key]));
    }
  });
  return `${query}${queryParams.join(' AND ')};`;
}

function getOptions(key: string): { field: string, lookup: string } {
  const [field, lookup] = key.split('__');
  return { field: field, lookup: lookup };
}

function getParam(table: string, field: string, value: any): string {
  if (value) {
    return `${table}."${field}" = ${value}`;
  } else {
    return `${table}."${field}" IS Null`;
  }
}

function getLookupParam(table: string, lookup: string, field: string, value: any): string {
  switch (lookup) {
    case 'in':
      return getLookupInParam(table, field, value);
    case 'icontains':
      // ToDo: сделать для icontains
      return getLookupInParam(table, field, value);
  }
}

function getLookupInParam(table: string, field: string, value: string): string {
  const params: string[] = [];
  value.split(',').forEach(item => params.push(getParam(table, field, item)));
  return `(${params.join(' OR ')})`;
}
