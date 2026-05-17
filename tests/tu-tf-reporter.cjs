class TuTfReporter {
  onTestResult(test, testResult) {
    const suiteTitle = testResult.testResults[0]?.ancestorTitles?.[0] || testResult.testFilePath;

    console.log(`  ${suiteTitle}`);

    testResult.testResults.forEach((result, index) => {
      const prefix = result.status === 'passed' ? 'TU' : 'TF';
      const glyph = result.status === 'passed' ? '✓' : '✕';
      const duration = typeof result.duration === 'number' ? ` (${result.duration} ms)` : '';
      const counter = String(index + 1).padStart(3, '0');
      console.log(`    ${glyph} ${prefix}-${counter}: ${result.title}${duration}`);
    });
  }
}

module.exports = TuTfReporter;
