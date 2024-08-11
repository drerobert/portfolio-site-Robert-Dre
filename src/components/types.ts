export interface TestCase {
  name: string;
  test: () => boolean | Promise<boolean>;
}

export interface TestResult {
  name: string;
  passed: boolean;
}