interface Field {
  field: string;
  value: string;
}

interface DatabaseError {
  feature:    string;
  context:    string;
  fields:     Field[];
  error_type: string;
}

export interface DatabaseErrorResponse {
  code:          string;
  databaseError: DatabaseError;
}


