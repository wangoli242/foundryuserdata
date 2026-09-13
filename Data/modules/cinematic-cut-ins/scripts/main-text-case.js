const PRESERVE_MAIN_TEXT_CASE_CLASS = "preserve-main-text-case";

export function shouldPreserveMainTextCase(data = {}) {
  return (
    data?.preserveMainTextCase === true || data?.preserveMainTextCase === "on"
  );
}

export function applyMainTextCaseClass(element, data = {}) {
  element?.classList?.toggle(
    PRESERVE_MAIN_TEXT_CASE_CLASS,
    shouldPreserveMainTextCase(data),
  );
}
