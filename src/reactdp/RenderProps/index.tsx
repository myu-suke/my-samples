// 関数としての子要素で柔軟にUIを制御
import React, { useEffect, useState } from "react";

type Props<T> = {
  url: string;
  children: (data: T | null) => React.ReactNode;
};

export function DataFetcher<T>({ url, children }: Props<T>) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return <>{children(data)}</>;
}
