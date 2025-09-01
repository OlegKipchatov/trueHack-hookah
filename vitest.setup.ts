import React from "react";

// Provide React globally for tests running with the classic JSX runtime

(globalThis as any).React = React;
