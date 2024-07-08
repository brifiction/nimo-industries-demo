/**
 * Check API service health.
 *
 */
export async function health() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "OK" }),
  };
}
