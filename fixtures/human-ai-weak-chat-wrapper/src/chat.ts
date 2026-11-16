export async function chat(text: string, model: { complete(input: string): Promise<string> }) {
  return model.complete(text)
}
