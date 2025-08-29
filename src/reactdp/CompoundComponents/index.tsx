// 親子コンポーネント間の協調動作
import React, { createContext, useContext, useState } from "react";

const TabsContext = createContext<any>(null);

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [active, setActive] = useState(0);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.Tab = ({ label, children, index }: any) => {
  const { active, setActive } = useContext(TabsContext);
  return (
    <div onClick={() => setActive(index)}>
      <h4
        style={{
          cursor: "pointer",
          color: active === index ? "blue" : "black",
        }}
      >
        {label}
      </h4>
      {active === index && <div>{children}</div>}
    </div>
  );
};
