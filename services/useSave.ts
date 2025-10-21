import { useState } from "react";

const useSave = <T, Args extends any[]>(
  saveFunction: (...args: Args) => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const execute = async (...args: Args) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await saveFunction(...args);
      setData(result);
      setSuccess(true);
      return result;
    } catch (err) {
      const errorObj =
        err instanceof Error ? err : new Error("An error occurred");
      setError(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
    setSuccess(false);
  };

  return { execute, data, loading, error, success, reset };
};

export default useSave;