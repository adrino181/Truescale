export async function settlePromise<T>(
  promise: Promise<T>
): Promise<
  { status: "success"; value: T } | { status: "rejected"; reason: unknown }
> {
  return promise
    .then((value) => ({ status: "success" as const, value }))
    .catch((reason) => ({ status: "rejected" as const, reason }));
}
