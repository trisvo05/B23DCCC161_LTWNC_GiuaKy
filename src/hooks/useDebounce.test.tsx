import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  it("chỉ cập nhật giá trị sau khoảng trễ", () => {
    jest.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: "a" } });
    rerender({ value: "abc" });
    expect(result.current).toBe("a");
    act(() => { jest.advanceTimersByTime(299); });
    expect(result.current).toBe("a");
    act(() => { jest.advanceTimersByTime(1); });
    expect(result.current).toBe("abc");
    jest.useRealTimers();
  });
});
