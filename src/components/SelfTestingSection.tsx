import React, { useState, useRef } from 'react';
import { TestCase, TestResult } from './types';
import { testCases } from './Tests';

const SelfTestingSection: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const selfTestingRef = useRef<HTMLDivElement>(null);

  const runTests = async () => {
    setIsRunning(true);
    const testResults: TestResult[] = [];

    for (const testCase of testCases) {
      // Scroll to the section before running the test if sectionRef is provided
      if (testCase.sectionRef?.current) {
        testCase.sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }

      const result = await testCase.test();
      testResults.push({
        name: testCase.name,
        passed: result,
      });
    }

    setResults(testResults);
    setIsRunning(false);

    // Scroll back to the self-testing section after all tests are done
    selfTestingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={selfTestingRef}>
      <h2>Self-Testing Section</h2>
      <button className="btn btn-primary btn-lg" onClick={runTests} disabled={isRunning}>
        {isRunning ? 'Running Tests...' : 'Test me!'}
      </button>

      {results.length > 0 && (
        <div className="test-results">
          <table>
            <thead>
              <tr>
                <th>Test Name</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index} className={result.passed ? 'passed' : 'failed'}>
                  <td>{result.name}</td>
                  <td>{result.passed ? 'Passed ✅' : 'Failed ❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default SelfTestingSection;
