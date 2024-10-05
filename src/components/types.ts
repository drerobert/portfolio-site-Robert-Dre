export interface TestCase {
  name: string;
  test: () => boolean | Promise<boolean>;
  sectionRef?: React.RefObject<HTMLElement>; // Optional sectionRef to target a section
}

export interface TestResult {
  name: string;
  passed: boolean;
}