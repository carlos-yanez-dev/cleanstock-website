import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import FoundationPage from "@/app/page";

describe("foundation smoke", () => {
  it("renders readable content without browser APIs or providers", () => {
    const html = renderToStaticMarkup(createElement(FoundationPage));
    expect(html).toContain("Foundation preview");
    expect(html).toContain("<main");
  });
});
