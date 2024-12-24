import { isValidCommaString } from "./valid-csv";
import { describe, it, expect } from "vitest";

describe("isValidCommaString", () => {
  it("should return false for non-string inputs", () => {
    expect(isValidCommaString(null)).toBe(false);
    expect(isValidCommaString(undefined)).toBe(false);
    expect(isValidCommaString(123)).toBe(false);
    expect(isValidCommaString({})).toBe(false);
    expect(isValidCommaString([])).toBe(false);
  });

  it("should return false for empty strings", () => {
    expect(isValidCommaString("")).toBe(false);
    expect(isValidCommaString("   ")).toBe(false);
  });

  it("should return true for valid comma-separated strings", () => {
    expect(isValidCommaString("item1")).toBe(true);
    expect(isValidCommaString("item1,item2")).toBe(true);
    expect(isValidCommaString("item1,item2,item3")).toBe(true);
    expect(isValidCommaString(" item1 , item2 ")).toBe(true);
  });

  it("should return false for invalid comma-separated strings", () => {
    expect(isValidCommaString(",")).toBe(false);
    expect(isValidCommaString(",item1")).toBe(false);
    expect(isValidCommaString("item1,")).toBe(false);
    expect(isValidCommaString("item1,,item2")).toBe(false);
    expect(isValidCommaString(",,,")).toBe(false);
  });
});
