export async function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout))
}
