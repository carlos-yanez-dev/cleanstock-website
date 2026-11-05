export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} role="alert" className="field-error"><span className="font-semibold">Error: </span>{message}</p>;
}
