type LogFunction = (
  message: string,
  parameters?: Record<string, unknown>,
) => void;

interface Logger {
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  debug: LogFunction;
}

export { type Logger };
