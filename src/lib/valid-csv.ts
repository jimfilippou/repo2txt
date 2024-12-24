/**
 * Checks if a given string is a valid comma-separated string.
 * A valid comma-separated string should not contain empty items and should not start or end with a comma.
 *
 * @param str - The string to be validated.
 * @returns `true` if the string is a valid comma-separated string, otherwise `false`.
 */
export function isValidCommaString(str: unknown): boolean {
  if (typeof str !== "string") return false;

  // Remove all spaces and check if we have a valid format
  const trimmed = str.trim();
  if (trimmed === "") return false;

  // Check if it follows the pattern: item1,item2,item3
  // This will fail for cases like ",," or "item1,,"
  return /^[^,]+(,[^,]+)*$/.test(trimmed);
}
