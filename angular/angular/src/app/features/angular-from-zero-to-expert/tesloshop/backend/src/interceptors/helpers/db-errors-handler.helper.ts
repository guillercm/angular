import { DBError } from "../interfaces/db-error.interface";

const APP_NAME = process.env.APP_NAME

export const getContextDBError = ({ table }: DBError): string => {
  switch (table) {
    case 'users':
      return 'auth';
  }
  return '';
}

export const getFieldDBError = ({detail}: DBError): string | null | object => {
  const regex = /\((.+?)\)=\((.+?)\)/g;
  const results = {};
  let strField = null;
  for (const [_, field, value] of detail.matchAll(regex)) {
    results[field] = value;
    strField = field;
  }
  return {
    field: strField,
    data: results
  }
}

export const getSpecificErrorDBError = ({routine}: DBError): string => {
  return routine.replace("_bt_check_", "")

}

export const getDBError = (error: DBError) => {
  const field = getFieldDBError(error);
  return {
    "databaseError": {
      "feature": APP_NAME,
      "context": getContextDBError(error),
      "field": field,
      "error_type": getSpecificErrorDBError(error)
    },
  }
}


