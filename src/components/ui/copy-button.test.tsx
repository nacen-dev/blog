import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CopyButton } from "./copy-button";

describe("CopyButton", () => {
  it("should copy the text to clipboard", async () => {
    const textToCopy = "test copy";
    const user = userEvent.setup();

    const { getByRole } = render(<CopyButton text={textToCopy} />);
    const button = getByRole("button");
    await user.click(button);
    const copiedText = await navigator.clipboard.readText();
    expect(copiedText).toEqual(textToCopy);
  });
});
