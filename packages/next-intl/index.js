"use client";

const React = require("react");

const resolveMessage = (messages, key) => {
  if (!messages || typeof messages !== "object") {
    return undefined;
  }

  return key.split(".").reduce((current, segment) => {
    if (current === undefined || current === null) {
      return undefined;
    }

    if (typeof current !== "object") {
      return undefined;
    }

    return current[segment];
  }, messages);
};

const formatMessage = (message, values) => {
  if (typeof message !== "string") {
    return message;
  }

  if (!values) {
    return message;
  }

  return message.replace(/\{(\w+)\}/g, (_, placeholder) => {
    if (!Object.prototype.hasOwnProperty.call(values, placeholder)) {
      return `{${placeholder}}`;
    }

    const value = values[placeholder];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
};

const IntlContext = React.createContext({
  locale: "en",
  messages: {},
});

const NextIntlClientProvider = ({ children, locale, messages }) => {
  const value = React.useMemo(
    () => ({
      locale,
      messages,
    }),
    [locale, messages],
  );

  return React.createElement(IntlContext.Provider, { value }, children);
};

const useTranslations = (namespace) => {
  const { messages } = React.useContext(IntlContext);
  const prefix = namespace ? `${namespace}.` : "";

  return React.useCallback(
    (key, values) => {
      const fullKey = `${prefix}${key}`;
      const message = resolveMessage(messages, fullKey);

      if (message === undefined) {
        return fullKey;
      }

      const formatted = formatMessage(message, values);

      if (formatted === undefined) {
        return fullKey;
      }

      return formatted;
    },
    [messages, prefix],
  );
};

const useLocale = () => {
  const { locale } = React.useContext(IntlContext);

  return locale;
};

module.exports = {
  NextIntlClientProvider,
  useTranslations,
  useLocale,
};
