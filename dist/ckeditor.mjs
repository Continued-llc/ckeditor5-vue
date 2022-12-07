import { h as M, markRaw as A } from "vue";
var K = typeof global == "object" && global && global.Object === Object && global;
const P = K;
var U = typeof self == "object" && self && self.Object === Object && self, W = P || U || Function("return this")();
const x = W;
var B = x.Symbol;
const h = B;
var R = Object.prototype, F = R.hasOwnProperty, G = R.toString, g = h ? h.toStringTag : void 0;
function q(t) {
  var e = F.call(t, g), i = t[g];
  try {
    t[g] = void 0;
    var o = !0;
  } catch {
  }
  var s = G.call(t);
  return o && (e ? t[g] = i : delete t[g]), s;
}
var H = Object.prototype, X = H.toString;
function Y(t) {
  return X.call(t);
}
var z = "[object Null]", J = "[object Undefined]", C = h ? h.toStringTag : void 0;
function Q(t) {
  return t == null ? t === void 0 ? J : z : C && C in Object(t) ? q(t) : Y(t);
}
function Z(t) {
  return t != null && typeof t == "object";
}
var tt = "[object Symbol]";
function et(t) {
  return typeof t == "symbol" || Z(t) && Q(t) == tt;
}
var nt = /\s/;
function it(t) {
  for (var e = t.length; e-- && nt.test(t.charAt(e)); )
    ;
  return e;
}
var rt = /^\s+/;
function ot(t) {
  return t && t.slice(0, it(t) + 1).replace(rt, "");
}
function S(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var D = 0 / 0, at = /^[-+]0x[0-9a-f]+$/i, st = /^0b[01]+$/i, ct = /^0o[0-7]+$/i, dt = parseInt;
function N(t) {
  if (typeof t == "number")
    return t;
  if (et(t))
    return D;
  if (S(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = S(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = ot(t);
  var i = st.test(t);
  return i || ct.test(t) ? dt(t.slice(2), i ? 2 : 8) : at.test(t) ? D : +t;
}
var lt = function() {
  return x.Date.now();
};
const E = lt;
var ft = "Expected a function", ut = Math.max, mt = Math.min;
function gt(t, e, i) {
  var o, s, l, d, r, c, f = 0, j = !1, u = !1, p = !0;
  if (typeof t != "function")
    throw new TypeError(ft);
  e = N(e) || 0, S(i) && (j = !!i.leading, u = "maxWait" in i, l = u ? ut(N(i.maxWait) || 0, e) : l, p = "trailing" in i ? !!i.trailing : p);
  function y(n) {
    var a = o, m = s;
    return o = s = void 0, f = n, d = t.apply(m, a), d;
  }
  function V(n) {
    return f = n, r = setTimeout(b, e), j ? y(n) : d;
  }
  function _(n) {
    var a = n - c, m = n - f, $ = e - a;
    return u ? mt($, l - m) : $;
  }
  function v(n) {
    var a = n - c, m = n - f;
    return c === void 0 || a >= e || a < 0 || u && m >= l;
  }
  function b() {
    var n = E();
    if (v(n))
      return I(n);
    r = setTimeout(b, _(n));
  }
  function I(n) {
    return r = void 0, p && o ? y(n) : (o = s = void 0, d);
  }
  function k() {
    r !== void 0 && clearTimeout(r), f = 0, o = c = s = r = void 0;
  }
  function L() {
    return r === void 0 ? d : I(E());
  }
  function T() {
    var n = E(), a = v(n);
    if (o = arguments, s = this, c = n, a) {
      if (r === void 0)
        return V(c);
      if (u)
        return clearTimeout(r), r = setTimeout(b, e), y(c);
    }
    return r === void 0 && (r = setTimeout(b, e)), d;
  }
  return T.cancel = k, T.flush = L, T;
}
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
const O = "Integration Sample", bt = 300, w = {
  name: "ckeditor",
  created() {
    const { CKEDITOR_VERSION: t } = window;
    if (t) {
      const [e] = t.split(".").map(Number);
      e < 34 && console.warn("The <CKEditor> component requires using CKEditor 5 in version 34 or higher.");
    } else
      console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.');
  },
  render() {
    return M(this.tagName);
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    editor: {
      type: Function,
      default: null
    },
    modelValue: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => ({})
    },
    tagName: {
      type: String,
      default: "div"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      instance: null,
      lastEditorData: {
        type: String,
        default: ""
      }
    };
  },
  mounted() {
    const t = Object.assign({}, this.config);
    this.modelValue && (t.initialData = this.modelValue), this.editor.create(this.$el, t).then((e) => {
      this.instance = A(e), this.setUpEditorEvents(), this.modelValue !== t.initialData && e.setData(this.modelValue), this.disabled && e.enableReadOnlyMode(O), this.$emit("ready", e);
    }).catch((e) => {
      console.error(e);
    });
  },
  beforeUnmount() {
    this.instance && (this.instance.destroy(), this.instance = null), this.$emit("destroy", this.instance);
  },
  watch: {
    modelValue(t) {
      this.instance && t !== this.lastEditorData && this.instance.setData(t);
    },
    disabled(t) {
      t ? this.instance.enableReadOnlyMode(O) : this.instance.disableReadOnlyMode(O);
    }
  },
  methods: {
    setUpEditorEvents() {
      const t = this.instance, e = gt((i) => {
        const o = this.lastEditorData = t.getData();
        this.$emit("update:modelValue", o, i, t), this.$emit("input", o, i, t);
      }, bt, { leading: !0 });
      t.model.document.on("change:data", e), t.editing.view.document.on("focus", (i) => {
        this.$emit("focus", i, t);
      }), t.editing.view.document.on("blur", (i) => {
        this.$emit("blur", i, t);
      });
    }
  }
};
/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */
const pt = {
  install(t) {
    t.component("ckeditor", w);
  },
  component: w
};
export {
  pt as default
};
