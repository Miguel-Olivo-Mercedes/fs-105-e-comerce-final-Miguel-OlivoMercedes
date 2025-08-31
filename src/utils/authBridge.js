(function () {
  try {
    const k = "token";
    const _set = window.localStorage.setItem.bind(window.localStorage);
    const _rem = window.localStorage.removeItem.bind(window.localStorage);

    window.localStorage.setItem = function (key, val) {
      const r = _set(key, val);
      if (key === k) window.dispatchEvent(new Event("auth-changed"));
      return r;
    };
    window.localStorage.removeItem = function (key) {
      const r = _rem(key);
      if (key === k) window.dispatchEvent(new Event("auth-changed"));
      return r;
    };
  } catch {}
})();
